const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    description: { type: String, required: [true, 'Product description is required'] },
    price: { type: Number, required: [true, 'Product price is required'], default: 0 },
    originalPrice: { type: Number, default: 0 },
    image: { type: String, required: [true, 'Product image is required'] },
    images: [{ type: String }],
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'Idols & Murtis',
        'Vedic Books',
        'Dhoop & Incense',
        'Puja Samagri',
        'Japa Malas',
        'Devotional Attire',
        'Sacred Prasad',
        'Other'
      ],
      default: 'Puja Samagri'
    },
    countInStock: { type: Number, required: true, default: 10 },
    inStock: { type: Boolean, default: true },
    numReviews: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
