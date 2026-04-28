const mongoose= require('mongoose')
const studentsSchema= mongoose.Schema({
    name:{type:String, required: true},
    degree:{type:String, required: true},
    level:{type:String, required: true},
    cgpa:{type:Number, required: true , min: 0, max: 5},
    email:{type: String, required: true, unique: true, lowercase: true, trim: true},
     image: { type: String }
},
    {timestamps: true}
)

const userModel= mongoose.model('user', studentsSchema)
module.exports= userModel
