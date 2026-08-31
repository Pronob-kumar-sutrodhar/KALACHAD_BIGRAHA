# Krishna Mega Temple — Frontend Design Document

## Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS 3.4 with custom Krishna temple colors & keyframe animations
- **Routing**: React Router v7 / v6
- **HTTP**: Axios (configured with environment baseURL & JWT interceptor)
- **Payment**: @stripe/react-stripe-js + @stripe/stripe-js + Card simulation (BDT currency standard)
- **Icons**: react-icons (Font Awesome 6)
- **Toast Notifications**: react-hot-toast (customized with temple gold & teal theme)
- **Typography / Fonts**: 
  - Bengali: `Noto Serif Bengali` (Serif) + `Hind Siliguri` (Sans-serif)
  - English: `Lora` (Serif) + `Poppins` (Sans-serif)
- **Audio**: Custom Floating Ambient Bhajan & Flute Meditation Player (Local 7-track MP3 audio suite in `/assets/audio/`)
- **Localization**: `LanguageContext` supporting default Bengali (`bn`) with an instant toggle button to English (`en`), universal BDT (`৳`) currency formatting, and category translation mappings.

---

## Complete Admin Management Portal & CMS (`/admin`)

The frontend includes a full-featured, responsive, production-ready Admin CMS enabling temple management to edit, create, and delete everything on the frontend in real time:

| Route | Page Component | Features & Management Powers |
| :--- | :--- | :--- |
| `/admin` | `AdminDashboardPage.jsx` | KPI metric cards (Donations in BDT, Store revenue in BDT, Active Puja Bookings, RSVPs), quick actions, recent orders, recent donations, and recent inquiry tables. |
| `/admin/products` | `AdminProductsPage.jsx` | Full CRUD catalog management (Add, Edit, Delete, Stock count & status, Price in BDT, Image URLs, description). |
| `/admin/donations` | `AdminDonationsPage.jsx` | Full CRUD seva campaigns (Title, Category, Target Goal in BDT, Raised in BDT, Progress bar, Image) + **Donor Inspection Modal** with 80G tax receipt IDs. |
| `/admin/pujas` | `AdminPujasPage.jsx` | **Tab 1**: Puja Offerings CRUD (Title, Category, Dakshina in BDT, Schedule, Description); **Tab 2**: Devotee Puja Bookings with status update toggle (`Confirmed` / `Completed` / `Cancelled`) and deletion. |
| `/admin/events` | `AdminEventsPage.jsx` | **Tab 1**: Festival Calendar CRUD (Title, Category, Date, Time, Location, Priest, Image, Description); **Tab 2**: Devotee RSVPs & Headcount list. |
| `/admin/blogs` | `AdminBlogsPage.jsx` | Full CRUD spiritual articles (Title, Author, Category, Tags, Content Markdown, Image) + Comments moderation. |
| `/admin/orders` | `AdminOrdersPage.jsx` | Live store orders table, customer shipping addresses, product items breakdown, BDT total, "Mark as Paid", "Mark as Delivered", and deletion. |
| `/admin/inquiries` | `AdminInquiriesPage.jsx` | Devotee contact messages, spiritual guidance questions, prayer requests, and newsletter subscriber list. |
| `/admin/settings` | `AdminSettingsPage.jsx` | Site-wide CMS settings (Temple Helpline Phone, Email, Physical Address, Opening Hours, Live Darshan YouTube Embed Stream, Sanskrit Marquee ticker text, Hero Banner Title & Subtitle). |

---

## Local Devotional Audio Suite (`/public/assets/audio/`)

| File Name | Bengali Track Title | English Track Title | Artist / Tradition | Size |
| :--- | :--- | :--- | :--- | :--- |
| `hare_krishna_kirtan.mp3` | হরে কৃষ্ণ মহামন্ত্র নামসংকীর্তন | Hare Krishna Mahamantra Kirtan | মন্দির কীর্তন মণ্ডল | **4.6 MB** |
| `krishna_flute_meditation.mp3` | শ্রী শ্রী রাধাকৃষ্ণ মধুর বাঁশির সুর ও ধ্যান | Krishna Flute Meditation (Bansuri Dhun) | দিব্য বাঁশরী সেবা | **5.4 MB** |
| `achyutam_keshavam.mp3` | অচ্যুতম কেশবম কৃষ্ণ দামোদরম ভজন | Achyutam Keshavam Krishna Bhajan | শ্রী বৃন্দাবন সেবা ট্রাস্ট | **5.4 MB** |
| `radhe_govinda_bhajan.mp3` | রাধে রাধে গোবিন্দ রাধে বৈষ্ণব ভজন | Radhe Radhe Govinda Radhe Bhajan | বৈষ্ণব সেবা সঙ্ঘ | **1.5 MB** |
| `govind_bolo_hari_gopal.mp3` | গোবিন্দ বলো হরি গোপাল বলো ভক্তিগীতি | Govind Bolo Hari Gopal Bolo | শ্রী ভক্তিসঙ্গীত মণ্ডল | **7.7 MB** |
| `om_namo_bhagavate.mp3` | ওঁ নমো ভগবতে বাসুদেবায় স্তোত্র | Om Namo Bhagavate Vasudevaya | বৈদিক স্তোত্র পরিষদ | **3.4 MB** |
| `radha_krishna_aarti.mp3` | শ্রী শ্রী রাধাকৃষ্ণ নিত্য মঙ্গল আরতি স্তুতি | Radha Krishna Mangala Aarti | মন্দির প্রধান পূজারী পরিষদ | **4.6 MB** |

---

## Sacred Color System

| Token | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `temple-primary` | `#253d46` | Deep Slate Teal — Navbars, hero overlays, primary headings, footer base |
| `temple-accent` | `#ae4427` | Sacred Terracotta Rust — Primary CTA buttons, active tabs, badges, highlights |
| `temple-gold` | `#d4af37` | Divine Gold — Om icons, borders, subtitle text accents, glow effects |
| `temple-light` | `#f8f5f0` | Soft Linen Sand — Section background cards, alternating panels |
| `temple-dark` | `#1c2f36` | Deep Sanctum Dark — Video backgrounds, priest overlays, audio player |
| White | `#ffffff` | Content cards, modal backdrops, typography contrast |

---

## Language & Currency Standards (Bengali Default & BDT)

- **Default Language**: Bengali (`bn`).
- **Language Switcher**: Dedicated interactive toggle (`বাংলা | EN`) accessible in desktop topbar, sticky navbar, and mobile navigation drawer.
- **Currency Standard**: Bangladeshi Taka (`৳` / BDT) across all:
  - Product Catalog, Cart, Checkout, and Discounts
  - Donation Seva Funds, Custom amounts, and Preset Chips (`৳ 500`, `৳ 1,000`, `৳ 2,500`, `৳ 5,000`, `৳ 10,000`, `৳ 25,000`)
  - Puja Offerings & Priest Dakshinas (`৳ ৫০১`, `৳ ২৫০১`, `৳ ৩১০০`, `৳ ৫০০১`)
  - Shipping Rules: Free delivery over `৳ 1,000` (delivery fee `৳ 80` otherwise).

---

## Component Architecture

```
App.jsx
├── LanguageProvider (LanguageContext - Bengali default + BDT formatMoney)
│   ├── CartProvider (CartContext)
│   │   └── AuthProvider (AuthContext)
│   │       └── BrowserRouter
│   │           ├── Navbar (Topbar + Language Switcher + Admin Button + Main Navigation + Mobile Drawer)
│   │           ├── Public Routes:
│   │           │   ├── / -> HomePage
│   │           │   ├── /about -> AboutPage
│   │           │   ├── /pujas -> (PujaSection & Bookings)
│   │           │   ├── /donations -> DonationsPage
│   │           │   ├── /donations/:id -> DonationDetailPage
│   │           │   ├── /shop -> ShopPage
│   │           │   ├── /product/:id -> ProductDetailPage
│   │           │   ├── /cart -> CartPage
│   │           │   ├── /checkout -> CheckoutPage
│   │           │   ├── /events -> EventsPage
│   │           │   ├── /events/:id -> EventDetailPage
│   │           │   ├── /blog -> BlogPage
│   │           │   ├── /blog/:id -> BlogDetailPage
│   │           │   ├── /team -> TeamPage
│   │           │   ├── /faq -> FAQPage
│   │           │   ├── /contact -> ContactPage
│   │           │   └── /login -> LoginPage
│   │           ├── Admin Routes (/admin):
│   │           │   ├── /admin -> AdminDashboardPage
│   │           │   ├── /admin/products -> AdminProductsPage
│   │           │   ├── /admin/donations -> AdminDonationsPage
│   │           │   ├── /admin/pujas -> AdminPujasPage
│   │           │   ├── /admin/events -> AdminEventsPage
│   │           │   ├── /admin/blogs -> AdminBlogsPage
│   │           │   ├── /admin/orders -> AdminOrdersPage
│   │           │   ├── /admin/inquiries -> AdminInquiriesPage
│   │           │   └── /admin/settings -> AdminSettingsPage
│   │           ├── QuickDonateModal
│   │           ├── QuickViewModal
│   │           ├── BookPujaModal
│   │           ├── FloatingAudioPlayer (7 Local Devotional Tracks)
│   │           └── Footer
```

---

## Netlify Production Deployment Configuration

- **Build Command**: `npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend`
- **Publish Directory**: `frontend/dist`
- **Functions Directory**: `backend/functions`
- **SPA Client-Side Routing**: Configured in `frontend/public/_redirects` (`/*  /index.html  200`) and `netlify.toml`
- **Fullstack Routing**: `/api/*` proxies to `/.netlify/functions/api/:splat`

