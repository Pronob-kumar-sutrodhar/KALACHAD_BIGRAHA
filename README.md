# 🕉 Krishna Mega Temple — Full Stack App

A modern full-stack web application for the Krishna Mega Temple, rebuilt from a static HTML/Bootstrap website using React + Vite + Tailwind CSS (frontend) and Node.js + Express + Mongoose (backend), with Stripe sandbox payment integration.

## 📁 Project Structure

```
krishna-temple-app/
├── frontend/               # React + Vite + Tailwind CSS
├── backend/                # Node.js + Express + Mongoose
├── design-frontend.md      # Frontend architecture & design
├── design-backend.md       # Backend API & database design
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe sandbox account

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/krishna_temple
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
CLIENT_URL=http://localhost:5173
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```
Backend runs at: **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

Start the dev server:
```bash
npm run dev
```
Frontend runs at: **http://localhost:5173**

---

## 🎨 Features

### Frontend Pages
| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero slider, services, donations, videos, ministries, blog |
| About | `/about` | Temple history, mission, values |
| Events | `/events` | Event listings |
| Event Detail | `/events/:id` | Single event |
| Donations | `/donations` | Donation campaigns |
| Donation Detail | `/donations/:id` | Donate with Stripe |
| Shop | `/shop` | Product catalog |
| Product Detail | `/shop/:id` | Product with cart |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Stripe payment |
| Blog | `/blog` | Blog listing |
| Blog Detail | `/blog/:id` | Article view |
| Team | `/team` | Team members |
| FAQ | `/faq` | Accordion FAQ |
| Login | `/login` | Auth (login/register) |
| Contact | `/contact` | Contact form |

### Backend API
- **Auth**: JWT login/register
- **Products**: CRUD with categories, search, pagination
- **Orders**: Create, pay, track
- **Donations**: List, detail, donation tracking
- **Events**: List, detail
- **Blogs**: List, detail
- **Payment**: Stripe PaymentIntent

---

## 💳 Stripe Test Cards

| Card | Number |
|---|---|
| Success | `4242 4242 4242 4242` |
| Authentication required | `4000 0025 0000 3155` |
| Declined | `4000 0000 0000 9995` |

Use any future expiry date and any 3-digit CVC.

---

## 🎨 Design

- **Primary Color**: Orange `#e87c2a` (temple-orange)
- **Secondary Color**: Dark Blue `#1a2f5a` (temple-blue)
- **Font**: Poppins (Google Fonts)

See detailed design docs:
- [`design-frontend.md`](./design-frontend.md) — Components, layouts, Stripe flow
- [`design-backend.md`](./design-backend.md) — API routes, MongoDB schemas, auth flow

---

## 🔑 Default Admin Account (after seeding)
- **Email**: admin@krishnatemple.com
- **Password**: admin123
