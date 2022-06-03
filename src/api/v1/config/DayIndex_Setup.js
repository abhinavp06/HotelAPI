/*
If the collection exists, send message to console saying that it exists
If it doesn't then create 366 iterations of the DayIndex schema
*/

const DayIndex = require("../models/DayIndex")

exports.setUpDayIndex = function(){
        // var db = "Hotel-Management-API"

        // db.listCollections({name: "DayIndex"}).next(function(err, model) {
        //     if (model) {
        //         // The collection exists
        //         console.log(`Exists`)
        //     }else{
        //         console.log(`Does not exist`)
        //     }
        // });

        // if(db.getCollection("DayIndex")){
        //     console.log(`Collection exists`)
        // }else{
        //     console.log(`Does not exist`)
        // }
        // const doesItExist = db.collection("DayIndex")
        // if(doesItExist){
        //     console.log(`Collection exists`)
        // }else{
        //     console.log(`Does not exist`)
        // }
     
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