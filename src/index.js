let express = require("express")
let PORT = process.env.PORT || 5000;
let app = express();


// now imporing the code of database connection
require("./db/conn")
// now importing model of databse in index.js
let Student = require("./models/students")


// as we do post request in api but to get it properly we covert in to json file using middleware
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to REST API THAPA")
})



// now this is for creating a new data 
// but this is promise based
// app.post("/students", (req, res) => {
//     // now this user store all the data input in api call
//     let user = new Student(req.body)

//     // now to add this data into db
//     user.save().then(() => {
//         res.status(201).send(user)
//         console.log(user)

//     }).catch((error) => {
//         res.status(400).send(error)
//         console.log("error while posting the data" + error)
//     })

// })




// now async await based fnc in POST request
app.post("/students", async (req, res) => {
    try {
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
app.get("/students", async (req, res) => {
    try {
        let studentData = await Student.find();
        res.send(studentData);
    } catch (error) {
        console.log(" error ");
    }
})


// to fetch a particular record using id
app.get("/students/:id", async (req, res) => {
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
app.patch("/students/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let updateStudent = Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).send(updateStudent)

    } catch (error) {
        res.status(404).send("invalid update command")
        // console.log("error")
        console.log(error)

    }
})






app.listen(PORT, () => {
    console.log(`running at port ${PORT}`)
})