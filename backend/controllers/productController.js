const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc  Fetch all products (with search, category, price filter & sort)
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 50;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword || req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
          { description: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const category = req.query.category && req.query.category !== 'All'
    ? { category: req.query.category }
    : {};

  const priceFilter = {};
  if (req.query.minPrice) priceFilter.$gte = Number(req.query.minPrice);
  if (req.query.maxPrice) priceFilter.$lte = Number(req.query.maxPrice);
  const price = Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {};

  // Sort
  let sortOption = { createdAt: -1 };
  if (req.query.sort === 'price_asc') sortOption = { price: 1 };
  if (req.query.sort === 'price_desc') sortOption = { price: -1 };
  if (req.query.sort === 'rating') sortOption = { rating: -1 };

  const filter = { ...keyword, ...category, ...price };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortOption)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // If query specifies page/limit or if client expects plain array vs object:
  // We attach custom headers or structured response:
  if (req.query.format === 'raw') {
    res.json(products);
  } else {
    // Both properties available
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  }
});

// @desc  Fetch top rated/featured products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

// @desc  Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc  Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, originalPrice, image, images, category, countInStock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    originalPrice: originalPrice || 0,
    image,
    images: images || [image],
    category: category || 'Puja Samagri',
    countInStock: countInStock || 15,
    inStock: (countInStock || 15) > 0,
    numReviews: 0,
    rating: 5,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc  Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, originalPrice, image, images, category, countInStock, inStock } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
    product.image = image || product.image;
    if (images) product.images = images;
    product.category = category || product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.inStock = inStock !== undefined ? inStock : product.countInStock > 0;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc  Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc  Create new review
// @route POST /api/products/:id/reviews
// @access Public / Devotee
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, name } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const reviewerName = req.user ? req.user.name : name || 'Devotee';
    const review = {
      name: reviewerName,
      rating: Number(rating) || 5,
      comment,
      user: req.user ? req.user._id : undefined,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getTopProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
