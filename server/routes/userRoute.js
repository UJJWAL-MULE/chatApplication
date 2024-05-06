const express = require('express')
const{ register, Login , SetAvatar ,getAllUser} = require('../controllers/userController.js')

const router=express.Router()

router.post('/register',register)
router.post('/login',Login)
router.post('/setavatar/:id', SetAvatar)
router.get('/allusers/:id' , getAllUser )




module.exports = router
