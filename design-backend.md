# Krishna Mega Temple — Backend Design Document

## Tech Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB via Mongoose 8.0+
- **Currency Standard**: Bangladeshi Taka (`৳` / BDT) across all schemas, orders, donations, and products
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs
- **Payment Gateway**: Stripe SDK (Official Hosted Stripe Checkout Session + PaymentIntents with BDT currency support)
- **Cross-Origin**: CORS middleware (configured for development & production origins)
- **Error Handling**: Custom `notFound` and `errorHandler` middlewares with colors logging

---

## Environment Configuration (`.env`)

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.1cheo9e.mongodb.net/krishna_temple?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### Production Deployment Variables
- `CLIENT_URL`: `https://your-temple-site.netlify.app`
- `NODE_ENV`: `production`
- `PORT`: `5000` (or injected by hosting platform)
- `MONGO_URI`: MongoDB Atlas connection string
- `STRIPE_SECRET_KEY`: Live / Test Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Live / Test Stripe publishable key
- `JWT_SECRET`: Production secret string


---

## Server Architecture & Complete Admin Routes

```
server.js
├── dotenv.config()
├── connectDB() — Mongoose connection to MongoDB Atlas
├── app.use(cors({ origin: CLIENT_URL, credentials: true }))
├── app.use(express.json())
├── app.use(express.urlencoded({ extended: false }))
├── Routes:
│   ├── /api/auth        → authRoutes.js (Register, Login, Profile)
│   ├── /api/products    → productRoutes.js (Catalog, Search, Filter, Reviews, Admin CRUD in BDT)
│   ├── /api/orders      → orderRoutes.js (Order Placement, My Orders, Mark Paid, Mark Delivered, Admin CRUD)
│   ├── /api/donations   → donationRoutes.js (Campaigns, 80G Tax Receipt Donation Processing in BDT, Admin CRUD)
│   ├── /api/events      → eventRoutes.js (Festival Calendar, RSVPs, Details, Admin CRUD)
│   ├── /api/blogs       → blogRoutes.js (Discourses, Categories, Devotee Comments, Admin CRUD)
│   ├── /api/pujas       → pujaRoutes.js (Ritual Services, Sankalp Bookings with BDT Dakshina, Admin CRUD)
│   ├── /api/payment     → paymentRoutes.js (Stripe Checkout Session & Verification)
│   │   ├── POST /api/payment/create-checkout-session  (Creates real Stripe redirect URL)
│   │   ├── GET  /api/payment/verify-session/:sessionId (Retrieves session payment status)
│   │   ├── POST /api/payment/create-payment-intent     (In-page card intent)
│   │   └── GET  /api/payment/config                    (Publishable key)
│   ├── /api/contact     → contactRoutes.js (Devotee Inquiries & Special Prayer Requests, Admin Deletion)
│   └── /api/settings    → settingRoutes.js (Site-wide CMS Configuration & Admin KPI Analytics Stats)
│       ├── GET  /api/settings              (Public Site Settings)
│       ├── PUT  /api/settings              (Admin Site Settings Update)
│       └── GET  /api/settings/admin-stats  (Admin Analytics KPIs: Total Revenue, Donations, Bookings, RSVPs)
├── Serverless Function Wrapper: backend/functions/api.js (serverless-http)
├── notFound middleware
└── errorHandler middleware
```

---

## Data Models & Schemas

### 1. Setting (`models/Setting.js`)
```js
{
  templeNameBn: String,
  templeNameEn: String,
  phone: String,
  email: String,
  addressBn: String,
  addressEn: String,
  openingHoursBn: String,
  openingHoursEn: String,
  liveStreamUrl: String,
  marqueeNoticeBn: String,
  marqueeNoticeEn: String,
  heroSlide1TitleBn: String,
  heroSlide1TitleEn: String,
  heroSlide1SubtitleBn: String,
  heroSlide1SubtitleEn: String
}
```

### 2. Product (`models/Product.js`)
```js
{
  name: String (required, trim),
  description: String (required),
  price: Number (required, default: 0),
  originalPrice: Number (default: 0),
  image: String (required),
  images: [String],
  category: String (required),
  countInStock: Number (required, default: 0),
  rating: Number (required, default: 5),
  numReviews: Number (required, default: 0),
  reviews: [reviewSchema]
}
```

### 3. Order (`models/Order.js`)
```js
{
  user: ObjectId (ref: 'User'),
  orderItems: [{ name, qty, image, price, product }],
  shippingAddress: { fullName, address, city, phone, email },
  paymentMethod: String (e.g., 'Stripe Online', 'Cash On Delivery'),
  paymentResult: { id, status, update_time, emailAddress },
  totalPrice: Number,
  isPaid: Boolean (default: false),
  paidAt: Date,
  isDelivered: Boolean (default: false),
  deliveredAt: Date
}
```

### 4. Donation (`models/Donation.js`)
```js
{
  title: String (required),
  description: String (required),
  image: String (required),
  raised: Number (default: 0),
  goal: Number (required),
  category: String,
  donorsCount: Number (default: 0),
  donors: [{ name, email, gotra, amount, receiptId, date }]
}
```

### 5. PujaBooking (`models/PujaBooking.js`)
```js
{
  user: ObjectId (ref: 'User'),
  pujaTitle: String,
  dakshina: String,
  devoteeName: String,
  phone: String,
  email: String,
  gotra: String,
  nakshatra: String,
  date: String,
  timeSlot: String,
  mode: String,
  prasadDelivery: Boolean,
  bookingRef: String,
  status: String (enum: ['Confirmed', 'Completed', 'Cancelled'])
}
```
