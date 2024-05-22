// controllers/moviesController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewMovie = async (req, res) => {
  const { title, duration, description, videoUrl, channelId, typeId, categoryId } = req.body;
  if (!title || !videoUrl || !channelId || !typeId || !categoryId) {
    return res.status(400).json({ message: "Please provide movie title, video URL, duration, description, channel ID, type ID, and category ID" });
  }

  try {
    const movie = await prisma.movies.create({
      data: {
        title,
        duration,
        description,
        videoUrl,
        channelId,
        typeId,
        categoryId,
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
      include: {
        channel: true,
        type: true,
        category: true,
      },
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
      include: {
        channel: true,
        type: true,
        category: true,
      },
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
  const { title, duration, description, videoUrl, channelId, typeId, categoryId } = req.body;

  try {
    const movie = await prisma.movies.findUnique({ where: { id: parseInt(id) } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updatedMovie = await prisma.movies.update({
      where: { id: parseInt(id) },
      data: {
        title,
        duration,
        description,
        videoUrl,
        channelId,
        typeId,
        categoryId,
      },
    });
    return res.status(200).json({ message: "Movie updated", updatedMovie });
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


const toggleSuspend = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Channel.findOne({ where: { id } });
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
  
      result.suspend = !result.suspend; // Remove the space before 'account_status'
      await result.save();
  
      return res.status(201).json({ message: `status is updated ` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server problem" });
    }
  };

module.exports = {
  handleNewMovie,
  handleGetAllMovies,
  handleGetMovieById,
  handleUpdateMovie,
  toggleSuspend,
  handleDeleteMovie,
};
