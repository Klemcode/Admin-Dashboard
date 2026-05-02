const express= require('express')
const router= express.Router()
const {getAddStudentPage}= require('../controllers/student.controller')
const { saveStudentToDB } = require("../controllers/student.controller");
const {displayStudents}= require("../controllers/student.controller")


router.get('/addStudent', getAddStudentPage)

const upload = require("../config/multer");
router.post("/addStudent", upload.single("image"), saveStudentToDB);

router.get("/displayStudents", displayStudents)



module.exports=router

