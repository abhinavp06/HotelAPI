const express = require("express")
const router = express.Router()

// SIGN UP
const { signUpCustomer, signUpHotel, signInCustomer, signOut, signInHotel } = require("../controllers/Authentication")
const { isSignedIn } = require("../middlewares/Authentication")

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
 * components:
 *  schemas:
 *      CustomerSignInSchema:
 *         type: object    
 *         required:
 *              - customerID
 *              - password
 *         properties:
 *               customerID:
 *                 type: string
 *                 description: The custom ID of the customer
 *               password: 
 *                  type: string
 *                  description: Password of the customer
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      HotelSignInSchema:
 *         type: object    
 *         required:
 *              - hotelID
 *              - password
 *         properties:
 *               hotelID:
 *                 type: string
 *                 description: The custom ID of the hotel
 *               password: 
 *                  type: string
 *                  description: Password of the hotel
*/

/**
 * @swagger
 * tags:
 *    name: Authentication
 *    description: All routes related to authentication
 */

/**
 * @swagger
 * /v1/auth/signup/customer:
 *  post:
 *     tags: [Authentication]
 *     summary: Create a new customer
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'
 *     responses:
 *          200:
 *             description: Customer successfully created
 *          500:
 *             description: Some server error
 */
router.post('/signup/customer', signUpCustomer)

/**
 * @swagger
 * /v1/auth/signup/hotel:
 *  post:
 *     tags: [Authentication]
 *     summary: Create a new hotel
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Hotel'
 *     responses:
 *          200:
 *             description: Hotel successfully created
 *          500:
 *             description: Some server error
 */
router.post('/signup/hotel', signUpHotel)

/**
 * @swagger
 * /v1/auth/signin/customer:
 *  post:
 *     tags: [Authentication]
 *     summary: Log in customer
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CustomerSignInSchema'
 *     responses:
 *          200:
 *             description: Log in successful
 *          500:
 *             description: Some server error
 */

router.post('/signin/customer', signInCustomer)
/**
 * @swagger
 * /v1/auth/signin/hotel:
 *  post:
 *     tags: [Authentication]
 *     summary: Log in hotel
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HotelSignInSchema'
 *     responses:
 *          200:
 *             description: Log in successful
 *          500:
 *             description: Some server error
 */
router.post('/signin/hotel', signInHotel)

/**
 * @swagger
 * /v1/auth/signout:
 *  post:
 *     tags: [Authentication]
 *     summary: Log out
 *     responses:
 *          200:
 *             description: Logged out successfully
 */
router.post('/signout', isSignedIn, signOut)

module.exports = router