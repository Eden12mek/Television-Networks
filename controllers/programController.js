const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewProgram = async (req, res) => {
  const { name, category, type, channelId } = req.body;
  if (!name || !category || !type || !channelId) {
    return res.status(400).json({ message: "Please provide program name, category, type, and channel ID" });
  }

  try {
    const program = await prisma.program.create({
      data: {
        video,
        duration,
        title,
        category,
        type,
        suspend,
        channelId: parseInt(channelId),
      },
    });
    return res.status(201).json({ message: "New program created", program });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetAllPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      include: { channel: true, suspend:active },
    });
    return res.status(200).json(programs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id) },
      include: { channel: true,  suspend:active },
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    return res.status(200).json(program);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleUpdateProgram = async (req, res) => {
  const { id } = req.params;
  const { name, category, type, channelId } = req.body;

  try {
    const program = await prisma.program.findUnique({ where: { id: parseInt(id) } });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await prisma.program.update({
      where: { id: parseInt(id) },
      data: {
        name,
        category,
        type,
        channelId: parseInt(channelId),
      },
    });
    return res.status(200).json({ message: "Program updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleDeleteProgram = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.program.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Program deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleNewProgram,
  handleGetAllPrograms,
  handleGetProgramById,
  handleUpdateProgram,
  handleDeleteProgram,
};
