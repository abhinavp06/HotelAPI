const Hotel = require("../models/Hotel")

// GET FUNCTIONS
exports.getAllHotels = async(req,res) => {
    
    // if((Object.keys(req.body).length === 0)){ // Customer is just viewing all the hotels available
        try{
            const hotels = await Hotel.find()
            return res.status(200).json(hotels)
        }catch(error){
            return res.status(404).json(error)
        }
}
