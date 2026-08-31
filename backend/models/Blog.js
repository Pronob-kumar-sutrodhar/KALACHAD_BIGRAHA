const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Blog title is required'], trim: true },
    content: { type: String, required: [true, 'Blog content is required'] },
    excerpt: { type: String, required: [true, 'Blog excerpt is required'] },
    image: { type: String, required: [true, 'Blog image is required'] },
    author: { type: String, required: [true, 'Blog author is required'], default: 'Acharya Rakesh Pandey' },
    authorBio: { type: String, default: 'Vedic Scholar & Acharya at Krishna Mega Temple' },
    authorAvatar: { type: String, default: '/assets/img/people/1.webp' },
    category: { type: String, required: [true, 'Blog category is required'], default: 'Vedic Philosophy' },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
