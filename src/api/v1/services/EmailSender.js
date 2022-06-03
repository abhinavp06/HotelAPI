const Booking = require("../models/Booking")
const Hotel = require("../models/Hotel");
const Customer = require("../models/Customer");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:process.env.nodemailerFromEmail,
        pass:process.env.nodemailerFromPassword
    }
})

// REGISTRATION
exports.sendRegistrationEmail = async (email, userID) => {
    try {
        const registrationEmailMessage = {
            from:process.env.nodemailerFromEmail,
            to: email.toString(),
            subject:'Registration Completed',
            text:`Kindly note down your ID: ${userID}.\nThank you for choosing us!\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(registrationEmailMessage, function(err,info){
            if(err){
                return err
            }
            return 
        })
    } catch (error) {
        return error
    }
}

// DISPUTES
exports.sendNewDisputeEmailToCustomer = async (email, disputeID, hotelEmail) => {
    try{
        const message = {
            from: process.env.nodemailerFromEmail,
            to: email.toString(),
            subject: 'New Dispute',
            text:`Dispute created!\nDispute ID: ${disputeID}\nHotel email: ${hotelEmail}.\nKindly only send emails to the mentioned hotel email.\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(message, function(err,info){
            if(err){
                return err
            }
            return 
        })
    }catch (error) {
        return error
    }
}

exports.sendNewDisputeEmailToHotel = async (email, disputeID, customerEmail) => {
    try{
        const message = {
            from: process.env.nodemailerFromEmail,
            to: email.toString(),
            subject: 'New Dispute',
            text:`A customer of yours has logged a new dispute.\nDispute ID: ${disputeID}\nThe customer will contact you via email. Customer's email: ${customerEmail}\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(message, function(err,info){
            if(err){
                return err
            }
            return 
        })
    }catch (error) {
        return error
    }
}

exports.sendDisputeSolvedEmailToCustomer = async (email, disputeID) => {
    try{
        const message = {
            from: process.env.nodemailerFromEmail,
            to: email.toString(),
            subject: 'Dispute Solved',
            text:`Your dispute with ID: ${disputeID} has been marked as solved!\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(message, function(err,info){
            if(err){
                return err
            }
            return 
        })
    }catch (error) {
        console.log('EMAIL SENDER SERVICE => Catch Block: ', error)
        return error
    }
}

exports.sendDisputeSolvedEmailToHotel = async (email, disputeID) => {
    try{
        const message = {
            from: process.env.nodemailerFromEmail,
            to: email.toString(),
            subject: 'Dispute Solved',
            text:`Your dispute with ID: ${disputeID} has been marked as solved!\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(message, function(err,info){
            if(err){
                return err
            }
            return 
        })
    }catch (error) {
        return error
    }
}

// BOOKINGS
exports.sendNewBookingEmail = async (custEmail, hotelEmail, bookingID) => {
    try {
        const booking = await Booking.findOne({bookingID: bookingID})
        const hotel = await Hotel.findOne({hotelID: booking.bookedIn})
        const customer = await Customer.findOne({customerID: booking.bookedBy})
        const messageToCustomer = {
            from:process.env.nodemailerFromEmail,
            to: custEmail.toString(),
            subject:'Booking Confirmed',
            text:`You room has been booked in ${hotel.name} from ${booking.bookingFromDate} to ${booking.bookingToDate}.\nRoom: ${booking.roomBooked}\nTotal cost: ₹${booking.cost}\nThank you for choosing us!\nRegards,\nAbhinav Parashar`
        }
        const messageToHotel = {
            from:process.env.nodemailerFromEmail,
            to: hotelEmail.toString(),
            subject:'New Booking',
            text:`Room ${booking.roomBooked} has been booked from ${booking.bookingFromDate} to ${booking.bookingToDate} by ${customer.name}.\nTotal cost: ₹${booking.cost}\nThank you for choosing us!\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(messageToCustomer, function(err,info){
            if(err){
                return err
            }
            return 
        })
        await transporter.sendMail(messageToHotel, function(err,info){
            if(err){
                return err
            }
            return 
        })
    } catch (error) {
        return error
    }
}

exports.sendBookingCancelledEmail = async (booking, hotel, custEmail) => {
    try {
        const customer = await Customer.findOne({customerID: booking.bookedBy})
        const messageToCustomer = {
            from:process.env.nodemailerFromEmail,
            to: custEmail.toString(),
            subject:'Booking Cancelled',
            text:`We noticed that you cancelled your booking in ${hotel.name} with booking ID: ${booking.bookingID}\nRegards,\nAbhinav Parashar`
        }
        const messageToHotel = {
            from:process.env.nodemailerFromEmail,
            to: hotel.email.toString(),
            subject:'Booking Cancelled',
            text:`A booking by ${customer.name} has been cancelled.\nBooking ID: ${booking.bookingID}\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(messageToCustomer, function(err,info){
            if(err){
                return err
            }
            return 
        })
        await transporter.sendMail(messageToHotel, function(err,info){
            if(err){
                return err
            }
            return 
        })
    } catch (error) {
        return error
    }
}