/*
Create booking
Get booking by ID (create isRelatedToBooking middleware)
Cancel booking
Get all bookings of customer
Get all bookings of hotel (when hotel is logged in)
*/

const express = require("express")
const { getBookings, checkIfHotelHasRoomAvailable, createNewBooking, cancelBooking, getBookingByID } = require("../controllers/Booking")
const router = express.Router()

const { isSignedIn } = require("../middlewares/Authentication")

router.get("/", isSignedIn, getBookings)
router.get("/:bookingID", isSignedIn, getBookingByID)
router.get("/check/:hotelID",isSignedIn, checkIfHotelHasRoomAvailable)
router.post("/new/:hotelID", isSignedIn, createNewBooking)
router.delete("/cancel/:bookingID", isSignedIn, cancelBooking)

module.exports = router