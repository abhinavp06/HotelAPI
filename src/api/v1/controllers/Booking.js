const Booking = require("../models/Booking")
const Hotel = require("../models/Hotel")
const Room = require("../models/Room")
const DayIndex = require("../models/DayIndex")
const { dateToIndexConverter } = require("../helpers/DateToIndexConverter")
const { genBookingID } = require("../helpers/GenerateID")
const { sendNewBookingEmail, sendBookingCancelledEmail } = require("../services/EmailSender")

/*
exports.createBooking = async (req,res) => {
    // 1) Get hotelID and customerID and generate a bookingID
    // 2) Find a room which is available in that hotel for the given duration
    // 3) For the booking's 'cost' field, multiply the number of days with the room's price
    // 4) Fill all the fields and create a new Booking
    // 5) Since we are not considering payments, skip payment
    // 6) Add booking to hotel's bookings array
    // 7) Send email to hotel regarding the booking
    // 8) Add booking to customer's bookings array
    // 9) Send email to customer regarding the booking
}

exports.getBookings = async (req,res) => {
    // Show bookings by sorting them by createdAt
}

exports.getBookingByID = async(req,res) => {
    const { bookingID } = req.params
    try{
        const booking = await Booking.findOne({bookingID: bookingID})
        const hotel = await Hotel.findOne({hotelID: booking.bookedIn})
        const customer = await Customer.findOne({customerID: booking.bookedBy})
        return res.status(200).json({
            bookingID: bookingID,
            fromDate: booking.bookingFromDate,
            toDate: booking.bookingToDate,
            bookedIn: hotel.name,
            bookedBy: customer.name,
            roomBooked: booking.roomBooked,
            cost: booking.cost
        })
    }catch(error){
        return res.status(500).json({message: error})
    }
}
*/

exports.getBookings = async(req,res) => {
    console.log(req.user.role)
    if(req.user.role == 0){
        let bookings = await Booking.find({bookedBy: req.user.customerID})
        if(bookings.length == 0){
            return res.status(404).json({message: `No bookings found!`})
        }else{
            return res.status(200).json(bookings)
        }
    }else{
        let bookings = await Booking.find({bookedIn: req.user.hotelID})
        if(bookings.length == 0){
            return res.status(404).json({message: `No bookings found!`})
        }else{
            return res.status(200).json(bookings)
        }
    }
}

async function occupiedRoomsFinder(fromIndex, toIndex){
    let roomsOccupiedArray = []
    const indexes = await DayIndex.find({dayIndex: {"$gte": fromIndex, "$lte": toIndex}}) // Contains all the day indexes for the given range
    await indexes.forEach(element => {
        element.roomsOccupied.forEach(room => { // Adding all the unique room ids to the roomsOccupiedArray
            let flag = 0
            for(let i=0;i<roomsOccupiedArray.length;i++){
                if(roomsOccupiedArray[i].equals(room)){
                    flag = 1
                    break;
                }
            }
            if(!flag)
                roomsOccupiedArray.push(room)
        })
    })
    return roomsOccupiedArray
}

exports.checkIfHotelHasRoomAvailable = async (req,res) => {
    const { hotelID } = req.params
    const { fromDate, toDate } = req.body
    const hotel = await Hotel.findOne({hotelID: hotelID})
    const fromIndex = dateToIndexConverter(fromDate)
    const toIndex = dateToIndexConverter(toDate)

    try{
       let roomsOccupiedArray = await occupiedRoomsFinder(fromIndex, toIndex) // This array contains all the roms
       const room = await Room.findOne({_id: { $nin: roomsOccupiedArray } , belongsTo: hotel._id})
       console.log('Room: ', room)
       if(room == null)
            return res.status(404).json({message: 'No available rooms!'})
        else
            return res.status(404).json({message: 'Room is available'})
    }
    catch(error){
        return res.json({message: error})
    }
}

exports.createNewBooking = async(req,res) => {
    const { hotelID } = req.params
    const { fromDate, toDate } = req.body
    const hotel = await Hotel.findOne({hotelID: hotelID})
    const fromIndex = dateToIndexConverter(fromDate)
    const toIndex = dateToIndexConverter(toDate)
    console.log('From index: ', fromIndex, ' To index: ', toIndex)

    try{
        // Creating the new booking
        const newBooking = new Booking({
            bookingFromDate: fromDate,
            bookingToDate: toDate,
            bookedIn: hotelID,
            bookedBy: req.user.customerID
        })
        newBooking.bookingID = genBookingID(hotelID, req.user.customerID)
        let roomsOccupiedArray = await occupiedRoomsFinder(fromIndex, toIndex) // This array contains all the roms
        let room = await Room.findOne({_id: { $nin: roomsOccupiedArray } , belongsTo: hotel._id})
        console.log('Room booked: ', room._id)
        newBooking.roomBooked = room.name
        newBooking.cost = (toIndex - fromIndex + 1) * room.price
        await newBooking.save()
        console.log("New booking id: ", newBooking._id)
        // Adding the booking to customer's bookings array
        await req.user.bookings.push(newBooking._id)
        await req.user.save()
        // Adding the booking to hotel's bookings array
        await hotel.bookings.push(newBooking._id)
        await hotel.save()
        // Adding the booked room to the day indexes
        const indexes = await DayIndex.find({dayIndex: {"$gte": fromIndex, "$lte": toIndex}}) // Contains all the day indexes for the given range
        await indexes.forEach(index => {
            index.roomsOccupied.push(room._id)
            index.save()
        })
        // Send email to customer and hotel regarding the booking
        sendNewBookingEmail(req.user.email, hotel.email, newBooking.bookingID)
        return res.status(200).json({message: "Booking successful! An email has been sent to you regarding your booking details!"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: error})
    }
}

exports.cancelBooking = async (req,res) => {
    const { bookingID } = req.params
    // Get booking object
    const booking = await Booking.findOne({bookingID: bookingID})
    if(booking == null){
        return res.status(404).json({message: `Booking does not exist! Kindly check the entered ID.`})
    }else{
        // Get hotel
        const hotel = await Hotel.findOne({hotelID: booking.bookedIn})
        // Get booked room
        const room = await Room.findOne({belongsTo: hotel._id, name: booking.roomBooked})
        // Remove booking _id from Hotel's and Customer's bookings array
        await hotel.bookings.pull(booking._id)
        await req.user.bookings.pull(booking._id)
        await hotel.save()
        await req.user.save()

        // Remove room _id from the day indexes
        const indexes = await DayIndex.find({dayIndex: {"$gte": dateToIndexConverter(booking.bookingFromDate), "$lte": dateToIndexConverter(booking.bookingToDate)}}) // Contains all the day indexes for the given range
        await indexes.forEach(index => {
            index.roomsOccupied.pull(room._id)
            index.save()
        })
        // Send email to hotel and customer regarding the cancellation of the booking
        await sendBookingCancelledEmail(booking, hotel, req.user.email)
        // Delete the booking
        await Booking.deleteOne({_id: booking._id})
        return res.status(200).json({message: `Your booking has been successfully cancelled!`})
    }
}

exports.getBookingByID = async (req,res) => {
    const { bookingID } = req.params
    const booking = await Booking.findOne({bookingID: bookingID})
    if(booking == null){
        return res.status(404).json({message: `A booking with that ID does not exist! Kindly recheck the ID entered.`})
    }else{
        return res.status(200).json(booking)
    }
}