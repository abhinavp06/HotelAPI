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

/**
 * @swagger
 * components:
 *  schemas:
 *      Booking:
 *         type: object    
 *         required:
 *              - bookingFromDate
 *              - bookingToDate
 *         properties:
 *               id:
 *                 type: string
 *                 description: The object id of the booking
 *               bookingID: 
 *                 type: string
 *                 description: Customer ID generated for a booking
 *               bookingFromDate:
 *                 type: date
 *                 description: From which date the customer wants to book a room
 *               bookingToDate:
 *                 type: date
 *                 description: Till which date the customer wants to book a room
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      Hotel:
 *         type: object    
 *         required:
 *              - name
 *              - email
 *              - password
 *              - address
 *              - phoneNum 
 *         properties:
 *               id:
 *                 type: string
 *                 description: The object id of the hotel
 *               name: 
 *                 type: string
 *                 description: Name of the hotel
 *               email:
 *                  type: string
 *                  description: Email of the hotel
 *               password: 
 *                  type: string
 *                  description: Password of the hotel
 *               address:
 *                   type: string
 *                   description: Address of the hotel
 *               phoneNum:
 *                  type: number
 *                  description: Phone number of the hotel
 *               bookings:
 *                    type: array
 *                    description: Array of ObjectIds of bookings in the hotel
 *               disputes:
 *                    type: array
 *                    description: Array or ObjectIds of disputes in the hotel
*/

/**
 * @swagger
 * tags:
 *    name: Bookings
 *    description: All routes related to bookings
 */

/**
 * @swagger
 * /v1/bookings:
 *  get:
 *     tags: [Bookings]
 *     summary: Returns a list of bookings of the logged in user
 *     responses:
 *          200:
 *             description: List of bookings
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Booking'
 *          404:
 *            description: No bookings found
 */
router.get("/", isSignedIn, getBookings)

/**
 * @swagger
 * /v1/bookings/{bookingID}:
 *  get:
 *     tags: [Bookings]
 *     summary: Returns a Booking object
 *     parameters:
 *      - in: path
 *        name: bookingID
 *        schema:
 *          type: string
 *          required: true
 *          description: The custom booking ID
 *     responses:
 *          200:
 *             description: The requested booking object
 *             content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Booking'
 *          400:
 *            description: No booking found
 */
router.get("/:bookingID", isSignedIn, getBookingByID)

/**
 * @swagger
 * /v1/bookings/check/{hotelID}/{fromDate}?&{toDate}:
 *  get:
 *     tags: [Bookings]
 *     summary: Returns a statement indicating if a room is available or not
 *     parameters:
 *      - in: path
 *        name: hotelID
 *        schema:
 *          type: string
 *          required: true
 *          description: Custom hotel ID
 *      - in: path
 *        name: fromDate
 *        schema:
 *          type: string
 *          required: true
 *          description: Starting date
 *      - in: path
 *        name: toDate
 *        schema:
 *          type: string
 *          required: true
 *          description: Ending date  
 *     responses:
 *          200:
 *             description: Statement
 *          404:
 *            description: No room found
 */
router.get("/check/:hotelID/:fromDate?&:toDate:",isSignedIn, checkIfHotelHasRoomAvailable)

/**
 * @swagger
 * /v1/bookings/new/{hotelID}/{fromDate}?&{toDate}:
 *  post:
 *     tags: [Bookings]
 *     summary: Create a new booking
 *     parameters:
 *      - in: path
 *        name: hotelID
 *        schema:
 *          type: string
 *          required: true
 *          description: Custom hotel ID
 *      - in: path
 *        name: fromDate
 *        schema:
 *          type: string
 *          required: true
 *          description: Starting date
 *      - in: path
 *        name: toDate
 *        schema:
 *          type: string
 *          required: true
 *          description: Ending date
 *     responses:
 *          200:
 *             description: Booking successfully created
 *          500:
 *            description: Some server error
 */
router.post("/new/:hotelID/:fromDate?&:toDate:", isSignedIn, createNewBooking)

/**
 * @swagger
 * /v1/bookings/cancel/{bookingID}:
 *  delete:
 *     tags: [Bookings]
 *     summary: Delete booking
 *     parameters:
 *      - in: path
 *        name: bookingID
 *        schema:
 *          type: string
 *          required: true
 *          description: The booking custom ID
 *     responses:
 *          200:
 *             description: Booking deleted successfully
 *          500:
 *             description: Some server error
 */
router.delete("/cancel/:bookingID", isSignedIn, cancelBooking)

module.exports = router