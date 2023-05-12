let mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/students-api")
    .then(() => {
        console.log("databse connected")
    }).catch((error) => {
        console.log("error in databse connection")
    })
