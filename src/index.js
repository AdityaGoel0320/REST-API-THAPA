let express = require("express")
let PORT = process.env.PORT || 5000;
let app = express();


// now imporing the code of database connection
require("./db/conn")
// now importing model of databse in index.js
let Student = require("./models/students")


// now importing routes code to use express.routes on page
let studentRoutes = require("./routes/students")
app.use(studentRoutes)



// as we do post request in api but to get it properly we covert in to json file using middleware
app.use(express.json())



app.get("/", (req, res) => {
    res.send("welcome to REST API THAPA")
})


app.listen(PORT, () => {
    console.log(`running at port ${PORT}`)
})
















