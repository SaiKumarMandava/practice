const express = require('express')
const router = express.Router()


const {createStudent,getStudent,updateStudent,deleteStudent,getOneStudent,getOneStudentMentor,getOneStudentplacement, 
    updateStudentField, studentLogin, authenticateStudent, studentProfile} = require('../controller/student')

router.post('/student',createStudent)

router.get('/student',getStudent)

router.get('/student/:id',getOneStudent)
// router.get('/student-mentor/:id',getOneStudentMentor)
// router.get('/student-placement/:id',getOneStudentplacement)


router.put('/student/:id',updateStudent)
// router.put('/student/:id',updateStudentField)
router.delete('/student/:id',deleteStudent)
router.post('/student_login',studentLogin)
router.get('/authenticate',authenticateStudent,studentProfile)

module.exports = router;