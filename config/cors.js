const express = require('express');
const cors = require('./cors');

const app = express();
const port = 4000;

app.use(cors);

// Your other middleware and routes go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});