const express = require("express")
const router = express.Router()

const { getAllHotels } = require("../controllers/HotelControllers")

router.get("/hotels", getAllHotels)

module.exports = router