// controllers/channelController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewChannel = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please provide channel name" });
  }

  try {
    const channel = await prisma.channel.create({
      data: { name },
    });
    return res.status(201).json({ message: "New channel created", channel });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetAllChannels = async (req, res) => {
  try {
    const channels = await prisma.channel.findMany({
      include: { movies: true },
    });
    return res.status(200).json(channels);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleGetChannelById = async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await prisma.channel.findUnique({
      where: { id: parseInt(id) },
      include: { movies: true },
    });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    return res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleUpdateChannel = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const channel = await prisma.channel.findUnique({ where: { id: parseInt(id) } });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    await prisma.channel.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    return res.status(200).json({ message: "Channel updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleDeleteChannel = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.channel.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Channel deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const toggleSuspend = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const channel = await prisma.channel.findUnique({ where: { id } });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const updatedChannel = await prisma.channel.update({
      where: { id },
      data: { suspend: !channel.suspend }
    });

    return res.status(200).json({ message: "Channel suspension status updated", updatedChannel });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleNewChannel,
  handleGetAllChannels,
  handleGetChannelById,
  handleUpdateChannel,
  toggleSuspend,
  handleDeleteChannel,
};
