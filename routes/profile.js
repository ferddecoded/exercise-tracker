const express = require('express');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');

const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

const router = express.Router();

// @route   GET /api/profiles
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstName',
      'lastName',
      'date',
      'avatar',
    ]);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profiles/:id
// @desc    Get profile by id
// @access  Private

router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate('user', ['firstName', 'lastName', 'date', 'avatar']);

    if (!profile) {
      res.status(400).json({ msg: 'Profile not found' });
    } else {
      res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profiles
// @desc    Create and update profile
// @access  Private

router.post(
  '/',
  [
    auth,
    check('bio', 'Bio is required')
      .not()
      .isEmpty(),
    check('activities', 'Activities is required')
      .not()
      .isEmpty(),
    check('dailyCaloriesGoal', 'Calories goal is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // check for errors in request
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Profile already exists' }] });
      }

      const { bio, activities, dailyCaloriesGoal, avatar } = req.body;

      // set fields in profile model
      const profileFields = {
        bio,
        dailyCaloriesGoal,
        user: req.user.id,
        avatar,
      };

      if (Array.isArray(activities)) {
        profileFields.activities = activities;
      } else {
        profileFields.activities = activities
          .split(',')
          .map(activity => activity.trim());
      }

      // create profile
      profile = await new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error.');
    }
  }
);

// @route   PATCH /api/profiles/
// @desc    Create and update profile
// @access  Private

router.patch(
  '/',
  [
    auth,
    check('bio', 'Bio is required')
      .not()
      .isEmpty(),
    check('activities', 'Activities is required')
      .not()
      .isEmpty(),
    check('dailyCaloriesGoal', 'Calories goal is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // check for errors in request
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(400).json({ errors: [{ msg: 'No profile found.' }] });
      }

      const { id } = profile;
      const { bio, activities, dailyCaloriesGoal, avatar } = req.body;

      // set fields in profile model
      const profileFields = {
        bio,
        dailyCaloriesGoal,
        avatar,
      };

      if (Array.isArray(activities)) {
        profileFields.activities = activities;
      } else {
        profileFields.activities = activities
          .split(',')
          .map(activity => activity.trim());
      }

      if (
        bio === profile.bio &&
        avatar === profile.avatar &&
        _.isEqual(activities, profile.activities)
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No changes were made.' }] });
      }

      // update profile
      profile = await Profile.findByIdAndUpdate(
        // filter / selection criteria
        { _id: id },
        // sets fields in model
        { $set: profileFields },
        // applies formatting
        { new: true }
      );

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error.');
    }
  }
);

// @route   Delete /api/profiles/
// @desc    delete profile
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Find Profile of user
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.' });
    }

    if (!profile.user._id === req.user.id) {
      return res
        .status(400)
        .json({ msg: 'You are not authorized to delete this workout' });
    }

    // delete profile
    await profile.remove();

    res.json({ msg: 'Profile Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
