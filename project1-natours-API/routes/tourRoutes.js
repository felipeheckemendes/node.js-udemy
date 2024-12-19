const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const sanitizeRequestBody = require('../utils/sanitizeRequestBody');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

const allowedFields = [
  'name',
  'imageCover',
  'images',
  'price',
  'difficulty',
  'duration',
  'summary',
  'description',
  'maxGroupSize',
  'secretTour',
  'tourGuides',
  'startDates',
  'startLocation',
  'locations',
];

// prettier-ignore
router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(
        authController.protect, 
        authController.restrictTo(['admin', 'lead-guide']), 
        sanitizeRequestBody(allowedFields),
        tourController.createTour
    );
// prettier-ignore
router
    .route('/top-5-tours')
    .get(authController.protect, tourController.aliasTopTours)
    .get(authController.protect, tourController.getAllTours)
// prettier-ignore
router
    .route('/tour-stats')
    .get(authController.protect, authController.restrictTo(['admin', 'lead-guide']), tourController.getTourStatistics)
// prettier-ignore
router
    .route('/monthly-plan/:year')
    .get(authController.protect, authController.restrictTo(['admin', 'lead-guide']), tourController.getMonthlyPlan)
// prettier-ignore
router
    .route('/:id')
    .get(authController.protect, tourController.getTour)
    .patch(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        sanitizeRequestBody(allowedFields), 
        tourController.updateTour
    )
    .delete(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.deleteTour);

module.exports = router;
