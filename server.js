// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// CRUD for Channels

// Create a new channel
app.post('/channels', async (req, res) => {
  const { name } = req.body;
  try {
    const channel = await prisma.channel.create({
      data: {
        name,
      },
    });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all channels
app.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.channel.findMany();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single channel by ID
app.get('/channels/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await prisma.channel.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a channel by ID
app.put('/channels/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const channel = await prisma.channel.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a channel by ID
app.delete('/channels/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.channel.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Channel deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Repeat similar CRUD operations for Programs, Categories, Movies, Users, Favorites, and Histories

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
