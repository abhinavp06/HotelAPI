const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        belongsTo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel'
        },
        currentlyOccupiedBy:{
            type: String, // customer ID
            default: null
        },
        price:{
            type: Number,
            required: true
        },
        status:{
            type: String,
            default: 'Unoccupied'
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Room", roomSchema)