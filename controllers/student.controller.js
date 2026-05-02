const userModel = require("../models/user.model");

const getAddStudentPage = (req, res) => {
  res.render("addStudent");
};

const saveStudentToDB = async (req, res) => {
  try {
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      degree: req.body.degree,
      level: req.body.level,
      cgpa: req.body.cgpa,
      image: req.file.path, //Cloudinary image URL
    });
    res.send("Student created successfully");
  } catch (error) {
    if (error.code === 11000) {
      return res.send("User already exist");
    }
    console.log(error);
    res.send("Creation failed");
  }
};

// display students from the db

const displayStudents = async (req, res) => {
  let student = [];
  try {
    student = await userModel.find();
    console.log(student);
    res.render("displayStudents", { student });
    // res.status(200).send({
    //   message: "Students retrieved from DB successfully",
    //   data: student
    // })
  } catch (error) {
    console.log(error);
    res.render("displayStudents", { student });
  }
};

module.exports = { getAddStudentPage, saveStudentToDB, displayStudents };
