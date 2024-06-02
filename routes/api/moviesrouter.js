// routes/movies.js
const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const moviesController = require('../../controllers/movieController');

router.use(verifyJWT);

router.route('/movies')
    .post( moviesController.handleNewMovie);
router.route('/movies/get/:id')
    .get(moviesController.handleGetMovieById);
router.route('/movies/getall')
    .get(moviesController.handleGetAllMovies);
router.route('/movies/update/:id')
    .put( moviesController.handleUpdateMovie);
router.route('/movies/delete/:id')
    .delete( moviesController.handleDeleteMovie);
router.route('/movies/changestatus/:id')
    .get( moviesController.toggleSuspend);

module.exports = router;
