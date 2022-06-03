const mongoose = require("mongoose")

const occHotelModel = new mongoose.Schema(
    {
        hotel:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel'
        },
        roomsOccupied:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room'
            }
        ]
    }
)

module.exports = mongoose.model("OccHotelModel", occHotelModel)