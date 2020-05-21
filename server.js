require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const workoutRoutes = require('./routes/workout');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// this will allow us to get the data in req.body
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/workouts', workoutRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder name
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
