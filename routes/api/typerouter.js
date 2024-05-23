const express=require('express');
const router=express.Router();
const multer=require('multer')
const typeController= require('../../controllers/typeController')
router.route('/type')
    .post(typeController.handleNewType)
router.route('/type/get/:id')
    .get(typeController.handleGetTypeById)
router.route('/type/getall')
    .get(typeController.handleGetAllTypes)
router.route('/type/update/:id')
    .put(typeController.handleUpdateType)
router.route('/type/delete/:id')
    .delete(typeController.handleDeleteType)

module.exports=router;
