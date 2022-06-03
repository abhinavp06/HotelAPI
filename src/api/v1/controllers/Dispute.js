const Dispute = require("../models/Dispute")
const Hotel = require("../models/Hotel")
const { sendDisputeSolvedEmailToCustomer, sendDisputeSolvedEmailToHotel, sendNewDisputeEmailToCustomer, sendNewDisputeEmailToHotel } = require("../services/EmailSender")
const { genDisputeID } = require("../helpers/GenerateID")

exports.createDispute = async (req,res) => {
    // GethotelID and bookingID
    // Generate disputeID ID by passing hotelID and customerID
    // Add dispute to customer's dispute array and hotel's dispute array
    // Send email to customer regarding dispute details
    // Send email to hotel regarding dispute details
    const { hotelID, bookingID } = req.params
    const hotel = await Hotel.findOne({hotelID: hotelID})
    const disputeID = genDisputeID(hotelID, req.user.customerID)

    const newDispute = new Dispute()

    try {
        newDispute.disputeID = disputeID
        newDispute.raisedBy = req.user.customerID
        newDispute.raisedTo = hotelID
        newDispute.booking = bookingID
        await newDispute.save()
        await hotel.disputes.push(newDispute._id)
        await req.user.disputes.push(newDispute._id)
        await hotel.save()
        await req.user.save()
        await sendNewDisputeEmailToCustomer(req.user.email, disputeID, hotel.email)
        await sendNewDisputeEmailToHotel(hotel.email, disputeID, req.user.email)
        return res.status(200).json({message: `Dispute created! An email has been sent to you regarding the dispute.`})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

exports.getDisputes = async (req,res) => {
    // If customer is logged in, find with raisedBy
    // If hotel is logged in, find with raisedTo
    if(req.user.role == 1){
        const disputes = await Dispute.find({raisedTo: req.user.hotelID})
        if(disputes.length == 0){
            return res.status(404).json({message: 'No disputes found!'})
        }else{
            return res.status(200).json(disputes)
        }
    }else{
        const disputes = await Dispute.find(({raisedBy: req.user.customerID}))
        if(disputes.length == 0){
            return res.status(404).json({message: 'No disputes found!'})
        }else{
            return res.status(200).json(disputes)
        }
    }
}

exports.getDisputeByID = async (req,res) => {
    const { disputeID } = req.params
    const dispute = await Dispute.findOne({disputeID: disputeID})
    if(dispute == null){
        return res.status(404).json({message: `Dispute not found! Kindly recheck the Dispute ID entered.`})
    }else{
        return res.status(200).json(dispute)
    }
}

exports.markDisputeAsSolved = async (req,res) => {
    // Customer marks a dispute as solved - change status of dispute to "Solved"
    // Email is sent to customer and hotel regarding the dispute status
    const { disputeID } = req.params
    try{
        const dispute = await Dispute.findOne({disputeID: disputeID})
        dispute.status = "Solved"
        dispute.save()
        await sendDisputeSolvedEmailToCustomer(req.user.email, disputeID)
        const hotel = await Hotel.findOne({hotelID: dispute.raisedTo})
        await sendDisputeSolvedEmailToHotel(hotel.email, disputeID)
        return res.status(201).json({message: `Updated dispute status!`})
    }catch(error){
        return res.status(500).json(error)
    }
}