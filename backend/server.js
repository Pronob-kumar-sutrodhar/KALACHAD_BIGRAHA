const dotenv = require('dotenv');
// Load environment variables immediately before any routes or controllers are imported
dotenv.config();

const express = require('express');
const cors = require('cors');
require('colors');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const donationRoutes = require('./routes/donationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const blogRoutes = require('./routes/blogRoutes');
const pujaRoutes = require('./routes/pujaRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const settingRoutes = require('./routes/settingRoutes');

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// CORS — allow requests from the React frontend or same-origin Netlify
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB on every request if disconnected
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ─── API Routes (Supporting both /api/... and serverless /.netlify/functions/api/...) ─
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/donations', donationRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/blogs', blogRoutes);
apiRouter.use('/pujas', pujaRoutes);
apiRouter.use('/payment', paymentRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/settings', settingRoutes);

// Health check endpoints for Render, monitoring & load balancers
apiRouter.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

apiRouter.get('/', (req, res) => {
  res.json({
    message: 'Sri Sri Krishna Mega Temple API is running...',
    status: 'online',
    timestamp: new Date(),
  });
});

// Mount on standard /api as well as serverless root
app.use('/api', apiRouter);
app.use('/.netlify/functions/api', apiRouter);

// Root Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Sri Sri Krishna Mega Temple API is running...',
    status: 'online',
    timestamp: new Date(),
  });
});

// ─── Error Handling ───────────────────────────────────────────────────────────

app.use(notFound);
app.use(errorHandler);

// ─── Render Keep-Alive / Anti-Sleep Self-Ping ─────────────────────────────────
const keepAlive = () => {
  const backendUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
  if (!backendUrl) return;

  const INTERVAL = 14 * 60 * 1000; // 14 minutes (Render free tier spins down at 15 mins)
  setInterval(() => {
    const protocol = backendUrl.startsWith('https') ? require('https') : require('http');
    protocol
      .get(`${backendUrl}/health`, (res) => {
        console.log(`[Keep-Alive] Pinged ${backendUrl}/health — Status: ${res.statusCode}`.cyan);
      })
      .on('error', (err) => {
        console.warn(`[Keep-Alive] Ping warning: ${err.message}`.yellow);
      });
  }, INTERVAL);
  console.log(`[Keep-Alive] Anti-sleep self-ping activated for ${backendUrl} (every 14m)`.green);
};

// ─── Start Local Server if run directly ───────────────────────────────────────

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold
    );
    keepAlive();
  });
}

module.exports = app;
