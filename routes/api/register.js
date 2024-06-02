const express=require('express');
const router=express.Router();
// const multer=require('multer')
const registerController = require('../../controllers/registerController')


router.route('/register')
    .post(registerController.handleNewUser)
module.exports=router;