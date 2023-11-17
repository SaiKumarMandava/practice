const mongoose=require('mongoose')
const teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    phone_number:{
        type:Number,
    },
   
},{timestamps:true})
module.exports=mongoose.model('Teacher',teacherSchema)
