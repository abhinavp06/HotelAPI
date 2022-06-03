const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
    {
        bookingID:{
            type: String // A string just like customerID
        },
        bookingFromDate:{
            type: Date
        },
        bookingToDate:{
            type: Date
        },
        bookedIn:{
            type: String // Hotel ID not _id
        },
        bookedBy:{
            type: String // Customer ID not _id
        },
        roomBooked:{
            type: String // Room name
        },
        cost:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Booking", bookingSchema)