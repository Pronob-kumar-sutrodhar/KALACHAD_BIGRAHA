import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const TRANSLATIONS = {
  bn: {
    // Topbar & Branding
    site_title: 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির',
    site_tagline: 'শ্রী শ্রী কালাচাঁদ বিগ্রহ সেবাশ্রম ও নিত্য দর্শন',
    call_us: 'মন্দির হেল্পলাইন',
    live_darshan: 'অনলাইন দর্শন',
    sermons: 'ধর্মকথা',
    events: 'উৎসবসমূহ',
    ministries: 'সেবা কার্যক্রম',
    devotee_portal: 'ভক্ত পোর্টাল',
    donate_seva: 'সেবা দান করুন',
    search_placeholder: 'পূজা, ধর্মগ্রন্থ, বিগ্রহ বা উৎসব খুঁজুন...',

    // Navbar
    nav_home: 'হোম',
    nav_about: 'পরিচিতি',
    nav_events: 'উৎসব ও অনুষ্ঠান',
    nav_events_upcoming: 'আসন্ন মহোৎসব',
    nav_events_schedule: 'উৎসব সময়সূচী',
    nav_donation: 'সেবা দান',
    nav_donation_all: 'সকল সেবা তহবিল',
    nav_donation_annadaan: 'অন্নদান ও বিদ্যামন্দির',
    nav_shop: 'মন্দির স্টোর',
    nav_shop_store: 'পূজা ও বিগ্রহ ভাণ্ডার',
    nav_shop_cart: 'শপিং ঝুড়ি',
    nav_shop_checkout: 'চেকআউট',
    nav_blog: 'ধর্মকথা ও ব্লগ',
    nav_blog_articles: 'শ্রীমদ্ভগবদ্গীতা ও প্রবচন',
    nav_pages: 'পৃষ্ঠাসমূহ',
    nav_team: 'পূজারী ও আচার্যবৃন্দ',
    nav_faq: 'ভক্তদের জিজ্ঞাসা (FAQ)',
    nav_login: 'ভক্ত একাউন্ট / লগইন',
    nav_contact: 'যোগাযোগ',

    // Hero Slider
    hero_slide1_badge: 'পরম করুণাময় শ্রী শ্রী কালাচাঁদ বিগ্রহ',
    hero_slide1_title: 'কালাচাঁদ ভক্তি ও শান্তির পবিত্র ধাম',
    hero_slide1_desc: 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দিরে আপনাকে স্বাগতম। নিত্য হরিনাম সংকীর্তন, মঙ্গল আরতি এবং অন্নদান সেবায় যুক্ত হয়ে পারমার্থিক শান্তি লাভ করুন।',
    hero_slide1_btn1: 'পূজা সংকল্প বুক করুন',
    hero_slide1_btn2: 'অন্নদান সেবা দিন',

    hero_slide2_badge: 'নিত্য মঙ্গল আরতি ও বেদ পাঠ',
    hero_slide2_title: 'অন্তরের শান্তি ও ভগবৎ প্রেম লাভ',
    hero_slide2_desc: 'প্রতিদিন ভোর ৪:১৫ মিনিট থেকে রাত্রি ৯:০০ ঘটিকা পর্যন্ত ভক্তদের দর্শনের জন্য মন্দির উন্মুক্ত। আসুন এবং শ্রী শ্রী কালাচাঁদ বিগ্রহের শ্রীপাদপদ্মে নিজেকে সমর্পণ করুন।',
    hero_slide2_btn1: 'আসন্ন উৎসবসমূহ',
    hero_slide2_btn2: 'মন্দির ভাণ্ডার দেখুন',

    // Marquee Mantras
    mantra_ticker: 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে • হরে রাম হরে রাম রাম রাম হরে হরে • ওঁ নমো ভগবতে বাসুদেবায় • জয় শ্রী কালাচাঁদ বিগ্রহ জী কি জয় • গোবিন্দ জয় জয় গোপাল জয় জয় • শ্রীমদ্ভগবদ্গীতা মাহাত্ম্য',

    // Features
    about_badge: 'মন্দিরের ঐতিহ্য ও সেবা',
    about_title: 'ভক্তি, শান্তি ও সর্বজনীন কল্যাণের পবিত্র তীর্থ',
    about_p1: '১৯৯৯ সালে প্রতিষ্ঠিত শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির সনাতন ধর্মের শাশ্বত বাণী প্রচার এবং মানবসেবায় নিবেদিত। প্রতিদিন শত শত ভক্ত এখানে এসে শ্রী শ্রী কালাচাঁদ বিগ্রহের দিব্য দর্শন লাভ করেন।',
    about_btn: 'মন্দির সম্পর্কে জানুন',

    // Festival Banner
    fest_badge: 'আসন্ন মহোৎসব',
    fest_title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমী ও রাস মহোৎসব',
    fest_desc: 'ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথিতে ১০৮ কলশ অভিষেক, মধ্যরাত আরতি ও ৫৬ ভোগ মহাপ্রসাদ বিতরণ মহোৎসবে আপনারা সপরিবারে আমন্ত্রিত।',
    fest_btn: 'উৎসব সংকল্পে অংশ নিন',

    // Common Buttons & Labels
    btn_donate_now: 'দান করুন',
    btn_book_puja: 'পূজা বুক করুন',
    btn_add_to_cart: 'ঝুড়িতে যুক্ত করুন',
    btn_view_details: 'বিস্তারিত দেখুন',
    btn_checkout: 'অর্ডার সম্পন্ন করুন',
    btn_continue_shopping: 'কেনাকাটা চালিয়ে যান',
    btn_read_more: 'আরও পড়ুন',
    in_stock: 'মজুদ আছে',
    out_of_stock: 'মজুদ শেষ',
    currency_symbol: '৳',
    currency_code: 'BDT',
    free_shipping: 'বিনামূল্যে হোম ডেলিভারি',

    // Cart & Checkout
    cart_title: 'আপনার শপিং ঝুড়ি',
    cart_empty: 'আপনার ঝুড়িতে কোনো পণ্য নেই',
    cart_subtotal: 'মোট মূল্য',
    cart_shipping: 'পবিত্র ডেলিভারি',
    cart_total: 'সর্বমোট প্রদেয়',
    cart_apply_coupon: 'কুপন প্রয়োগ করুন',

    // Contact
    contact_title: 'মন্দির কর্তৃপক্ষের সাথে যোগাযোগ',
    contact_subtitle: 'যেকোনো জিজ্ঞাসা, পূজা বুকিং বা সেবার জন্য আমাদের লিখুন',
    contact_name: 'আপনার পূর্ণ নাম',
    contact_email: 'ইমেইল ঠিকানা',
    contact_phone: 'মোবাইল নম্বর / হোয়াটসঅ্যাপ',
    contact_msg: 'আপনার বার্তা বা বিশেষ প্রার্থনা',
    contact_submit: 'বার্তা প্রেরণ করুন',

    // Audio
    audio_player_title: 'শ্রীকৃষ্ণ নাম সংকীর্তন ও বাঁশির সুর',
    audio_live: 'লাইভ সম্প্রচার',
  },

  en: {
    // Topbar & Branding
    site_title: 'Sri Sri Kalachand Bigraha Union Central Temple',
    site_tagline: 'Divine Love & Eternal Devotion',
    call_us: 'Mandir Hotline',
    live_darshan: 'Online Darshan',
    sermons: 'Sermons',
    events: 'Events',
    ministries: 'Ministries',
    devotee_portal: 'Devotee Portal',
    donate_seva: 'Donate Seva',
    search_placeholder: 'Search pujas, books, murtis, or events...',

    // Navbar
    nav_home: 'Home',
    nav_about: 'About',
    nav_events: 'Events',
    nav_events_upcoming: 'Upcoming Festivals',
    nav_events_schedule: 'Festival Schedule',
    nav_donation: 'Donations',
    nav_donation_all: 'All Seva Causes',
    nav_donation_annadaan: 'Annadaan & Vidyalaya',
    nav_shop: 'Temple Store',
    nav_shop_store: 'Temple Store',
    nav_shop_cart: 'Shopping Basket',
    nav_shop_checkout: 'Checkout',
    nav_blog: 'Katha & Blog',
    nav_blog_articles: 'Gita Katha & Sermons',
    nav_pages: 'Pages',
    nav_team: 'Priests & Team',
    nav_faq: 'Devotee FAQ',
    nav_login: 'Devotee Portal / Login',
    nav_contact: 'Contact Us',

    // Hero Slider
    hero_slide1_badge: 'Supreme Lord Sri Sri Kalachand Bigraha',
    hero_slide1_title: 'Sacred Sanctuary of Kalachand Bhakti & Peace',
    hero_slide1_desc: 'Welcome to Sri Sri Kalachand Bigraha Union Central Temple. Immerse yourself in daily Harinam Sankirtan, Mangala Aarti, and Annadaan Mahaprasad Seva for transcendental peace.',
    hero_slide1_btn1: 'Book Puja Sankalp',
    hero_slide1_btn2: 'Donate Annadaan Seva',

    hero_slide2_badge: 'Daily Mangala Aarti & Vedic Katha',
    hero_slide2_title: 'Awaken Inner Serenity & Divine Love',
    hero_slide2_desc: 'The temple sanctum opens daily from 04:15 AM to 09:00 PM for all devotees. Surrender unto the lotus feet of Sri Sri Kalachand Bigraha and discover true bliss.',
    hero_slide2_btn1: 'Explore Festivals',
    hero_slide2_btn2: 'Visit Temple Store',

    // Marquee Mantras
    mantra_ticker: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare • Hare Rama Hare Rama Rama Rama Hare Hare • Om Namo Bhagavate Vasudevaya • Jai Sri Kalachand Bigraha Ji Ki Jai • Govinda Jaya Jaya Gopala Jaya Jaya',

    // Features
    about_badge: 'Heritage & Divine Vision',
    about_title: 'A Spiritual Sanctuary for Peace, Wisdom & Devotion',
    about_p1: 'Established in 1999 under the divine inspiration of Vedic Acharyas, the Sri Sri Kalachand Bigraha Union Central Temple serves as an international beacon of Sanatan Dharma and selfless Annadaan service.',
    about_btn: 'Learn About Mandir',

    // Festival Banner
    fest_badge: 'Grand Upcoming Festival',
    fest_title: 'Sri Krishna Janmashtami & Raas Mahotsav',
    fest_desc: 'Celebrate the divine advent of Lord Sri Krishna with 108 Kalash Abhishekam, midnight Maha Aarti, and 56 Bhog Mahaprasad distribution.',
    fest_btn: 'Join Festival Sankalp',

    // Common Buttons & Labels
    btn_donate_now: 'Donate Now',
    btn_book_puja: 'Book Puja',
    btn_add_to_cart: 'Add to Basket',
    btn_view_details: 'View Details',
    btn_checkout: 'Complete Order',
    btn_continue_shopping: 'Continue Shopping',
    btn_read_more: 'Read Discourse',
    in_stock: 'In Stock',
    out_of_stock: 'Out of Stock',
    currency_symbol: '৳',
    currency_code: 'BDT',
    free_shipping: 'Free Express Delivery',

    // Cart & Checkout
    cart_title: 'Your Shopping Basket',
    cart_empty: 'Your devotional basket is empty',
    cart_subtotal: 'Items Subtotal',
    cart_shipping: 'Sanctified Delivery',
    cart_total: 'Total Amount',
    cart_apply_coupon: 'Apply Coupon',

    // Contact
    contact_title: 'Contact Mandir Administration',
    contact_subtitle: 'We are here to assist with puja bookings, lodging, or prayer requests',
    contact_name: 'Your Full Name',
    contact_email: 'Email Address',
    contact_phone: 'Phone / WhatsApp',
    contact_msg: 'Your Message or Prayer Request',
    contact_submit: 'Submit Message',

    // Audio
    audio_player_title: 'Sacred Harinam & Flute Meditation',
    audio_live: 'Live Radio',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('temple_lang') || 'bn' // Bengali default
  })

  useEffect(() => {
    localStorage.setItem('temple_lang', language)
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'bn' ? 'en' : 'bn'))
  }

  const setLanguage = (lang) => {
    if (lang === 'bn' || lang === 'en') {
      setLanguageState(lang)
    }
  }

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.bn
    if (langDict && langDict[key]) {
      return langDict[key]
    }
    const defaultDict = TRANSLATIONS.bn
    return defaultDict[key] || fallback || key
  }

  // Format any currency always in BDT (৳)
  const formatMoney = (amount) => {
    const num = Number(amount) || 0
    return `৳ ${num.toLocaleString('en-US')}`
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        formatMoney,
        isBengali: language === 'bn',
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
