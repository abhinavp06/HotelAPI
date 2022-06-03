const express = require("express")
const router = express.Router()

const { whoIsLoggedIn } = require("../tests/AuthTest")

/**
 * @swagger
 * tags:
 *    name: Tests
 *    description: Testing routes
 */

/**
 * @swagger
 * /v1/test/whoIsLoggedIn:
 *  get:
 *     tags: [Tests]
 *     summary: Returns the ID of the user logged in
 *     responses:
 *          200:
 *             description: ID of the logged in user or text stating no one is logged in
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/whoIsLoggedIn', whoIsLoggedIn)

module.exports = router