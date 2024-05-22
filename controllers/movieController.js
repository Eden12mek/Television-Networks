// controllers/moviesController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewMovie = async (req, res) => {
  const { title, video } = req.body;
  if (!title || !video) {
    return res.status(400).json({ message: "Please provide movie title, video URL, and categories" });
  }

  try {
    const movie = await prisma.movies.create({
      data: {
        title,
        video,
        // categories: {
        //   connect: categories.map(id => ({ id })),
        // },
      },
    });
    return res.status(201).json({ message: "New movie created", movie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movies.findMany({
      include: { categories: true },
    });
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movies.findUnique({
      where: { id: parseInt(id) },
      include: { categories: true },
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleUpdateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, video, categories } = req.body;

  try {
    const movie = await prisma.movies.findUnique({ where: { id: parseInt(id) } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await prisma.movies.update({
      where: { id: parseInt(id) },
      data: {
        title,
        video,
        // categories: {
        //   set: categories.map(id => ({ id })),
        // },
      },
    });
    return res.status(200).json({ message: "Movie updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleDeleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.movies.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleNewMovie,
  handleGetAllMovies,
  handleGetMovieById,
  handleUpdateMovie,
  handleDeleteMovie,
};
