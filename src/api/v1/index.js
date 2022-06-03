require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/Passport_Setup")
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const { setUpMongo } = require("../../serverConfig/MongoDB_Setup")
// const { setUpDayIndex } = require("./config/DayIndex_Setup")

// IMPORTING ROUTES
const authRoutes = require("./routes/Authentication")
const listViewRoutes = require("./routes/ListView")
const adminRoutes = require("./routes/Admin")
const testRoutes = require("./routes/Test")
const roomRoutes = require("./routes/Room")
const bookingRoutes = require("./routes/Booking")
const disputeRoutes = require("./routes/Dispute")

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Hotel Management API",
            version: "1.0.0",
            description:"A basic hotel management API."
        },
        servers:[
            {
                url: "https://abhinavp06hotel.herokuapp.com/"
            }
        ]
    },
    apis:["./src/api/v1/routes/*.js"],
}

const specs = swaggerJsDoc(options)


const app = express()

app.use("/v1/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// SETTING UP
setUpMongo()
// setUpDayIndex()

// USE LIBRARIES
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
try{
    app.use(passport.initialize())
    app.use(passport.session())
    console.log(`PASSPORT SETUP COMPLETE`)
}catch(error){
    console.log(error)
}

//ROUTES
app.get("/", (req,res) => {
    res.status(200).send("🤖")
})
app.use("/v1/", listViewRoutes)
app.use("/v1/auth/", authRoutes)
app.use("/v1/admin/", adminRoutes)
app.use("/v1/test/", testRoutes)
app.use("/v1/rooms/", roomRoutes)
app.use("/v1/bookings/", bookingRoutes)
app.use("/v1/disputes/", disputeRoutes)
app.get("*", function(req, res) {
    res.status(404).send("Invalid URL");
})

//PORT
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App is up and running!\nPort: ${port}`)
})