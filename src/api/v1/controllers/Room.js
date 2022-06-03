const Room = require("../models/Room")
const Hotel = require("../models/Hotel")

exports.createRoom = async(req,res) => {
    const { name, price } = req.body
    const newRoom = new Room({name, price})
    newRoom.belongsTo = req.user._id
    try{
        await newRoom.save()
        await req.user.totalRooms++
        // await req.user.availableRooms.push(newRoom)
        await req.user.rooms.push(newRoom)
        await req.user.save()
        res.status(201).json({message: `Room deleted.`})
    }catch(error){
        res.status(501).json({message: error.message})
    }
}

exports.deleteRoom = async (req,res) => {
    const {roomID} = req.params
    Room.findByIdAndDelete(roomID, function(err,info){
         if(err)
            return res.status(500).json({message: `Error in deleting room!`})
        else
        {
            const indexOfRoom = req.user.rooms.indexOf(roomID)
            if(indexOfRoom > -1){
                req.user.rooms.splice(indexOfRoom, 1)
            }
            req.user.totalRooms--
            req.user.save()
        }
    })
    return res.status(200).json({message: `Room deleted!`})
}

exports.getRooms = async (req,res) => {
    try {
        const unoccupiedRooms = await Room.find({belongsTo: req.user._id, status: 'Unoccupied'})
        const occupiedRooms = await Room.find({belongsTo: req.user._id, status: 'Occupied'})
        return res.status(200).json({
            occupied: occupiedRooms,
            unoccupied: unoccupiedRooms
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

exports.getRoomCount = async (req,res) => {
    const hotel = await Hotel.findById(req.user._id)
    if(hotel){
        return res.status(200).json({message: `Room count is ${hotel.totalRooms}`})
    }else{
        return res.status(404).json({failure: `Hotel not found!`})
    }
}

exports.getRoomById = async (req,res) => {
    const {roomID} = req.params
    const room = await Room.findById(roomID)
        if(room){
            return res.status(200).json(room)
        }else{
            return res.status(404).json({message: `Room not found!`})
        }
}

exports.checkIn = async(req,res) => {
   // While checking in, we need to - 1) update room status to Occupied 2) Add customer ID in currentlyOccupiedBy field
   const { roomID } = req.params
   const { customerID } = req.body
   try{
       const room = await Room.findById(roomID)
       room.status = "Occupied"
       room.currentlyOccupiedBy = customerID
       room.save()
       return res.status(200).json({message: `Customer check in succesful!`})
   }catch(error){
       return res.status(500).json({message: error})
   }
}

exports.checkOut = async(req,res) => {
   // While checking in, we need to - 1) update room status to Unoccupied 2) Remove customer ID from currentlyOccupiedBy field
   const { roomID } = req.params
   try{
       const room = await Room.findById(roomID)
       room.status = "Unoccupied"
       room.currentlyOccupiedBy = null
       room.save()
       return res.status(200).json({message: `Customer check out succesful!`})
   }catch(error){
       return res.status(500).json({message: error})
   }
}