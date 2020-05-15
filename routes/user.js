const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /users
// @desc    Create user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid Email address').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),

    check('avatar', 'Avatar is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, password, email, avatar } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        lastName,
        password,
        email,
        avatar,
        // dailyCaloriesGoal,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          // although in mongoDb, this is _id, mongoose abstracts that so you can just use .id
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw new Error(err);
          }
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete /users
// @desc    Delete user, profile, and workouts
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove Workouts
    await Workout.deleteMany({ user: req.user.id });
    // Find Profile of user
    const profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // delete profile
      await profile.remove();
    }

    // Remove User
    const user = await User.findOne({ _id: req.user.id });

    if (user) {
      // delete user
      await user.remove();
    }

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
