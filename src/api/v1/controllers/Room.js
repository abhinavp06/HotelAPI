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
        res.status(201).json(`New room created!`)
    }catch(error){
        res.status(501).json({message: error.message})
    }
}

exports.deleteRoom = async (req,res) => {
    const {roomID} = req.params
    Room.findByIdAndDelete(roomID, function(err,info){
         if(err)
            return res.status(500).json(`Error in deleting room!`)
        else
        {
            // const indexOfRoom = req.user.availableRooms.indexOf(roomID)
            // if(indexOfRoom > -1){
            //     req.user.availableRooms.splice(indexOfRoom, 1)
            // }
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
        // var availableRoomsRes = []
        // req.user.availableRooms.forEach(room => {
        //     console.log(`Room variable: ${room}`)
        //     Room.findById(room, function(err,info){
        //         if(info)
        //             availableRoomsRes.push({
        //                 name: info.name
        //             })
        //     })
        //     // availableRoomsRes.push(Room.find({_id: room}))
        // })
        // var occupiedRoomsRes = []
        // req.user.occupiedRooms.forEach(room => {
        //     console.log(`Room variable: ${room}`)
        //     // occupiedRoomsRes.push(Room.find({_id: room}))
        //     Room.findById(room, function(err,info){
        //         if(info)
        //             occupiedRoomsRes.push({
        //                 name: info.name,
        //                 currentlyOccupiedBy: info.currentlyOccupiedBy
        //             })
        //     })
        // })
        // return res.status(200).json({
        //     availableRooms: availableRoomsRes,
        //     occupiedRooms: occupiedRoomsRes
        // })


        // return res.status(200).json({
        //     availableRooms: req.user.availableRooms,
        //     occupiedRooms: req.user.occupiedRooms
        // })

        // const rooms = await Room.find({belongsTo: req.user._id})
        // return res.status(200).json(rooms)

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
    /*
    // OLD
    // When customer checks in, the hotel manually marks the room as occupied.
    // Moving the room to hotel's occupied rooms array.
    const { roomID } = req.params
    const { customerID } = req.body
    try{
        // Removing room from hotel's available rooms array
        var index = req.user.availableRooms.indexOf(roomID);
        if (index !== -1) {
            req.user.availableRooms.splice(index, 1);
        }
        // Adding room to hotel's occupied rooms array
        req.user.occupiedRooms.push(roomID)
        // Adding customer ID to room's currentlyOccupiedBy field
        const room = await Room.findById(roomID)
        room.currentlyOccupiedBy = customerID
        room.save()
        req.user.save()
        return res.status(200).json({message: `Customer check in succesful!`})
    }catch(error){
        return res.status(500).json({message: error})
    }
    */
   // NEW
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
    /*
    // OLD
    // When customer checks out, the hotel manually marks the room as available.
    // Moving the room to hotel's available rooms array.
    const { roomID } = req.params
    try{
        // Removing room from hotel's occupied rooms array
        var index = req.user.occupiedRooms.indexOf(roomID);
        if (index !== -1) {
            req.user.occupiedRooms.splice(index, 1);
        }
        // Adding room to hotel's available rooms array
        req.user.availableRooms.push(roomID)
        // Replacing customer's ID in room's currentlyOccupiedBy field with null
        const room = await Room.findById(roomID)
        room.currentlyOccupiedBy = null
        room.save()
        req.user.save()
        return res.status(200).json({message: `Customer check out succesful!`})
    }catch(error){
        return res.status(500).json({message: error})
    }
    */


    // NEW
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