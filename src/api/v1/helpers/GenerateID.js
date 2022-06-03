// Generating custom IDs for customers,hotels,bookings and disputes.

exports.genCustID = function(name,email,phoneNum){
    return "CU_" + name.substring(0, name.indexOf(' ')) + email.slice(0,4) + phoneNum.slice(2,6) 
}

exports.genHotelID = function(name,email,phoneNum){
    return "HO_" + name.substring(0, name.indexOf(' ')) + email.slice(0,4) + phoneNum.slice(2,6)
}

exports.genBookingID = function(hID,cID){
    return "B_" + hID.slice(0,5) + cID.slice(0,5) + (Date.now().toString())
}

exports.genDisputeID = function(hID,cID){
    return "D_" + hID.slice(0,5) + cID.slice(0,5) + (Date.now().toString())
}