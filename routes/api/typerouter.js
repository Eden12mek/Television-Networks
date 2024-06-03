const express=require('express');
const router=express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const typeController= require('../../controllers/typeController')

const multer=require('multer')

// router.use(verifyJWT);


router.route('/type')
    .post( typeController.handleNewType)
router.route('/type/get/:id')
    .get(typeController.handleGetTypeById)
router.route('/type/getall')
    .get(typeController.handleGetAllTypes)
router.route('/type/update/:id')
    .put( typeController.handleUpdateType)
router.route('/type/delete/:id')
    .delete( typeController.handleDeleteType)

module.exports=router;
