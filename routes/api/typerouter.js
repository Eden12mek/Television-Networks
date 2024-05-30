const express=require('express');
const router=express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const { adminOnly } = require('../../middleware/roleMiddleware');
const typeController= require('../../controllers/typeController')

const multer=require('multer')

router.use(verifyJWT);


router.route('/type')
    .post(adminOnly, typeController.handleNewType)
router.route('/type/get/:id')
    .get(typeController.handleGetTypeById)
router.route('/type/getall')
    .get(typeController.handleGetAllTypes)
router.route('/type/update/:id')
    .put(adminOnly, typeController.handleUpdateType)
router.route('/type/delete/:id')
    .delete(adminOnly, typeController.handleDeleteType)

module.exports=router;
