const express = require('express');
const tourController = require('../controllers/tours.controller');
const authController = require('../controllers/auth.controller');
const reviewRouter = require('../routes/reviews.route');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/tours-within/:distance/center/:latlng')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng').get(tourController.getDistances);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/monthly-plan')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    tourController.uploadTourPhoto,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
