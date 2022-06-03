const mongoose = require("mongoose")

const disputeSchema = new mongoose.Schema(
    {
        disputeID:{
            type: String // A string just like customerID
        },
        raisedBy:{
            type: String // Customer ID not _id
        },
        raisedTo:{
            type: String // Hotel ID not _id
        },
        booking:{
            type: String // Booking ID not _id
        },
        status:{
            type: String,
            default: "Ongoing"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Dispute", disputeSchema)