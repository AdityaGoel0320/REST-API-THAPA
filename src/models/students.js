let mongoose = require("mongoose")
let validator = require("validator")



let studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlenght: 3,
    },


    email: {
        type: String,
        require: true,
        minlenght: 3,
        unique: [true, "emailId should be unique"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is incorrect")
            }
        }

    },
    phone: {
        type: Number,
        // max: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    }
})


let Student = new mongoose.model("Student" , studentsSchema)


module.exports = Student ; 