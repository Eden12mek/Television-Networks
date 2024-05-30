const express=require('express');
const router=express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const { adminOnly } = require('../../middleware/roleMiddleware');

const multer=require('multer')
const channelController= require('../../controllers/channelController')



router.route('/channel')
.post(adminOnly,channelController.handleNewChannel);
router.route('/channel/get/:id')
.get(channelController.handleGetChannelById);
router.route('/channel/getall')
.get(channelController.handleGetAllChannels);
router.route('/channel/update/:id')
.put(adminOnly, channelController.handleUpdateChannel);
router.route('/channel/delete/:id')
.delete(adminOnly, channelController.handleDeleteChannel);

  
module.exports = router;