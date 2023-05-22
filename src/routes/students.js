let express = require("express")
let router = new express.Router();


// now importing model of databse in index.js
let Student = require("../models/students")

// now POST request
router.post("/students", async (req, res) => {
    try {
        console.log(req.body)
        // now this user store all the data input in api call
        let user = new Student(req.body)

        // now to add this data into db
        let createUser = await user.save()
        res.status(201).send(createUser)
        console.log("data creation done")

    } catch (error) {
        res.status(400).send(error)
    }

})






// to fetch all data of students-api
router.get("/students", async (req, res) => {
    try {
        console.log(req.body)
        let studentData = await Student.find();
        res.send(studentData);
    } catch (error) {
        res.status(400).send(error)
    }
})


// to fetch a particular record using id
router.get("/students/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let studentData = await Student.findById(_id);
        if (studentData == null) {
            res.status(404).send("page not found");

        }
        else {

            res.status(200).send(studentData)
        }

    } catch (error) {
        res.status(500).send("input data properly")
        console.log(" error ");
    }
})

// to update data using id
router.patch("/students/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let updateStudent = await Student.findByIdAndUpdate(_id, req.body);
        res.status(200).send(updateStudent)

    } catch (error) {
        res.status(404).send("invalid update command")
        // console.log("error")
        console.log(error)

    }
})


// to delter a particular record
router.delete("/students/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let deletedStudent = await Student.findByIdAndDelete(_id,)
        if (!_id) {
            return res.status(40).send("enter correct id")
        }
        res.status(200).send(deletedStudent)
    } catch (error) {
        res.status(404).send(error)
        console.log("error")
    }
})





module.exports = router; 