const express=require('express')
const router=express.Router()
const {createAdmin, adminLogin,updateAdmin}=require('../controller/admin')

router.post('/admin',createAdmin)
router.post('/admin_login',adminLogin)
router.put('/adminupdate/:id',updateAdmin)
module.exports = router;