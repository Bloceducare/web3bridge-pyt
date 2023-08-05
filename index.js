const express = require('express');
const cors = require('cors');
// import dotenv from 'dotenv';
require('dotenv').config()
const {getDaoUsers} = require('./services');

const app = express();
const port = process.env.PORT || 3000;

// GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    message: `Welcome visitor JO`,
  });
});

app.get('/dao', async (req, res) => {
  const daoUsers = await getDaoUsers();
  return res.json({
    message: daoUsers,
  });
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
