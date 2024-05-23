const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewType = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please provide type name" });
  }

  try {
    const type = await prisma.type.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ message: "New type created", type });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetAllTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany({
      include: { movies: true },
    });
    return res.status(200).json(types);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await prisma.type.findUnique({
      where: { id: parseInt(id) },
      include: { movies: true },
    });
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }
    return res.status(200).json(type);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleUpdateType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const type = await prisma.type.findUnique({ where: { id: parseInt(id) } });
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    await prisma.type.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });
    return res.status(200).json({ message: "Type updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleDeleteType = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.type.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Type deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleNewType,
  handleGetAllTypes,
  handleGetTypeById,
  handleUpdateType,
  handleDeleteType,
};
