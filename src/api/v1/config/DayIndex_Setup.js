const DayIndex = require("../models/DayIndex")

exports.setUpDayIndex = function(){
        //TEMPORARY
        try {
            for(var dayIndex=0;dayIndex<366;dayIndex++){
                const newDayIndex = new DayIndex({dayIndex})
                newDayIndex.save()
            }
            console.log(`Day index created!`)
        }catch (error) {
            console.log(error)
        }
}