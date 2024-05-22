const express=require('express');
const router=express.Router();
const multer=require('multer')
const channelController= require('../../controllers/channelController')
router.route('/channel')
    .post(channelController.handleNewChannel)
router.route('/channel/get/:id')
    .get(channelController.handleGetChannelById)
router.route('/channel/getall')
    .get(channelController.handleGetAllChannels)
router.route('/channel/update/:id')
    .put(channelController.handleUpdateChannel)
router.route('/channel/delete/:id')
    .delete(channelController.handleDeleteChannel)
router.route('/channel/changestatus/:id')
    .get(channelController.toggleSuspend);

module.exports=router;
