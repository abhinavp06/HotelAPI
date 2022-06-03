// getById functions except instead of using object id we are finding the object using the custom IDs generated

const Customer = require("../models/Customer")
const Hotel = require("../models/Hotel")
const Dispute = require("../models/Dispute")
const Booking = require("../models/Booking")
const Room = require("../models/Room")

exports.getHotelByID = async(req,res) => {
    const {hotelID} = req.params
    try{
        const hotel = await Hotel.findOne({hotelID: hotelID})
        const disputes = await Dispute.find({raisedTo: hotelID})
        const bookings = await Booking.find({bookedIn: hotelID})
        const rooms = await Room.find({belongsTo: hotel._id})
        return res.status(200).json({
            _id: hotel._id,
            hotelID: hotel.hotelID,
            name: hotel.name,
            email: hotel.email,
            address: hotel.address,
            phoneNum: hotel.phoneNum,
            bookings: bookings,
            disputes: disputes,
            totalRooms: hotel.totalRooms,
            rooms: rooms
        })
        // return res.status(200).json(hotel)
    }catch(error){
        console.log(error)
        return res.status(404).json(`Error retrieving hotel info.`)
    }
}

exports.getCustomerByID = async(req,res) => {
    const {customerID} = req.params
    try{
        const customer = await Customer.findOne({customerID: customerID})
        const disputes = await Dispute.find({raisedBy: customerID})
        const bookings = await Booking.find({bookedBy: customerID})
        return res.status(200).json({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            phoneNum: customer.phoneNum,
            bookings: bookings,
            disputes: disputes
        })
        // return res.status(200).json(customer)
    }catch(error){
        console.log(error)
        return res.status(404).json(`Error retrieving customer info.`)
    }
}