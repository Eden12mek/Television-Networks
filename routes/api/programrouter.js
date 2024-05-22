const express=require('express');
const router=express.Router();
const multer=require('multer')
const programcontroller= require('../../controllers/programController')
router.route('/program')
    .post(programcontroller.handleNewProgram)
router.route('/program/get/:id')
    .get(programcontroller.handleGetProgramById)
router.route('/program/getall')
    .get(programcontroller.handleGetAllPrograms)
router.route('/program/update/:id')
    .put(programcontroller.handleUpdateProgram)
router.route('/program/delete/:id')
    .delete(programcontroller.handleDeleteProgram)

module.exports=router;
