// routes/categories.js
const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const categoriesController = require('../../controllers/categoriesController');

router.use(verifyJWT);

router.route('/categories')
    .post(verifyJWT, categoriesController.handleNewCategory);
router.route('/categories/get/:id')
    .get(verifyJWT,categoriesController.handleGetCategoryById);
router.route('/categories/getall')
    .get(verifyJWT,categoriesController.handleGetAllCategories);
router.route('/categories/update/:id')
    .put(verifyJWT, categoriesController.handleUpdateCategory);
router.route('/categories/delete/:id')
    .delete(verifyJWT, categoriesController.handleDeleteCategory);

module.exports = router;
