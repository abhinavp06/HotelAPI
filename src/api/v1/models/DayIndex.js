/*
The idea is that we make a schema of each day of the year.
When rooms are booked they are pushed into this schema's array.
For example, Jan 1 is index 0 and so on..
There will be a total of 366 documents in this collection.
If the year is not a leap year, then the index 365 will have all rooms marked as occupied in it.
*/

const mongoose = require("mongoose")

const dayIndexSchema = new mongoose.Schema(
    {
        dayIndex:{
            type: Number // 0,1,2 etc.
        },
        roomsOccupied:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room'
            }
        ]
    }
)

module.exports = mongoose.model("DayIndex", dayIndexSchema)