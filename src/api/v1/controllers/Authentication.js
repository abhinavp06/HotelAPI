const Customer = require("../models/Customer");
const Hotel = require("../models/Hotel")
const passport = require("passport")

const { sendRegistrationEmail } = require("../services/EmailSender");

exports.signUpCustomer = async (req,res) => {

    const { name, email, password, phoneNum } = req.body;

    const newCustomer = new Customer({ name, email, password, phoneNum })

    try {
        await newCustomer.save()
        await sendRegistrationEmail(email, newCustomer.customerID)
        res.status(201).json(`Sign up successful! A mail has been sent regarding your Customer ID.`);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.signInCustomer = async (req,res,next) => {
    passport.authenticate("customer-local", function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err})
        }
        if(!user) {
            return res.status(400).json({errors: "No customer found"})
        }
        req.logIn(user , function(err){
            if(err){
                return res.status(400).json({ errors: err})
            }
            return res.status(200).json({ success: `Logged in ${user.customerID}`})
        })
    })(req,res,next)
}

exports.signUpHotel = async (req,res) => {

    const { name, email, password, phoneNum, address } = req.body;

    const newHotel = new Hotel({ name, email, password, phoneNum, address })

    try {
        await newHotel.save()
        await sendRegistrationEmail(email, newHotel.hotelID)
        res.status(201).json(`Sign up successful! A mail has been sent regarding your Hotel ID.`);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.signInHotel = async (req,res,next) => {
    passport.authenticate("hotel-local", function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err})
        }
        if(!user) {
            return res.status(400).json({errors: "No hotel found"})
        }
        req.logIn(user , function(err){
            if(err){
                return res.status(400).json({ errors: err})
            }
            return res.status(200).json({ success: `Logged in ${user.hotelID}`})
        })
    })(req,res,next)
}

// SIGN OUT
exports.signOut = async(req,res) => {
    req.logout()
    return res.status(200).json({ success: 'Logged out successfully'})
}