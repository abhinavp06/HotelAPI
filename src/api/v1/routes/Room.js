const express = require("express")
const router = express.Router()

const { createRoom, deleteRoom, getRooms, getRoomCount, getRoomById, checkIn, checkOut } = require("../controllers/Room")
const { isSignedIn } = require("../middlewares/Authentication")

router.get("/", isSignedIn,getRooms)
router.get("/count", isSignedIn,getRoomCount)
router.get("/:roomID", isSignedIn,getRoomById)
router.post("/create", isSignedIn,createRoom)
router.post("/checkin/:roomID", isSignedIn,checkIn)
router.post("/checkout/:roomID", isSignedIn,checkOut)
router.delete("/:roomID", isSignedIn,deleteRoom)
module.exports = router