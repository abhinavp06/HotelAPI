const express = require("express")
const router = express.Router()

const { createDispute, getDisputes, getDisputeByID, markDisputeAsSolved } = require("../controllers/Dispute")
const { isSignedIn } = require("../middlewares/Authentication")

router.post("/create", isSignedIn, createDispute)
router.get("/", isSignedIn, getDisputes)
router.get("/:disputeID", isSignedIn, getDisputeByID)
router.post("/:disputeID/solved", isSignedIn, markDisputeAsSolved)

module.exports = router