const express= require('express')
const router= express.Router()
const {getAddStudentPage}= require('../controllers/student.controller')
const { saveStudentToDB, editDBUser } = require("../controllers/student.controller");
const {displayStudents, deleteDBStudent}= require("../controllers/student.controller")


router.get('/addStudent', getAddStudentPage)

const upload = require("../config/multer");
router.post("/addStudent", upload.single("image"), saveStudentToDB);

router.get("/displayStudents", displayStudents)

router.delete("/user/:id", deleteDBStudent)
router.patch("/user/:id", editDBUser)


module.exports=router

