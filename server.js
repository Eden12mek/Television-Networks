require('dotenv').config();
const cors=require("cors")
const corsOptionsDelegate=require('./config/cors.js')
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyJWT = require('./middleware/verifyJWT');
const { verify } = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 4000;
// const corsOptionsDelegate = {
//   origin: 'http://localhost:3000', // Replace this with your actual client origin
//   optionsSuccessStatus: 200 // Some legacy browsers (IE11) choke on 204
// };
app.use(express.json());
app.use(cors(corsOptionsDelegate))
app.use("/ums", require('./routes/api/register'));
app.use("/ums", require('./routes/api/auth'));

// Place verifyJWT middleware here to protect resource management routes
// app.use(verifyJWT);

// app.use("/General", require('./routes/api/moviesrouter'));
app.use("/General", require('./routes/api/channelrouter'));
// app.use("/General", require('./routes/api/categoriesrouter'));
// app.use("/General", require('./routes/api/typerouter'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
