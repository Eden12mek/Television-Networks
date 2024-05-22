const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewChannel = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please provide channel name" });
  }

  try {
    const channel = await prisma.channel.create({
      data: {
        name
      },
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
      include: { programs: true },
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
      include: { programs: true },
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
  const { name, programs } = req.body;

  try {
    const channel = await prisma.channel.findUnique({ where: { id: parseInt(id) } });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    await prisma.channel.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
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
    handleNewChannel,
    handleGetAllChannels,
    handleGetChannelById,
    handleUpdateChannel,
    toggleSuspend,
    handleDeleteChannel,
  };
