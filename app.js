const express = require('express');
const blogRouter = require('./routes/blog');
const { db } = require('./db');

db.connect();

const app = express();

app.use(express.json());
app.use('/api/blogs', blogRouter);

app.on('close', () => {
  db.disconnect();
});

module.exports = app;
