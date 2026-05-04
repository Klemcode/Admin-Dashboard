const express = require("express");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
// const env = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoute = require("./routes/students.route");
const userModel = require("./models/user.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Database connected successfully");
    await userModel.syncIndexes();
  })
  .catch((err) => {
    // console.error('Error connecting to DB');

    // types of error so that I will know where ogun come from
    if (err.message.includes("ECONNREFUSED")) {
      console.log("Network/DNS is blocking MongoDB");
    }

    if (err.message.includes("ReplicaSetNoPrimary")) {
      console.log("Cannot reach cluster (check IP whitelist or network)");
    }

    if (err.message.includes("authentication failed")) {
      console.log("Wrong username or password");
    }

    // This isn my full error too
    console.error(err.message);
  });

app.use("/api/v1", UserRoute);

// let students = [
//   {
//     name: "Clement",
//     degree: "Crop and Environmental Protection",
//     level: "400Level",
//     cgpa: 4.80
//   },

//   {
//     name: "John",
//     degree: "Soil Science",
//     level: "500L",
//     cgpa: 3.70
//   }
// ];

// console.log(students);

// app.get('/about', (req,res)=>{

//     res.render('index', {students})
// })

// app.get('/login', (req,res)=>{

//     res.redirect('/home')
// })

// app.get('/home', (req,res)=>{

//     res.sendFile(__dirname+'/index.html')
// })

// app.get('/contact', (req,res)=>{

// res.render('allStudents', {students})

// })

// app.post('/delUser/:id', (req, res)=>{

// const {id}= req.params
// students.splice(id,1)
// res.render('allStudents', {students})

// })

// app.get('/addUser', (req, res)=>{

//     res.render('addUser')
// })

// app.post('/addUser', (req, res)=>{
//     console.log(req);
//     const {name, degree, cgpa, level} = req.body
//     students.push(req.body)
//     res.render('allStudents', {students})
// })

// // Edit student details start//

// app.get('/editUsers/:id', (req, res) => {
//     const {id} = req.params
//     const student = students[id];
//     res.render('editUsers', { student, id });
// });

// app.post('/editUsers/:id', (req, res) => {

//     const {name, degree, cgpa, level} = req.body;
//     const{id} = req.params
//     students.splice(id, 1, req.body)
//     res.render('allStudents', {students});
// });

// Edit student details end//

const myPort = process.env.PORT;
app.listen(myPort, (err) => {
  if (err) {
    console.log("I can not start server, pls check error");
  } else {
    console.log(`Server started successfully at port ${myPort}`);
  }
});
