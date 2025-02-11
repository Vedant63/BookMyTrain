const express = require('express');
const { bookSeat, getUserBookings } = require('../controllers/bookingController');

const router = express.Router();
router.post('/book-seat', bookSeat);
router.get('/user/bookings', getUserBookings);

module.exports = router;
