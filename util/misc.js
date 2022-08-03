const userOwnsBlog = (user, blog) => user.blogs.map((b) => b.id).includes(blog.id);

module.exports = { userOwnsBlog };
