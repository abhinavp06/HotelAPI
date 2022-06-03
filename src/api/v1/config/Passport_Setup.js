const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const Customer = require("../models/Customer")
const Hotel = require("../models/Hotel")

passport.serializeUser ((user, done) => {
    // done(null, user.id)
    done(null, { id: user.id, role: user.role })
})

passport.deserializeUser ((user, done) => {

    // Customer.findById(id, (err, customer) => {
    //     if(!customer){
    //         Hotel.findById(id, (err,hotel) => {
    //             done(err,hotel)
    //         })
    //     }
    //     done(err, customer)
    // })
    if(user.role === 0){
        Customer.findById(user.id, (err,customer) => {
            done(err,customer)
        })
    }else{
        Hotel.findById(user.id, (err,hotel) => {
            done(err,hotel)
        })
    }
})

//CUSTOMER
passport.use("customer-local",
    new LocalStrategy({ usernameField: "customerID"}, (customerID, password, done) => {
        Customer.findOne({ username: customerID }).then(user => {
            if(!user){
                return res.json({message: 'No user with that username'})
            }
            else {
                // bcrypt.compare(password, user.password, (err, isMatch) => {
                //     if(err){
                //         throw err
                //     }
                //     if(isMatch) {
                //         return done(null, user)
                //     }
                //     else{
                //         return done(null, false, {message: 'Password incorrect'})
                //     }
                // })
                return done(null,user)
            }
        }).catch(err => {
            return done(null, false, { message: err})
        })
    })
)

// HOTEL
passport.use("hotel-local", new LocalStrategy({ usernameField: "hotelID"}, (hotelID, password, done) => {
    Hotel.findOne({ username: hotelID }).then(user => {
        if(!user){
            return res.json({message: 'No hotel with that hotel ID. Kindly check your hotel ID!'})
        }
        else {
            // bcrypt.compare(password, user.password, (err, isMatch) => {
            //     if(err){
            //         throw err
            //     }
            //     if(isMatch) {
            //         return done(null, user)
            //     }
            //     else{
            //         return done(null, false, {message: 'Incorrect password.'})
            //     }
            // })
            return done(null,user)
        }
    }).catch(err => {
        return done(null, false, { message: err})
    })
}))

module.exports = passport