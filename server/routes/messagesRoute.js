const express = require('express')
const{addMessage ,getAllMessage} = require('../controllers/messagesController.js')

const router=express.Router()

router.post('/addmessage',addMessage)
router.post('/getallmessage',getAllMessage)





module.exports = router