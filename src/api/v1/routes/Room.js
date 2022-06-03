const express = require("express")
const router = express.Router()

const { createRoom, deleteRoom, getRooms, getRoomCount, getRoomById, checkIn, checkOut } = require("../controllers/Room")
const { isSignedIn } = require("../middlewares/Authentication")

/**
 * @swagger
 * components:
 *  schemas:
 *      Room:
 *          type: object
 *          required:
 *              - name
 *              - belongsTo
 *              - price
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              name:
 *                  type: string
 *                  description: Name of the room
 *              belongsTo:
 *                  type: string
 *                  description: ObjectId of the Hotel it belongs to
 *              price:
 *                  type: number
 *                  description: The price of the room
 *              currentlyOccupiedBy:
 *                  type: string
 *                  description: Contains the custom customerID of the customer staying in the room
 *              status:
 *                  type: string
 *                  default: Unoccupied
 *                  description: Stores whether the room is currently occupied or unoccupied
 *          Example:
 *                  id: adqrhwaf239r6
 *                  name: Room 1
 *                  belongsTo: 6ahsu8971
 *                  price: 2000
 *                  currentlyOccupiedBy: Abhinav
 *                  status: Occupied                
*/

/**
 * @swagger
 * tags:
 *    name: Rooms
 *    description: All routes related to rooms
 */

/**
 * @swagger
 * /v1/rooms:
 *  get:
 *     tags: [Rooms]
 *     summary: Returns a list of the currently logged in Hotel's rooms
 *     responses:
 *          200:
 *             description: List of the rooms
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Room'
 *          500:
 *            description: Either an error or there are no rooms in the hotel
 */
router.get("/", isSignedIn,getRooms)

/**
 * @swagger
 * /v1/rooms/count:
 *  get:
 *     tags: [Rooms]
 *     summary: Returns the number of rooms in the logged in hotel
 *     responses:
 *          200:
 *             description: List of the rooms
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: number
 *          500:
 *            description: Some server error
 */
router.get("/count", isSignedIn,getRoomCount)

/**
 * @swagger
 * /v1/rooms/{roomID}:
 *  get:
 *     tags: [Rooms]
 *     summary: Returns a Room object
 *     parameters:
 *      - in: path
 *        name: roomID
 *        schema:
 *          type: string
 *          required: true
 *          description: The room ObjectId
 *     responses:
 *          200:
 *             description: The requested room object
 *             content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Room'
 *          400:
 *             description: No room found
 */
router.get("/:roomID", isSignedIn,getRoomById)

/**
 * @swagger
 * /v1/rooms/create:
 *  post:
 *   summary: Create a new Room
 *   tags: [Rooms]
 *   requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Room'
 *   responses:
 *       200:
 *           description: Room was successfully created
 *       500:
 *           description: Some server error
 *          
 */
router.post("/create", isSignedIn,createRoom)

/**
 * @swagger
 * /v1/rooms/checkin/{roomID}/{customerID}:
 *  post:
 *     tags: [Rooms]
 *     summary: Check in customer when they arrive.
 *     parameters:
 *      - in: path
 *        name: roomID
 *        schema:
 *          type: string
 *          required: true
 *          description: The room ObjectId
 *      - in: path
 *        name: customerID
 *        schema:
 *          type: string
 *          required: true
 *          description: Custom customerID of the arriving customer
 *     responses:
 *          200:
 *             description: The room's status is changed to occupied and it's currentlyOccupiedBy field is filled with the customerID
 *          500:
 *             description: Some server error
 */
router.post("/checkin/:roomID/:customerID", isSignedIn,checkIn)

/**
 * @swagger
 * /v1/rooms/checkout/{roomID}:
 *  post:
 *     tags: [Rooms]
 *     summary: Check out customer when they arrive.
 *     parameters:
 *      - in: path
 *        name: roomID
 *        schema:
 *          type: string
 *          required: true
 *          description: The room ObjectId
 *     responses:
 *          200:
 *             description: The room's status is changed to unoccupied and it's currentlyOccupiedBy field is filled with null
 *          500:
 *             description: Some server error
 */
router.post("/checkout/:roomID", isSignedIn,checkOut)

/**
 * @swagger
 * /v1/rooms/{roomID}:
 *  delete:
 *     tags: [Rooms]
 *     summary: Delete room
 *     parameters:
 *      - in: path
 *        name: roomID
 *        schema:
 *          type: string
 *          required: true
 *          description: The room ObjectId
 *     responses:
 *          200:
 *             description: Room deleted successfully
 *          500:
 *             description: Some server error
 */
router.delete("/:roomID", isSignedIn,deleteRoom)
module.exports = router