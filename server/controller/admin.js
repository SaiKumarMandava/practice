const express=require('express')
const Admin=require('../model/admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    })

}

//creatioh
 exports.createAdmin=async(req,res)=>{
    const {email,password} = req.body
    try{
     const existAdmin=await Admin.findOne({email:email})
     if(existAdmin){
        return res.status(401).json({msg:"user exist"})
     }
    const admin=new Admin(req.body)
    admin.email=email.toLowerCase()
    //passowrd encryption
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password,salt)
    await admin.save()
    const token=createToken(admin._id)
    return res.status(201).json({msg:"Succesfully Created",admin,token})
 }catch(error){
    console.log(error)
    res.status(401).json({err:"error in creation",error})
 }
}

//update
exports.updateAdmin=async(req,res)=>{
    // profile:{
    //     name:"Sahana",
    //     designation:"Senior Software Engineer",
    //     place:"bengaluru",
    //     skills:['dbms','java',"javascript","mongodb"],

    // }
    console.log(req.body)
   
        try{
        const admin = Admin.findById(req.params.id)
        console.log(req.body.password)
        if(req.body.password){
            const salt =await bcrypt.genSalt(10)
            admin.password=await bcrypt.hash(req.body.password,salt)
        }
        await Admin.updateOne({_id:req.params.id},req.body)
        // await admin.save()
        res.status(201).json({msg:"updated successfully"})
    }catch(error){
        console.log(error)
        res.status(401).json({msg:"error",error})
    }
}

//login
exports.adminLogin=async(req,res)=>{
    const {email, password}=req.body
    try{
        const admin=await Admin.findOne({email:email})
        if(!admin){
            return res.status(400).json({msg:'Invalid User'})
        }
        const isMatch=await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return  res.status(400).json({msg:'Invalid Password'}) 
        }
        const token = createToken(admin._id);
        res.status(201).json({msg:'Loggin success', token, admin})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Error in login",error})

    }
}