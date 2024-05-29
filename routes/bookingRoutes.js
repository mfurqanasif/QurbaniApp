const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const verifyToken = require('../middlewares/auth');

router.post('/bookings', verifyToken, bookingController.createBooking);
router.delete('/bookings/:id', verifyToken, bookingController.deleteBooking);
router.put('/bookings/:id', verifyToken, bookingController.updateBooking);
router.get('/bookings', verifyToken, bookingController.getAllBookings);
router.get('/bookings/:id', verifyToken, bookingController.getBookingById);

module.exports = router;
