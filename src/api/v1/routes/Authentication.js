const express = require("express")
const router = express.Router()

// SIGN UP
const { signUpCustomer, signUpHotel, signInCustomer, signOut, signInHotel } = require("../controllers/Authentication")
const { isSignedIn } = require("../middlewares/Authentication")

router.post('/signup/customer', signUpCustomer)
router.post('/signup/hotel', signUpHotel)

router.post('/signin/customer', signInCustomer)
router.post('/signin/hotel', signInHotel)

router.post('/signout', isSignedIn, signOut)

module.exports = router