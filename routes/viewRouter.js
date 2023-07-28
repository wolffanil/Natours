const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getMe,
  updateUserData,
  getMyTours,
  getSingUpForm,
} = require('../controllers/viewsController');
const { protect, isLogged, logout } = require('../controllers/authController');
const { createBookingCheackout } = require('../controllers/bookingController');

const router = express.Router();

// router.use(isLogged);

router.get('/', createBookingCheackout, isLogged, getOverview);
router.get('/tour/:slug', isLogged, getTour);
router.get('/login', isLogged, getLoginForm);
router.get('/me', protect, getMe);
router.get('/my-tours', protect, getMyTours);
router.get('/sing-up', getSingUpForm);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
