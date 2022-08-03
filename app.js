const express = require('express');
require('express-async-errors');
const authorRouter = require('./controllers/author');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const errorHandler = require('./middleware/errorHandler');
const { db } = require('./util/db');

const connectToDb = async () => {
  await db.connect();
};

connectToDb();
const app = express();

app.use(express.json());

app.use('/api/authors', authorRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

app.on('close', () => {
  db.disconnect();
});

module.exports = app;
