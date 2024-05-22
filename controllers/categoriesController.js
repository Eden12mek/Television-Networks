const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewCategory = async (req, res) => {
  const { name, moviesId } = req.body;
  if (!name || !moviesId) {
    return res.status(400).json({ message: "Please provide category name and movie ID" });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        moviesId: parseInt(moviesId),
      },
    });
    return res.status(201).json({ message: "New category created", category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { movies: true },
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const handleGetCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { movies: true },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, moviesId } = req.body;

  try {
    const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        moviesId: parseInt(moviesId),
      },
    });
    return res.status(200).json({ message: "Category updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleDeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleNewCategory,
  handleGetAllCategories,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
};
