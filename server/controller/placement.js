const express=require('express')
const Placement=require('../model/placement')

exports.createPlacement= async (req,res)=>{
    try{
        const placement=new Placement(req.body)
        await placement.save()
        res.status(200).json({msg:'success',placement})
    }
    catch(error){
        res.status(404).json({msg:"Error",error})
    }
}

//fetching
exports.getPlacement=async (req,res)=>{
    try{
        const placement= await Placement.find()
        res.status(200).json({msg:"fetched",placement})
    }
    catch(error){
        console.log("Error",error)
    }
}

//fetching by id
exports.getOnePlacement=async (req,res)=>{
    try{
        const placement=await Placement.findById(req.params.id)
        res.status(201).json({msg:"feetched one",placement})
    }
    catch(error){
        console.log("Error",err)
        res.status(404).json({Msg:"Error",error})
    }

}

//updating
exports.updatePlacement=async (req,res)=>{
    try{
        const placement=await Placement.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(390).json({msg:"updated",placement})
    }
    catch(error){
        console.log("Error",error)
    }
}

//deletin by id
exports.deletePlacement=async (req,res)=>{
    try{
        const placement=await Placement.findByIdAndDelete({_id:req.params.id})
        res.status(360).json({msg:"deleted",placement})
    }
    catch(error){
        console.log("Error",error)
    }
}