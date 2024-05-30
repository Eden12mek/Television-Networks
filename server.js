require('dotenv').config();

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyJWT = require('./middleware/verifyJWT');
const { verify } = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/ums", require('./routes/api/register'));
app.use("/ums", require('./routes/api/auth'));

// Place verifyJWT middleware here to protect resource management routes
app.use(verifyJWT);

app.use("/General", require('./routes/api/moviesrouter'));
app.use("/General", require('./routes/api/channelrouter'));
app.use("/General", require('./routes/api/categoriesrouter'));
app.use("/General", require('./routes/api/typerouter'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
