// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());



//app.use("/ums", require('./routes/api/ums'));
app.use("/General", require('./routes/api/moviesrouter'));
app.use("/General", require('./routes/api/channelrouter'));
app.use("/General", require('./routes/api/programrouter'));
// app.use("/project", require('./routes/api/projectroute'));
// app.use(verifyJWT);
// app.use("/trash", require('./routes/api/trash.js'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
