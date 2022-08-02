const express = require('express');
const blogRouter = require('./controllers/blog');
const { db } = require('./util/db');

const connectToDb = async () => {
  await db.connect();
};

connectToDb();
const app = express();

app.use(express.json());
app.use('/api/blogs', blogRouter);

app.on('close', () => {
  db.disconnect();
});

module.exports = app;
