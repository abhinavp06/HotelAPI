const express = require("express")
const router = express.Router()

const {getHotelByID, getCustomerByID} = require("../helpers/GetByID")

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
 * components:
 *  schemas:
 *      Customer:
 *         type: object    
 *         required:
 *              - name
 *              - email
 *              - password
 *              - phoneNum 
 *         properties:
 *               id:
 *                 type: string
 *                 description: The object id of the customer
 *               name: 
 *                 type: string
 *                 description: Name of the customer
 *               email:
 *                  type: string
 *                  description: Email of the customer
 *               password: 
 *                  type: string
 *                  description: Password of the customer
 *               phoneNum:
 *                  type: number
 *                  description: Phone number of the customer
*/

/**
 * @swagger
 * tags:
 *    name: Admin
 *    description: Routes for getting a customer or hotel by their custom ID
 */

/**
 * @swagger
 * /v1/admin/hotels/{hotelID}:
 *  get:
 *     tags: [Admin]
 *     summary: Returns a hotel object
 *     parameters:
 *      - in: path
 *        name: hotelID
 *        schema:
 *          type: string
 *          required: true
 *          description: The hotel's custom ID
 *     responses:
 *          200:
 *             description: The requested hotel object
 *             content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Hotel'
 *          404:
 *             description: No hotel found
 */
router.get('/hotels/:hotelID', getHotelByID)

/**
 * @swagger
 * /v1/admin/customers/{customerID}:
 *  get:
 *     tags: [Admin]
 *     summary: Returns a customer object
 *     parameters:
 *      - in: path
 *        name: customerID
 *        schema:
 *          type: string
 *          required: true
 *          description: The customer's custom ID
 *     responses:
 *          200:
 *             description: The requested customer object
 *             content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Customer'
 *          404:
 *             description: No customer found
 */
router.get('/customers/:customerID', getCustomerByID)

module.exports = router