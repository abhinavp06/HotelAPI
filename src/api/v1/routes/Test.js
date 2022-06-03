const express = require("express")
const router = express.Router()

const { whoIsLoggedIn } = require("../tests/AuthTest")

router.get('/whoIsLoggedIn', whoIsLoggedIn)

module.exports = router