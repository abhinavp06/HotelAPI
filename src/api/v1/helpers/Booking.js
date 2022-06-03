/*
Move booked room to the dayindex array
Move booked room to Hotel's occupied room array
*/

exports.moveRoomToDayIndex = function(roomid, fromDate, toDate){
    // When a customer creates a new booking, this method is called
    // Add the roomid to the day index for the indexes starting from the fromDate to the toDate
}

exports.billCalculator = function(fromIndex, toIndex, roomPrice){ // CALLED WHEN BOOKING IS MADE
    return (toIndex - fromIndex + 1)* roomPrice
}