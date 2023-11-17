const express=require('express')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Student=require('../model/student')

maxAge=3 * 24 * 60 * 60

const createToken = (id) =>{
  return  jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn:maxAge
    })
        
}

exports.createStudent = async (req,res)=>{
    try{
        const {email,password}=req.body
        const existStudent=await Student.findOne({email:email})
        // const existStudentLastName=await Student.findOne({last_name:req.body.last_name})
        
        if (existStudent){
            return res.status(401).json({msg:"Student already exist"})
            
        }
        const student = new Student(req.body)
        student.email=student.email.toLowerCase()


       
        const salt=await bcrypt.genSalt(10)
        student.password= await bcrypt.hash(password,salt)

        await student.save()

        const token= createToken(student._id)

       return res.status(201).json({msg:"Succesfully Created",student,token})
    
    }catch(error){
        console.log(error)
       return res.status(401).json({msg:"Error",error})
    }
  
}

exports.getStudent = async (req,res)=>{
    try{

        const student = await Student.find()
        return res.status(201).json({msg:"Succesfully Fetched All Student",student})

    }catch(error){
        console.log("Error",error)
        return res.status(401).json({msg:"Error",error})
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
        return res.status(201).json({msg:"Succesfully Fetched One Student",student})

    }catch(error){
        console.log("Error",error)
        return res.status(401).json({msg:"Error",error})
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
        return res.status(201).json({msg:'updated',student})
    }catch(error){
        console.log("Error",error)
        return res.status(401).json({msg:'error',error})
    }
}



exports.deleteStudent = async (req,res)=>{
    try{
        const student = await Student.findByIdAndDelete({_id:req.params.id})            
        console.log(student)
        return  res.status(500).json({msg:"Delete Succesfull",student})

    }catch(error){
        console.log("Error",error)
        res.status(401).json({err:"Something went wrong !",error})
    }

}


//student login
exports.studentLogin=async(req,res)=>{
    const {email,password}=req.body
    
    try{
        
        //comparing email is correct or not
        const student=await Student.findOne({email:email})
        console.log(req.body.password)
        if(!student){
            return res.status(400).json({msg:"invalid user"})
        }
        //comapring password is correct or not
        const isMatch= await bcrypt.compare(password,student.password)
        if(!isMatch){
            return res.status(400).json({msg:"invalid password"})
        }
        const token=createToken(student._id)
        return res.status(201).json({msg:"Login success",token})


    }catch(error){
        console.log(error)
        return res.status(400).json({error:"Error"})

    }
}





//authentication
 
exports.authenticateStudent=async(req,res,next)=>{
    //basic syntax rule 
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    
    ){
    try{
        console.log(req.headers.authorization.split(' '))
        let token = req.headers.authorization.split(' ')[1]  //only sepating token from bearer
        console.log(token)
        const decode= await jwt.verify(token,process.env.JWT_SECRET)
        console.log(`the decode id is ${decode.id}`)
        req.student = await Student.findById(decode.id).select('-password')
        next()
    //    res.status(201).json({msg:"authorized"})

    }catch(error){
        console.log(error)
        res.status(401).json({error:error.message}) 

    }
}
else{
    res.status(500).json({msg:'UnAutherized Access'}) 

}
}


//profile of student after authentication
exports.studentProfile=async(req,res)=>{
    try {
        const student = await Student.findById(req.student._id).select('-password')
        console.log(student);
        if(!student) {
 
         return res.status(401).json({json:"no Authorization"})
        }
 
     res.status(201).json(student) 
 
     } catch (error) {
             res.status(401).json({msg:"Something went wrong"}) 
 
     }   
}