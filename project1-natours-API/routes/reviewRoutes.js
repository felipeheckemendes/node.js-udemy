const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const sanitizeRequestBody = require('../utils/sanitizeRequestBody');

const router = express.Router({ mergeParams: true });

// prettier-ignore
router
    .route('/')
    .get(authController.protect, reviewController.getReviews)
    .post(authController.protect, reviewController.createReview)

// prettier-ignore
router
    .route('/:id')
    .get(authController.protect, reviewController.getReview)
    .delete(authController.protect, reviewController.deleteReview)
    .patch(authController.protect, sanitizeRequestBody(['reviewText', 'rating']), reviewController.updateReview)

module.exports = router;
