const express=require('express')
const router=express.Router()

const {createTeacher, getTeacher,getOneTeacher,updateTeacher,deleteTeacher}=require('../controller/teacher')
router.post('/teacher',createTeacher)
router.get('/teacher',getTeacher)
router.get('/teacher/:id',getOneTeacher)
router.put('/teacher/:id',updateTeacher)
router.delete('/teacher/:id',deleteTeacher)



module.exports=router;

