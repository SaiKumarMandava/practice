const mongoose = require('mongoose')
const placementSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    phone:{
        type:Number,

    },
    address:{
        type:String,
        trim:true

    }
})
module.exports=mongoose.model('Placement',placementSchema)
