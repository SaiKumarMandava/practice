const mongoose=require('mongoose')

const studentSchema= new mongoose.Schema({
    email:{
        type:String,
        trim:true,
       
    },
    password:{
        type:String,
        trim:true,
       
    },
    age:{
        type:Number,

    },
    course:{
        type:String,
        trim:true
    },
    phone_number:{
        type:Number,
       
    },
    address:{
        type:String,
        trim:true,

    },
    gender:{
        type:String,
    },
   

    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    placement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Placement'
    },
    profile:{
        skills:{
            type:Array
        },
        position:{
            type:String
        }

    }
},{timestamps:true})
module.exports = mongoose.model('Student',studentSchema) 