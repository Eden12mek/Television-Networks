// routes/categories.js
const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const categoriesController = require('../../controllers/categoriesController');

// router.use(verifyJWT);

router.route('/categories')
    .post( categoriesController.handleNewCategory);
router.route('/categories/get/:id')
    .get(categoriesController.handleGetCategoryById);
router.route('/categories/getall')
    .get(categoriesController.handleGetAllCategories);
router.route('/categories/update/:id')
    .put( categoriesController.handleUpdateCategory);
router.route('/categories/delete/:id')
    .delete( categoriesController.handleDeleteCategory);

module.exports = router;
