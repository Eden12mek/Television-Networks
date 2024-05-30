const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const adminOnly = async (req, res, next) => {
   

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  
  if (user.role !== 'ADMIN') {
    return res.status(403).send('Access denied');
  }
  next();
};

const userOnly = async (req, res, next) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (user.role !== 'USER') {
    return res.status(403).send('Access denied');
  }
  next();
};

module.exports = { adminOnly, userOnly };