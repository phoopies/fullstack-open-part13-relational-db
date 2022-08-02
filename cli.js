const { db } = require('./util/db');
const Blog = require('./models/blog');

const main = async () => {
  db.connect();
  db.syncAll();

  const blogs = await Blog.findAll();
  blogs.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });

  db.disconnect();
};

main();
