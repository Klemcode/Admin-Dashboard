const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const getAddStudentPage = (req, res) => {
  res.render("addStudent");
};

const saveStudentToDB = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // ✅ store hashed password
      degree: req.body.degree,
      level: req.body.level,
      cgpa: req.body.cgpa,
      image: req.file.path
    });

    res.send("Student created successfully");

  } catch (error) {
    if (error.code === 11000) {
      return res.send("User already exists");
    }

    console.log(error);

    res.status(500).send({
      message: "Creation failed"
    });
  }
};

// log in

const login= async (req, res)=>{

  const {email, password} =req.body
  try {
    const user= await userModel.findOne({email})
    if(!user){
      res.status(404).send({
        message: "invalid credentials"
      })
      return
    }

    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){
      res.status(404).send({
        message: "Invalid credentials"
      })
      return
    }
      res.status(200).send({
      message: "User logged in successfully",
      data: {
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    
    console.log(error);
    res.status(404).send({
      message: "invalid credential"
    })
    
  }

}



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

//Delete data from DB
const deleteDBStudent = async(req, res)=>{

  const {id}=req.params
  try {
    await userModel.findByIdAndDelete(id)
    res.status(200).send({
      message:"User deleted successfully"
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "failed to delete user"
    })
  }
}

//edit what is in the DB

const editDBUser = async (req, res)=>{
const {id}= req.params
const {name, cgpa}= req.body
try {
  
  await userModel.findByIdAndUpdate(id, {name, cgpa})
  res.status(200).send({
    message: "User Edited Successfully"
  })
} catch (error) {
  console.log(error);
  res.status(400).send({
    message: "Error editing DB User"
  })
  
}

}

module.exports = { 
  getAddStudentPage, 
  saveStudentToDB, 
  displayStudents,
deleteDBStudent,
editDBUser,
login};
