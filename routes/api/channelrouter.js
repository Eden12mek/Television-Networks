const express=require('express');
const router=express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { adminOnly } = require('../middleware/roleMiddleware');

const multer=require('multer')
const channelController= require('../../controllers/channelController')


const {
    handleNewChannel,
    handleGetAllChannels,
    handleGetChannelById,
    handleUpdateChannel,
    toggleSuspend,
    handleDeleteChannel
  } = require('../controllers/channelController');
  
  router.use(verifyJWT);
  
  router.post('/', adminOnly, handleNewChannel);
  router.get('/', handleGetAllChannels);
  router.get('/:id', handleGetChannelById);
  router.put('/:id', adminOnly, handleUpdateChannel);
  router.delete('/:id', adminOnly, handleDeleteChannel);
  router.patch('/:id/suspend', adminOnly, toggleSuspend);
  
  module.exports = router;