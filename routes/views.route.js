const express = require('express');
const viewController = require('../controllers/views.controller');
const authController = require('../controllers/auth.controller');
const bookingController = require('../controllers/bookings.controller');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get(
  '/',
  // bookingController.createBookingCheckout,
  viewController.getOverview
);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.login);
router.get('/signup', viewController.signup);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);
router.get('/my-reviews', authController.protect, viewController.getMyReviews);

module.exports = router;
