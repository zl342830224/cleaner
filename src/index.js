require('dotenv').config();

const express = require('express');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');

const routes = require('./routes');
const { connectToDB } = require('./utils/db')
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`port listening on ${PORT}`)
  })
})
