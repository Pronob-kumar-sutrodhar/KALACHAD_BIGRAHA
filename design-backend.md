# Krishna Mega Temple — Backend Design Document

## Tech Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB via Mongoose 8.0+
- **Currency Standard**: Bangladeshi Taka (`৳` / BDT) across all schemas, orders, donations, and products
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs
- **Payment Gateway**: Stripe SDK (BDT/USD support) + Simulated Direct Temple Wire & bKash / Nagad / Rocket ready
- **Cross-Origin**: CORS middleware (configured for development & production origins)
- **Error Handling**: Custom `notFound` and `errorHandler` middlewares with colors logging

---

## Environment Configuration (`.env`)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/krishna_temple
JWT_SECRET=krishnatemple_jwt_secret_key_2024
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
CLIENT_URL=http://localhost:5173
```

---

## Server Architecture & Routes

```
server.js
├── dotenv.config()
├── connectDB() — Mongoose connection to MongoDB
├── app.use(cors({ origin: CLIENT_URL, credentials: true }))
├── app.use(express.json())
├── app.use(express.urlencoded({ extended: false }))
├── Routes:
│   ├── /api/auth        → authRoutes.js (Register, Login, Profile)
│   ├── /api/products    → productRoutes.js (Catalog, Search, Filter, Reviews, Admin CRUD in BDT)
│   ├── /api/orders      → orderRoutes.js (Order Placement, My Orders, Payment status in BDT)
│   ├── /api/donations   → donationRoutes.js (Campaigns, 80G Tax Receipt Donation Processing in BDT)
│   ├── /api/events      → eventRoutes.js (Festival Calendar, RSVPs, Details)
│   ├── /api/blogs       → blogRoutes.js (Discourses, Categories, Devotee Comments)
│   ├── /api/pujas       → pujaRoutes.js (Ritual Services, Sankalp Bookings with BDT Dakshina)
│   ├── /api/payment     → paymentRoutes.js (Stripe PaymentIntent creation)
│   └── /api/contact     → contactRoutes.js (Devotee Inquiries & Special Prayer Requests)
├── notFound middleware
└── errorHandler middleware
```

---

## Data Models & Schemas

### 1. Product (`models/Product.js`)
```js
{
  name: String (required, trim),
  description: String (required),
  price: Number (required, in BDT ৳),
  originalPrice: Number (in BDT ৳),
  image: String (required, e.g., '/assets/img/products/new/1.webp'),
  images: [String],
  category: String (enum: ['Idols & Murtis', 'Vedic Books', 'Dhoop & Incense', 'Puja Samagri', 'Japa Malas', 'Devotional Attire', 'Sacred Prasad']),
  countInStock: Number (default: 0),
  rating: Number (default: 5),
  numReviews: Number (default: 0),
  isFeatured: Boolean (default: false),
  reviews: [{
    user: ObjectId (ref: 'User'),
    name: String,
    rating: Number,
    comment: String,
    date: String
  }]
}
```

### 2. Donation (`models/Donation.js`)
```js
{
  title: String (required),
  description: String (required),
  image: String (required),
  category: String (enum: ['Annadaan Seva', 'Vedic Education', 'Mandir & Gaushala', 'Scripture Seva', 'Sevak Welfare', 'Pilgrim Seva']),
  goal: Number (required, in BDT ৳),
  raised: Number (default: 0, in BDT ৳),
  donorsCount: Number (default: 0),
  isFeatured: Boolean (default: false),
  donors: [{
    name: String,
    email: String,
    amount: Number (in BDT ৳),
    gotra: String,
    isAnonymous: Boolean,
    receiptId: String,
    date: Date
  }]
}
```

### 3. Event (`models/Event.js`)
```js
{
  title: String (required),
  description: String (required),
  image: String (required),
  date: Date (required),
  time: String (required),
  location: String (required),
  category: String (enum: ['Grand Festival', 'Devotional Festival', 'Annakut Puja', 'Deepotsav', 'Gita Seminar', 'Maha Shivratri']),
  organizer: String,
  priest: String,
  rsvpCount: Number (default: 0),
  isFeatured: Boolean (default: false),
  rsvps: [{
    name: String,
    email: String,
    phone: String,
    attendees: Number,
    date: Date
  }]
}
```

### 4. Blog (`models/Blog.js`)
```js
{
  title: String (required),
  excerpt: String,
  content: String (required),
  image: String (required),
  author: String (default: 'Temple Acharya'),
  authorBio: String,
  authorAvatar: String,
  category: String (enum: ['Vedic Philosophy', 'Festivals', 'Sadhana', 'Seva & Charity', 'Rituals']),
  tags: [String],
  views: Number (default: 0),
  comments: [{
    name: String,
    email: String,
    text: String,
    date: Date
  }]
}
```

### 5. Puja (`models/Puja.js`) & PujaBooking (`models/PujaBooking.js`)
```js
// Puja
{
  title: String (required),
  description: String,
  price: String (e.g. '৳ ৫০১ দক্ষিণা', in BDT),
  image: String,
  category: String,
  schedule: String,
  benefits: [String],
  isFeatured: Boolean
}

// PujaBooking
{
  pujaTitle: String,
  devoteeName: String (required),
  email: String (required),
  phone: String (required),
  gotra: String,
  nakshatra: String,
  preferredDate: Date (required),
  preferredTime: String,
  specialPrayer: String,
  dakshinaAmount: Number (in BDT ৳),
  bookingReference: String (e.g. 'PUJA-XXXXX'),
  status: String (enum: ['Confirmed', 'Completed', 'Cancelled'])
}
```

### 6. Order (`models/Order.js`)
```js
{
  user: ObjectId (ref: 'User'),
  orderItems: [{
    name: String,
    qty: Number,
    image: String,
    price: Number (in BDT ৳),
    product: ObjectId (ref: 'Product')
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String
  },
  paymentMethod: String (e.g. 'Credit / Debit Card', 'Direct Temple Wire', 'Cash on Sanctified Delivery'),
  paymentResult: { id: String, status: String, update_time: String, email_address: String },
  itemsPrice: Number (in BDT ৳),
  taxPrice: Number (in BDT ৳),
  shippingPrice: Number (in BDT ৳, free over ৳ 1000, ৳ 80 otherwise),
  totalPrice: Number (in BDT ৳),
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date
}
```

### 7. Contact (`models/Contact.js`)
```js
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  status: String (enum: ['Unread', 'Read', 'Replied'])
}
```

---

## Seed Database Verification
All assets reference local static files (`/assets/img/...`) bundled with the frontend with zero external dependencies. Prices, goals, dakshinas, and donations are calibrated in Bangladeshi Taka (`৳` / BDT).
- Test command: `node backend/seed/seeder.js`
