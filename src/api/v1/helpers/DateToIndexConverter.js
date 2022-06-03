/*
Date formats:

var date = new Date();
console.log(date.toLocaleDateString()); 15/5/2022
console.log(date.toDateString());  Sun May 15 2022
console.log(date.toGMTString());   Sun, 15 May 2022 10:50:02 GMT

Use the first one
Jan 1 is index 0
Jan 2 is index 1 and so on...
*/

exports.dateToIndexConverter = function(date){
    var date1, date2;
    //define two date object variables with dates inside it
    date1 = new Date("01/01/2022"); // Currently only taking 2022 into account
    date2 = new Date(date)

    //calculate time difference
    var time_difference = date2.getTime() - date1.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    console.log(days_difference)
    return days_difference
}