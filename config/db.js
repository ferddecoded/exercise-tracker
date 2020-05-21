const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0-d9wb9.mongodb.net/test?retryWrites=true&w=majority`,
      {
        // Flag for using new URL string parser instead of current (deprecated) one
        useNewUrlParser: true,
        // Flag for using new Server Discovery and Monitoring engine instead of current (deprecated) one
        useUnifiedTopology: true,
        // If true, this connection will use createIndex() instead of ensureIndex() for automatic index builds via Model.init().
        useCreateIndex: true,
        // Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    // Exist process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
