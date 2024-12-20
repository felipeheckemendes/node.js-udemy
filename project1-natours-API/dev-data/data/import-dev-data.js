const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const readline = require('readline');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: path.join(__dirname, '..', '..', 'config.env') });
// const app = require('../../app'); // The app should be required AFTER configuring the env variables, because requiring runs the file

// Connection to Mongoose
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('\nMongoDB Database Connection Succesfull');
  });

// Read JSON file
const toursData = fs.readFileSync(path.join(__dirname, 'tours.json'), 'utf-8');
const usersData = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8');
const reviewsData = fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf-8');

// Function to import data into DB
const importData = async () => {
  try {
    await Tour.create(JSON.parse(toursData));
    await User.create(JSON.parse(usersData), { validateBeforeSave: false });
    await Review.create(JSON.parse(reviewsData));
    console.log('✅ Data Successfully loaded');
  } catch (err) {
    console.log('🧨 ERROR', err.message);
  }
  process.exit();
};

// Function to delete all data from DB collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    console.log('⭕ Data succesfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
