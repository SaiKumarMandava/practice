const express=require('express')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Student=require('../model/student')

maxAge=3 * 24 * 60 * 60

const createToken=(id)=>{
    jwt.sign({id},process.env.JWT_SECRETE,{
        expiresIn:maxAge
    })
        
}

exports.createStudent = async (req,res)=>{
    try{
        const {email,passowrd}=req.body
        const existStudent=await Student.findOne({email:email})
        // const existStudentLastName=await Student.findOne({last_name:req.body.last_name})
        
        if (existStudent){
            return res.status(404).json({msg:"Student already exist"})
            
        }
        const student = new Student(req.body)
        // student.email=email.toLowercase()
        const salt=await bcrypt.genSalt(10)
        student.password= await bcrypt.hash(password,salt)

        await student.save()

        const token=createToken(student._id)

       return res.status(201).json({msg:"Succesfully Created",student,token})
    
    }catch(error){
        console.log(error)
       return res.status(404).json({msg:"Error",error})
    }
  
}

exports.getStudent = async (req,res)=>{
    try{

        const student = await Student.find()
        return res.status(200).json({msg:"Succesfully Fetched All Student",student})

    }catch(error){
        console.log("Error",error)
    }

}

exports.getOneStudent = async (req,res)=>{
    try{

        const student = await Student.findById(req.params.id).populate("placement").populate('teacher').exec()
        console.log(student)
        console.log(student.teacher.name)
        console.log(student.placement.name)
        // if (student.teacher) {
        //     student.teacher.map(item => {
        //         console.log(item);
        //     });
        // }
        return res.status(200).json({msg:"Succesfully Fetched One Student",student})

    }catch(error){
        console.log("Error",error)
        return res.status(404).json({Msg:"Error",error})
    }

}

// exports.getOneStudentMentor = async (req,res)=>{
//     try{

//         const student = await Student.find({teacher:req.params.id}).populate('teacher')
//         // 
//         student.map(item =>{
//             console.log(item.teacher.name)
          
//         })
//         return res.status(200).json({msg:"Succesfully Fetched One Student",student})


//     }catch(error){
//         console.log("Error",error)
//         return  res.status(204).json({Msg:"Error",error})
//     }

// }
// exports.getOneStudentplacement = async (req,res)=>{
//     try{

//         const student = await Student.find({placement:req.params.id}).populate('placement')
//         // 
//         student.map(item =>{
//             console.log("Student" +" " +item.first_name+ " "+item.last_name+ " "+ "is assigned to" +" " +item.placement.name)
            
          
//         })
//         return res.status(200).json({msg:"Succesfully Fetched One Student",student})


//     }catch(error){
//         console.log("Error",error)
//         return  res.status(404).json({Msg:"Error",error})
//     }

// }



exports.updateStudent = async (req,res)=>{
    console.log(req.body.skills)
    console.log(req.body.position)
    try{
        const { id }=req.params
        const student= await Student.findByIdAndUpdate({_id:req.params.id},req.body)
        
        
        if(!student){
            return res.status(404).json({msg:"student not found"})
        } 
        //updating specific 
        if(req.body && req.body.skills){
           
            student.skills = req.body.skills;
          
           //$addToSet is work only on array to inset items you can enter multiple items
            await Student.updateOne({_id:id},{$addToSet:{"profile.skills":req.body.skills}}) 
           
            


        }
        if(req.body && req.body.position){
            student.position=req.body.position
            //$set is used to update individual
            await Student.updateOne({_id:id},{$set:{"profile.position":req.body.position}})
        }
       const d= await student.save();
      console.log(req.body)
        return res.status(200).json({msg:'updated',student})
    }catch(error){
        console.log("Error",error)
    }
}



exports.deleteStudent = async (req,res)=>{
    try{
        const student = await Student.findByIdAndDelete({_id:req.params.id})            
        console.log(student)
        return  res.status(500).json({msg:"Delete Succesfull",student})

    }catch(error){
        console.log("Error",error)
    }

}

