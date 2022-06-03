/*
NAIVE LOGIC

make an array of ength 366
0 index = jan 1 and so on
now when a room is booked, it will be added to this array accordingly
so if a room is booked from  jan 1 to jan 5
the room id will be in 0,1,2,3,4
when user searches
we see the from date
suppose he puts from date as 4 jan
convert it to this index format
then iterate from that index
remove the rooms that are occupied by seeing from the list and show the unoccupied rooms as the result

non leap year means just mark all the rooms as occupied on 365 index

Date formats:

var date = new Date();
console.log(date.toLocaleDateString()); 15/5/2022
console.log(date.toDateString());  Sun May 15 2022
console.log(date.toGMTString());   Sun, 15 May 2022 10:50:02 GMT



Group rooms by hotel
If the group size is less than hotel's total room count that means a room is available
Add the hotel to an array which will display all available hotels


WHile booking room in a specific hotel,
We run the room IDs of that hotel in the group rooms by hotel array (mentioned above). Find a room ID from all of the room IDs
of the hotel which is not occupied for that duration.
Then we add that room ID to the group rooms by hotel for that specific day.
Also add the room ID to the booking.

TO CONVERT SET TO ARRAY:
Array.from(setName)
*/

const { dateToIndexConverter } = require("./DateToIndexConverter")

exports.findAllAvailableHotels = async(fromDate, toDate) => {
    // DATE FORMAT IS MM/DD/YYYY
    // const { fromDate, toDate } = req.body
    const fromIndex = dateToIndexConverter(fromDate)
    const toIndex = dateToIndexConverter(toDate)
    
}

exports.findAvailableRoomOfHotel = async (hotelID) => {

}