const express=require('express')
const router=express.Router()

const {createPlacement,getPlacement, getOnePlacement, updatePlacement, deletePlacement}=require('../controller/placement')
router.post('/placement',createPlacement)
router.get('/placement',getPlacement)
router.get('/placement/:id',getOnePlacement)
router.put('/placement/:id',updatePlacement)
router.delete('/placement/:id',deletePlacement)

module.exports = router
