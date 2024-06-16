const express = require('express');
const router = express.Router();
const multer = require('multer');
const registerController = require('../../controllers/registerController');

// Configure multer for file upload
const storage = multer.memoryStorage(); // You can also use diskStorage for saving files to disk
const upload = multer({ storage: storage });

router.route('/register')
    .post(upload.single('image'), registerController.handleNewUser);

router.get('/userCount', registerController.getUserCount);
module.exports = router;
