const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

// @desc  Get all blogs (with search, category, tag filter, and limit)
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 50;

  const keyword = req.query.keyword || req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
          { excerpt: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
          { content: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const category = req.query.category && req.query.category !== 'All'
    ? { category: req.query.category }
    : {};

  const tag = req.query.tag
    ? { tags: { $in: [req.query.tag] } }
    : {};

  const filter = { ...keyword, ...category, ...tag };

  const blogs = await Blog.find(filter).sort({ createdAt: -1 }).limit(limit);

  if (req.query.format === 'raw') {
    res.json(blogs);
  } else {
    res.json({
      blogs,
      count: blogs.length,
    });
  }
});

// @desc  Get blog by ID
// @route GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Discourse / Blog post not found');
  }
});

// @desc  Add comment to a blog
// @route POST /api/blogs/:id/comments
// @access Public
const addBlogComment = asyncHandler(async (req, res) => {
  const { name, email, text, comment } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Discourse not found');
  }

  const commentObj = {
    name: name || 'Devotee',
    email,
    text: text || comment || '',
    date: new Date(),
  };

  blog.comments.push(commentObj);
  await blog.save();

  res.status(201).json({
    message: 'Thank you! Your reflection has been posted.',
    comment: commentObj,
  });
});

// @desc  Create a blog post
// @route POST /api/blogs
// @access Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, image, author, authorBio, authorAvatar, category, tags } = req.body;
  const blog = new Blog({
    title,
    content,
    excerpt,
    image,
    author: author || 'Acharya Rakesh Pandey',
    authorBio: authorBio || 'Vedic Scholar & Priest at Krishna Mega Temple',
    authorAvatar: authorAvatar || '/assets/img/people/1.webp',
    category: category || 'Vedic Philosophy',
    tags: tags || [],
  });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc  Update a blog post
// @route PUT /api/blogs/:id
// @access Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, image, author, authorBio, authorAvatar, category, tags } = req.body;

  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.image = image || blog.image;
    blog.author = author || blog.author;
    blog.authorBio = authorBio || blog.authorBio;
    blog.authorAvatar = authorAvatar || blog.authorAvatar;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Discourse not found');
  }
});

// @desc  Delete a blog post
// @route DELETE /api/blogs/:id
// @access Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.deleteOne();
    res.json({ message: 'Discourse removed' });
  } else {
    res.status(404);
    throw new Error('Discourse not found');
  }
});

module.exports = {
  getBlogs,
  getBlogById,
  addBlogComment,
  createBlog,
  updateBlog,
  deleteBlog,
};
