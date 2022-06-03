const Hotel = require("../models/Hotel")

exports.getAllHotels = async(req,res) => {
        try{
            const hotels = await Hotel.find()
            return res.status(200).json(hotels)
        }catch(error){
            return res.status(404).json(error)
        }
}
