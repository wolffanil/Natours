const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getCheckoutSession,
  getBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  createBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.route('/').get(getAllBookings).post(createBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
