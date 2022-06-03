const mongoose = require("mongoose")
const { genHotelID } = require("../helpers/GenerateID")
const { hashPassword } = require("../helpers/HashPassword")

const hotelSchema = new mongoose.Schema (
    {
        hotelID:{
            type: String,
            unique: true,
        },
        name:{
            type: String,
            min: 1,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        address:{
            type: String
        },
        phoneNum:{
            type: String,
            required: true,
            min: 10,
            max: 10,
            unique: true
        },
        bookings:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booking'
            }
        ],
        disputes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dispute'
            }
        ],
        totalRooms:{
            type: Number,
            default: 0
        },
        rooms:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room'
            }
        ],
        role:{
            type: Number,
            default: 1
        }
    },
    { timestamps: true }
)

hotelSchema.pre('save', async function (next){
    try{
        this.hotelID = genHotelID(this.name,this.email,this.phoneNum) // generating a hotel ID
        const hashedPassword = await hashPassword(this.password) // hashing the plain password
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("Hotel", hotelSchema)