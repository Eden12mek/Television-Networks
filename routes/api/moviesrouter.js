const express=require('express');
const router=express.Router();
const multer=require('multer')
const moviesController= require('../../controllers/movieController')
router.route('/movies')
    .post(moviesController.handleNewMovie)
router.route('/movies/get/:id')
    .get(moviesController.handleGetMovieById)
router.route('/movies/getall')
    .get(moviesController.handleGetAllMovies)
router.route('/movies/update/:id')
    .put(moviesController.handleUpdateMovie)
router.route('/movies/delete/:id')
    .delete(moviesController.handleDeleteMovie)

module.exports=router;
