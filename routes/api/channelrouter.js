const express=require('express');
const router=express.Router();
const verifyJWT = require('../../middleware/verifyJWT');

const multer=require('multer')
const channelController= require('../../controllers/channelController')



router.route('/channel')
.post(verifyJWT,channelController.handleNewChannel);
router.route('/channel/get/:id')
.get(verifyJWT,channelController.handleGetChannelById);
router.route('/channel/getall')
.get(channelController.handleGetAllChannels);
router.route('/channel/update/:id')
.put(verifyJWT, channelController.handleUpdateChannel);
router.route('/channel/delete/:id')
.delete(verifyJWT, channelController.handleDeleteChannel);

  
module.exports = router;