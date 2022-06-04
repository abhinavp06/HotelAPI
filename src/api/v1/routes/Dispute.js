const express = require("express")
const router = express.Router()

const { createDispute, getDisputes, getDisputeByID, markDisputeAsSolved } = require("../controllers/Dispute")
const { isSignedIn } = require("../middlewares/Authentication")

/**
 * @swagger
 * components:
 *  schemas:
 *      Dispute:
 *         type: object    
 *         required:
 *              - hotelID
 *              - bookingID
 *         properties:
 *               id:
 *                 type: string
 *                 description: The object id of the dispute
 *               disputeID: 
 *                 type: string
 *                 description: Custom ID generated
 *               raisedTo:
 *                  type: string
 *                  description: Custom ID of hotel
 *               raisedBy: 
 *                  type: string
 *                  description: Custom ID of customer
 *               booking:
 *                   type: string
 *                   description: Custom booking ID
 *               status:
 *                  type: String
 *                  description: Either Ongoing or Solved
*/

/**
 * @swagger
 * tags:
 *    name: Disputes
 *    description: All routes related to disputes
 */

/**
 * @swagger
 * /v1/disputes/create/{bookingID}/{hotelID}:
 *  post:
 *     tags: [Disputes]
 *     summary: Create a new dispute
 *     parameters:
 *      - in: path
 *        name: bookingID
 *        schema:
 *          type: string
 *          required: true
 *          description: Custom booking ID
 *      - in: path
 *        name: hotelID
 *        schema:
 *          type: string
 *          required: true
 *          description: Custom hotel ID
 *     responses:
 *          200:
 *             description: Dispute successfully created
 *          500:
 *             description: Some server error
 */
router.post("/create/:bookingID/:hotelID", isSignedIn, createDispute)

/**
 * @swagger
 * /v1/disputes:
 *  get:
 *     tags: [Disputes]
 *     summary: Returns a list of disputes of the logged in user
 *     responses:
 *          200:
 *             description: List of disputes
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Dispute'
 *          404:
 *            description: No disputes found
 */
router.get("/", isSignedIn, getDisputes)

/**
 * @swagger
 * /v1/disputes/{disputeID}:
 *  get:
 *     tags: [Disputes]
 *     summary: Returns a Dispute object
 *     parameters:
 *      - in: path
 *        name: disputeID
 *        schema:
 *          type: string
 *          required: true
 *          description: The custom dispute ID
 *     responses:
 *          200:
 *             description: The requested dispute object
 *             content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Dispute'
 *          400:
 *            description: No dispute found
 */
router.get("/:disputeID", isSignedIn, getDisputeByID)

/**
 * @swagger
 * /v1/disputes/{disputeID}/solved:
 *  post:
 *     tags: [Disputes]
 *     summary: Returns a success message
 *     parameters:
 *      - in: path
 *        name: disputeID
 *        schema:
 *          type: string
 *          required: true
 *          description: Custom dispute ID
 *     responses:
 *          200:
 *             description: Success message
 *             content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Dispute'
 *          500:
 *             description: Some server error
 */
router.post("/:disputeID/solved", isSignedIn, markDisputeAsSolved)

module.exports = router