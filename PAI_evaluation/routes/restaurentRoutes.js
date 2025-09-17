const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const reviewController = require('../controllers/reviewController');


router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.createRestaurant);


router.get('/:restaurantId/reviews', reviewController.getReviews);
router.post('/:restaurantId/reviews', reviewController.createReview);

module.exports = router;