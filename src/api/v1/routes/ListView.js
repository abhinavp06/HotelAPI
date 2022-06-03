const express = require("express")
const router = express.Router()

const { getAllHotels } = require("../controllers/HotelControllers")

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
 *    name: ListView
 *    description: Only one route which is used to list all the hotels
 */

/**
 * @swagger
 * /v1/hotels:
 *  get:
 *     tags: [ListView]
 *     summary: Returns a list of all the hotels
 *     responses:
 *          200:
 *             description: List of the hotels
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Hotel'
 *          500:
 *            description: Some server error
 */
router.get("/hotels", getAllHotels)

module.exports = router