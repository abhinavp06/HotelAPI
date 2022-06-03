const mongoose = require("mongoose")
const { genCustID } = require("../helpers/GenerateID")
const { hashPassword } = require("../helpers/HashPassword")

const customerSchema = new mongoose.Schema(
    {
        customerID:{
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
        phoneNum:{
            type: String,
            required: true,
            min: 10,
            max: 10,
            unique: true
        },
        // pastBookings:[
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Booking'
        //     }
        // ],
        // upcomingBookings:[
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Booking'
        //     }
        // ],
        bookings:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booking'
            }
        ],
        // currentDisputes:[
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Dispute'
        //     }
        // ],
        // pastDisputes:[
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Dispute'
        //     }
        // ],
        disputes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dispute'
            }
        ],
        role:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

customerSchema.pre('save', async function (next){
    try{
        this.customerID = genCustID(this.name,this.email,this.phoneNum) // generating a customer ID
        const hashedPassword = await hashPassword(this.password) // hashing the plain password
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("Customer", customerSchema)