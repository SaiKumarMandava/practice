const express=require('express')
const Teacher=require('../model/teacher')
exports.createTeacher=async (req,res)=>{
    try{
        const teacher=new Teacher(req.body)
        await teacher.save()
        res.status(200).json({msg:"created",teacher}) 
    }
    catch(error){
        res.status(404).json({msg:"Error",error})
    }
}
//fetching all teachers
exports.getTeacher=async (req,res)=>{
    try{
        const teacher= await Teacher.find()
        res.status(200).json({msg:"fetched",teacher})
    }
    catch(error){
        console.log("Error",error)
        res.status(404).json({Msg:"Error",error})
    }
}
//fetching one teacher
exports.getOneTeacher=async (req,res)=>{
    try{
        const teacher=await Teacher.findById(req.params.id)
        res.status(200).json({msg:"fetched one teacher",teacher})
    }
    catch(error){
        console.log("Error",error)
        res.status(404).json({Msg:"Error",error})
    }
}
//updating teacher by id
exports.updateTeacher=async (req,res)=>{
    try{
        const teacher=await Teacher.findByIdAndUpdate({_id:req.params.id},req.body)
        console.log(req.body)
        res.status(200).json({msg:"updated",teacher})
    }
    catch(error){
        console.log("Error",error)
    }
}

//deleting by id
exports.deleteTeacher=async (req,res)=>{
    try{
        const teacher=await Teacher.findOneAndDelete({_id:req.params.id})
        res.status(500).json({msg:"deleted",teacher})
    }
    catch(error){
        console.log("Error",error)
    }
}