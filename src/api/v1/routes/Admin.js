const express = require("express")
const router = express.Router()

const {getHotelByID, getCustomerByID} = require("../helpers/GetByID")

router.get('/hotels/:hotelID', getHotelByID)
router.get('/customers/:customerID', getCustomerByID)

module.exports = router