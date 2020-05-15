const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

const router = express.Router();

// @route   GET /api/workouts
// @desc    Get all workouts
// @access  Public

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('user', [
      'firstName',
      'lastName',
      'avatar',
    ]);

    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/workouts/:id
// @desc    Get all workouts
// @access  Public

router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
    }).populate('user', ['firstName', 'lastName', 'avatar']);

    if (!workout) {
      return res.status(400).json({ msg: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/workouts
// @desc    Create a workout
// @access  Private

router.post(
  '/',
  [
    auth,
    check('description', 'Description is required'),
    check('caloriesBurned', 'caloriesBurned is required'),
  ],
  async (req, res) => {
    // check for errors in request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description, caloriesBurned, exercises } = req.body;

      const workoutFields = {
        description,
        caloriesBurned,
        exercises,
        user: req.user.id,
      };

      const workout = await new Workout(workoutFields);

      await workout.save();

      res.json(workout);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PATCH /api/workouts/:id
// @desc    Update a workout
// @access  Private

router.patch(
  '/:id',
  [
    auth,
    check('description', 'Description is required'),
    check('caloriesBurned', 'caloriesBurned is required'),
  ],
  async (req, res) => {
    // check for errors in request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description, caloriesBurned, exercises } = req.body;

      const workoutFields = {
        description,
        caloriesBurned,
        exercises,
        user: req.user.id,
      };

      let workout = await Workout.findOne({ _id: req.params.id });

      if (!workout) {
        return res.status(400).json({ errors: [{ msg: 'Workout not found' }] });
      }

      // update profile
      workout = await Workout.findByIdAndUpdate(
        // filter / selection criteria
        { _id: req.params.id },
        // sets fields in model
        { $set: workoutFields },
        // applies formatting
        { new: true }
      );

      await workout.save();

      res.json(workout);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete /api/workouts/:id
// @desc    Delete a workout
// @access  Public

router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
    });

    if (!workout) {
      return res.status(400).json({ msg: 'Workout not found' });
    }

    if (!workout.user._id === req.user.id) {
      return res
        .status(400)
        .json({ msg: 'You are not authorized to delete this workout' });
    }

    await Workout.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Workout deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
