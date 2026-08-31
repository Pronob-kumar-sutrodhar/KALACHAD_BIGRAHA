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

## Typography Hierarchy

| Element | Font Family | Size | Weight | Color Token |
| :--- | :--- | :--- | :--- | :--- |
| **Main Page Titles / Hero** | `Noto Serif Bengali` / `Lora`, serif | `text-4xl` to `text-6xl` | `font-bold` | `text-white` / `temple-primary` |
| **Section Headings** | `Noto Serif Bengali` / `Lora`, serif | `text-3xl` to `text-4xl` | `font-bold` | `temple-primary` |
| **Section Subtitles / Mantras** | `Hind Siliguri` / `Poppins`, sans-serif | `text-xs` to `text-sm` | `font-semibold` | `temple-accent` / `temple-gold` |
| **Card Headings** | `Noto Serif Bengali` / `Lora`, serif | `text-lg` to `text-xl` | `font-bold` | `temple-primary` |
| **Buttons & CTAs** | `Noto Serif Bengali` / `Lora`, serif | `text-xs` to `text-sm` | `font-bold` (uppercase) | `text-white` |
| **Body & Narrative** | `Hind Siliguri` / `Poppins`, sans-serif | `text-xs` to `text-base` | `font-normal` | `text-gray-600` |
| **Marquee Sanskrit Ticker** | `Noto Serif Bengali` / `Lora`, serif | `text-sm` | `font-semibold` | `text-white/80` |

---

## Visual Keyframe Animations

1. **Ken Burns Zoom (`animate-kr-zoom`)**:
   Slow scale from `scale(1)` to `scale(1.08)` over 8 seconds on hero background images.
2. **Rising Gold Particles (`kr-particles`)**:
   Floating glowing particle canvas overlay with keyframes rising from bottom to top with opacity fade.
3. **Infinite Marquee Ticker (`kr-gods-marquee`)**:
   Continuous smooth horizontal marquee loop displaying sacred Bengali Sanskrit mantras.

---

## Component Architecture

```
App.jsx
├── LanguageProvider (LanguageContext - Bengali default + BDT formatMoney)
│   ├── CartProvider (CartContext)
│   │   └── AuthProvider (AuthContext)
│   │       └── BrowserRouter
│   │           ├── Navbar (Topbar + Language Switcher + Main Navigation + Mobile Drawer)
│   │           ├── Routes:
│   │           │   ├── / -> HomePage (HeroSlider, GodsTicker, AboutSection, PujaSection, FestivalBanner, DonationSection, ShopSection, DevotionalBanner2, LiveBroadcastSection, VolunteersSection, InstagramSection, CtaBanner)
│   │           │   ├── /about -> AboutPage
│   │           │   ├── /pujas -> (PujaSection & Bookings)
│   │           │   ├── /donations -> DonationsPage
│   │           │   ├── /donations/:id -> DonationDetailPage
│   │           │   ├── /shop -> ShopPage (with BDT filters & QuickView)
│   │           │   ├── /product/:id -> ProductDetailPage
│   │           │   ├── /cart -> CartPage
│   │           │   ├── /checkout -> CheckoutPage (with BDT calculations)
│   │           │   ├── /events -> EventsPage
│   │           │   ├── /events/:id -> EventDetailPage
│   │           │   ├── /blog -> BlogPage
│   │           │   ├── /blog/:id -> BlogDetailPage
│   │           │   ├── /team -> TeamPage
│   │           │   ├── /faq -> FAQPage
│   │           │   ├── /contact -> ContactPage
│   │           │   └── /login -> LoginPage
│   │           ├── QuickDonateModal
│   │           ├── QuickViewModal
│   │           ├── BookPujaModal
│   │           ├── FloatingAudioPlayer (7 Local Devotional Tracks)
│   │           └── Footer
```
