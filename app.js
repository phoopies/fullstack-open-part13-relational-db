const express = require('express');
require('express-async-errors');
const blogRouter = require('./controllers/blog');
const errorHandler = require('./middleware/errorHandler');
const { db } = require('./util/db');

const connectToDb = async () => {
  await db.connect();
};

connectToDb();
const app = express();

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use(errorHandler);

app.on('close', () => {
  db.disconnect();
});

module.exports = app;
