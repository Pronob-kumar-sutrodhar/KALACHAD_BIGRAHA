const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Donation = require('../models/Donation');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const Puja = require('../models/Puja');
const PujaBooking = require('../models/PujaBooking');

// ─── Seed Data (All Currency in BDT / Bangladeshi Taka) ──────────────────────────

const users = [
  {
    name: 'প্রধান পুরোহিত রাকেশ পাণ্ডে (Chief Priest)',
    email: 'admin@krishnatemple.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'ভক্ত অর্জুন শর্মা (Devotee)',
    email: 'arjun.sharma@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

const products = [
  {
    name: 'শ্রী শ্রী রাধাকৃষ্ণ অষ্টধাতু বিগ্রহ (হস্তনির্মিত)',
    description: `শ্রী শ্রী কৃষ্ণ মহা মন্দিরের এই পবিত্র অষ্টধাতু শ্রী শ্রী রাধাকৃষ্ণ বিগ্রহ ঐতিহ্যবাহী শিল্পীদের দ্বারা ব্রজধাম মথুরায় নির্মিত। মঙ্গল আরতির সময় বৈদিক মন্ত্রে বিগ্রহদ্বয়কে বিশেষভাবে পুজো ও জাগ্রত করা হয়েছে।

বৈশিষ্ট্যসমূহ:
• খাঁটি অষ্টধাতু ব্রাস ও প্রতিরক্ষামূলক অ্যান্টিক পলিশ
• উচ্চতা: ৯ ইঞ্চি, ওজন: প্রায় ১.৮ কেজি
• নিখুঁত ময়ূরপুচ্ছ মুকুট, মোহন বাঁশি ও পদ্মনয়ন খোদাই
• সাথে রয়েছে তুলসী মালা ও কাষ্ঠাসন
• গৃহমন্দির ও শুভ উপহারের জন্য পরম মঙ্গলময়`,
    price: 3500,
    originalPrice: 4500,
    image: '/assets/img/products/new/1.webp',
    images: [
      '/assets/img/products/new/1.webp',
      '/assets/img/puja/1.webp',
      '/assets/img/puja/2.webp',
    ],
    category: 'Idols & Murtis',
    countInStock: 12,
    rating: 5,
    numReviews: 48,
    isFeatured: true,
    reviews: [
      {
        name: 'সঞ্জয় দেশমুখ',
        rating: 5,
        comment: 'আমার গৃহমন্দিরে এই বিগ্রহের দর্শন অন্তরে অপার আনন্দ ও শান্তি এনে দিয়েছে। চমৎকার শিল্পকর্ম।',
        date: '১০ আগস্ট, ২০২৬',
      },
      {
        name: 'অনন্যা শর্মা',
        rating: 5,
        comment: 'খুবই ভারী পিতল ও নিখুঁত কাজ। প্যাকেজিং ও ডেলিভারি অত্যন্ত দ্রুত ও যত্নের সাথে পেয়েছি।',
        date: '২৪ জুলাই, ২০২৬',
      },
    ],
  },
  {
    name: 'শ্রীমদ্ভগবদ্গীতা যথাযথ (হার্ডবাউন্ড সংস্করণ)',
    description: `মূল সংস্কৃত শ্লোক, অন্বয়, বঙ্গানুবাদ এবং প্রামাণিক তাৎপর্য সহ সম্পূর্ণ ৭০০ শ্লোকের শ্রীমদ্ভগবদ্গীতা। কর্মযোগ, জ্ঞানযোগ ও ভক্তিযোগের শাশ্বত নির্দেশিকা।`,
    price: 450,
    originalPrice: 600,
    image: '/assets/img/blog/2.webp',
    images: ['/assets/img/blog/2.webp'],
    category: 'Vedic Books',
    countInStock: 80,
    rating: 5,
    numReviews: 112,
    isFeatured: true,
  },
  {
    name: 'প্রাকৃতিক বৃন্দাবন চন্দন ধূপ ও শঙ্ক (৩ প্যাকেট)',
    description: `খাঁটি চন্দন কাঠের গুঁড়া, কর্পূর ও দেশীয় গাভীর ঘিয়ে হাতে তৈরি পরিবেশবান্ধব প্রাকৃতিক সুগন্ধি ধূপকাঠি।`,
    price: 250,
    originalPrice: 350,
    image: '/assets/img/puja/4.webp',
    images: ['/assets/img/puja/4.webp'],
    category: 'Dhoop & Incense',
    countInStock: 150,
    rating: 4.8,
    numReviews: 64,
    isFeatured: true,
  },
  {
    name: 'রূপার প্রলেপযুক্ত পঞ্চপ্রদীপ মহা আরতি থালি সেট',
    description: `মঙ্গল আরতি, পঞ্চপাত্র ও প্রদীপ সমন্বিত খোদাই করা ভারী পিতল ও রূপার প্রলেপযুক্ত শুভ পূজা থালি সেট। প্রতিদিনের গৃহপূজা ও মহা আরতির জন্য উপযুক্ত।`,
    price: 1850,
    originalPrice: 2200,
    image: '/assets/img/puja/1.webp',
    images: ['/assets/img/puja/1.webp'],
    category: 'Puja Samagri',
    countInStock: 35,
    rating: 4.9,
    numReviews: 36,
    isFeatured: true,
  },
  {
    name: 'আসল ১০৮+১ তুলসী জপমালা ও রেশমি ঝুলি',
    description: `খাঁটি তুলসী কাষ্ঠের তৈরি মহাপ্রভুর পবিত্র মহামন্ত্র জপের ১০৮+১ দানা মালা ও রেশমি সূচিকর্মযুক্ত জপ ঝুলি।`,
    price: 350,
    originalPrice: 500,
    image: '/assets/img/puja/3.webp',
    images: ['/assets/img/puja/3.webp'],
    category: 'Japa Malas',
    countInStock: 200,
    rating: 5,
    numReviews: 89,
    isFeatured: true,
  },
  {
    name: 'পূজার জন্য খাঁটি সিল্কের পীতাম্বরী ধুতি ও উত্তরীয়',
    description: `শুভ হলুদ রঙের জরির পাড়যুক্ত সিল্কের পীতাম্বরী ধুতি ও চাদর, যা সকল পূজা ও যজ্ঞের জন্য শুভ ও পবিত্র।`,
    price: 1200,
    originalPrice: 1600,
    image: '/assets/img/banner/s1.webp',
    images: ['/assets/img/banner/s1.webp'],
    category: 'Devotional Attire',
    countInStock: 40,
    rating: 4.7,
    numReviews: 28,
  },
  {
    name: 'শ্রী জগন্নাথ, বলদেব ও সুভদ্রা কাষ্ঠ বিগ্রহ সেট',
    description: `পুরী ধামের ঐতিহ্যবাহী নিম কাষ্ঠের হস্তনির্মিত দেববিগ্রহ, যা গৃহের সমস্ত অমঙ্গল দূর করে শান্তি স্থাপন করে।`,
    price: 2200,
    originalPrice: 2800,
    image: '/assets/img/puja/5.webp',
    images: ['/assets/img/puja/5.webp'],
    category: 'Idols & Murtis',
    countInStock: 22,
    rating: 5,
    numReviews: 42,
  },
  {
    name: 'মথুরার পেঁড়া ও ভোগ নিবেদিত প্রসাদ বক্স (৫০০ গ্রাম)',
    description: `খাঁটি গরুর দুধ ও ঘিয়ে তৈরি এবং শ্রীকৃষ্ণের শ্রীপাদপদ্মে নিবেদিত সুস্বাদু পেঁড়া মহাপ্রসাদ।`,
    price: 480,
    originalPrice: 600,
    image: '/assets/img/puja/6.webp',
    images: ['/assets/img/puja/6.webp'],
    category: 'Sacred Prasad',
    countInStock: 60,
    rating: 4.9,
    numReviews: 95,
  },
];

const donations = [
  {
    title: 'শিশু সুরক্ষা ও বৈদিক বিদ্যালয় তহবিল',
    description: `প্রতিটি শিশুর অধিকার রয়েছে সনাতন শাস্ত্রীয় শিকড়, গুণগত আধুনিক শিক্ষা এবং পুষ্টিকর সাত্ত্বিক আহারের সান্নিধ্যে বেড়ে ওঠার।

আমাদের বৈদিক বিদ্যালয় প্রদান করে:
• ২৫০+ সুবিধাবঞ্চিত ও অনাথ শিশুর বিনামূল্যে থাকা-খাওয়া ও শাস্ত্রীয় শিক্ষা
• প্রতিদিনের পুষ্টিকর প্রাতরাশ এবং কৃষ্ণ মহাপ্রসাদ
• সংস্কৃত শ্লোক পাঠ, নৈতিক মূল্যবোধ, গণিত ও কম্পিউটার শিক্ষা
• যোগব্যায়াম, শাস্ত্রীয় সংগীত ও আধ্যাত্মিক সাধনা`,
    image: '/assets/img/donation/5.webp',
    raised: 520000,
    goal: 850000,
    category: 'Vedic Education',
    donorsCount: 428,
    isFeatured: true,
  },
  {
    title: 'অন্নদান সেবা — প্রতিদিন ১৫০০+ ভক্তের মহাপ্রসাদ',
    description: `শ্রীমদ্ভগবদ্গীতায় ভগবান শ্রীকৃষ্ণ বলেছেন: "অন্নাদ্ভবন্তি ভূতানি" — অন্ন থেকেই জগতের সমস্ত জীবের সৃষ্টি। তাই সনাতন ধর্মে অন্নদানকে মহাদান বলা হয়েছে।

আমাদের মন্দির অন্নছত্রে প্রতিদিন:
• ১৫০০+ প্লেট গরম খিচুড়ি, ডাল, সবজি ও পায়েস মহাপ্রসাদ বিনামূল্যে বিতরণ
• প্রত্যন্ত অঞ্চলে ভক্তদের জন্য ভ্রাম্যমাণ প্রসাদ বিতরণ গাড়ি
• জন্মাষ্টমী, রাধাষ্টমী ও একাদশীতে বিশেষ ভোজের আয়োজন`,
    image: '/assets/img/donation/6.webp',
    raised: 410000,
    goal: 600000,
    category: 'Annadaan Seva',
    donorsCount: 610,
    isFeatured: true,
  },
  {
    title: 'মন্দির সংস্কার ও দেশীয় গৌশালা সেবা',
    description: `শ্রী শ্রী রাধাকৃষ্ণের পবিত্র আলয় সংরক্ষণ এবং গোমাতার চিরন্তন সেবা নিশ্চিতকরণ।

যেসব কার্যক্রম পরিচালিত হয়:
• গর্ভগৃহের ঐতিহ্যবাহী মার্বেল ও কাষ্ঠ খোদাই সংস্কার
• গৌশালার ২০০+ দেশীয় গরুর আজীবন চিকিৎসাসেবা ও পুষ্টিকর ঘাস-ভুসি
• সৌরবিদ্যুৎ ও প্রাকৃতিক জল নিষ্কাশন ব্যবস্থা`,
    image: '/assets/img/donation/7.webp',
    raised: 780000,
    goal: 1000000,
    category: 'Mandir & Gaushala',
    donorsCount: 890,
    isFeatured: true,
  },
  {
    title: 'গীতা জয়ন্তী বিনামূল্যে শাস্ত্র বিতরণ সেবা',
    description: `স্কুল, কলেজ ও কারাগারে নৈতিক মূল্যবোধ ও আধ্যাত্মিক চেতনায় শ্রীমদ্ভগবদ্গীতা গ্রন্থ বিতরণ।`,
    image: '/assets/img/banner/s3.webp',
    raised: 150000,
    goal: 250000,
    category: 'Scripture Seva',
    donorsCount: 195,
  },
  {
    title: 'সাধু, বৈষ্ণব ও পূজারী কল্যাণ তহবিল',
    description: `মন্দিরের আজীবন সেবায় নিবেদিত বয়স্ক সাধু ও পূজারীদের চিকিৎসা, বাসস্থান ও কল্যাণ ভাতা।`,
    image: '/assets/img/volunteers/4.webp',
    raised: 280000,
    goal: 400000,
    category: 'Sevak Welfare',
    donorsCount: 310,
  },
  {
    title: 'তীর্থযাত্রী অতিথিশালা ও ছাত্রাবাস নির্মাণ',
    description: `দূরদূরান্ত থেকে আগত ভক্ত ও দর্শনার্থীদের জন্য আধুনিক ও স্বাস্থ্যকর বিনামূল্যে থাকার ব্যবস্থা।`,
    image: '/assets/img/banner/s4.webp',
    raised: 620000,
    goal: 1200000,
    category: 'Pilgrim Seva',
    donorsCount: 540,
  },
];

const events = [
  {
    title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমী ও ব্রজ রাস মহোৎসব',
    description: `বছরের সর্বশ্রেষ্ঠ মহোৎসব! ৩ দিনব্যাপী ১০৮ কলশ মহা অভিষেক, মধ্যরাত মহা আরতি ও ৫৬ ভোগ মহাপ্রসাদ বিতরণ।`,
    image: '/assets/img/banner/s1.webp',
    date: new Date('2026-08-26T00:00:00.000Z'),
    time: 'সকাল ১০:০০ – মধ্যরাত ১২:৩০',
    location: 'মূল গর্ভগৃহ ও মন্দির প্রাঙ্গণ',
    category: 'Grand Festival',
    organizer: 'মন্দির মহোৎসব পরিষদ',
    priest: 'পণ্ডিত রাকেশ কুমার পাণ্ডে ও দল',
    rsvpCount: 1420,
    isFeatured: true,
  },
  {
    title: 'শ্রীমতী রাধারাণীর শুভ আবির্ভাব তিথি মহোৎসব',
    description: `শ্রীমতী রাধারাণীর পরম কৃপা ও ভক্তি প্রার্থনায় পুষ্পাঞ্জলি অভিষেক, ভজন ও কীর্তন মহোৎসব।`,
    image: '/assets/img/puja/2.webp',
    date: new Date('2026-09-08T00:00:00.000Z'),
    time: 'বিকাল ০৪:৩০ – রাত ০৯:০০',
    location: 'রাধা কৃষ্ণ নাটমন্দির',
    category: 'Devotional Festival',
    organizer: 'বৈষ্ণবী সেবা মণ্ডল',
    priest: 'স্বামী য়েশ চোপড়া',
    rsvpCount: 650,
  },
  {
    title: 'শ্রী গোবর্ধন অন্নকূট পূজা ও ১০০৮ পদ নিবেদন',
    description: `ভগবান শ্রীকৃষ্ণের গোবর্ধন পর্বত ধারণ স্মরণে পর্বতাকৃতির সুস্বাদু অন্ন ও ব্যঞ্জন ভোগ নিবেদন ও গো-পূজা।`,
    image: '/assets/img/banner/s4.webp',
    date: new Date('2026-10-22T00:00:00.000Z'),
    time: 'সকাল ১১:০০ – দুপুর ০৩:০০',
    location: 'অন্নকূট মণ্ডপ',
    category: 'Annakut Puja',
    organizer: 'গৌশালা ও সেবা ট্রাস্ট',
    priest: 'আচার্য এম. কাপুর',
    rsvpCount: 920,
  },
  {
    title: 'দীপাবলি ও ১০,০০০ পবিত্র ঘৃত প্রদীপ মহোৎসব',
    description: `পবিত্র কার্তিক মাসে মন্দির প্রাঙ্গণে ১০ হাজার মাটির প্রদীপ প্রজ্বালন ও দামোদরাষ্টকম স্তোত্র পাঠ।`,
    image: '/assets/img/puja/6.webp',
    date: new Date('2026-11-01T00:00:00.000Z'),
    time: 'সন্ধ্যা ০৬:০০ – রাত ০৯:৩০',
    location: 'মন্দির ঘাট ও প্রাঙ্গণ',
    category: 'Deepotsav',
    organizer: 'যুব ভক্ত সংঘ',
    priest: 'পণ্ডিত মোহন দাস',
    rsvpCount: 1800,
  },
  {
    title: 'গীতা জয়ন্তী আন্তর্জাতিক শাস্ত্র সম্মেলন',
    description: `শ্রীমদ্ভগবদ্গীতার ৭০০ শ্লোক সম্মিলিত আবৃত্তি এবং বাস্তব জীবনে প্রয়োগ বিষয়ক আলোচনা।`,
    image: '/assets/img/banner/s3.webp',
    date: new Date('2026-12-11T00:00:00.000Z'),
    time: 'সকাল ০৯:০০ – বিকাল ০৫:০০',
    location: 'বৈদিক মিলনায়তন',
    category: 'Gita Seminar',
    organizer: 'গীতা স্বাধ্যায় কেন্দ্র',
    priest: 'পণ্ডিত রাকেশ কুমার পাণ্ডে',
    rsvpCount: 530,
  },
  {
    title: 'মহা শিবরাত্রি অখণ্ড রুদ্রাভিষেক',
    description: `সারারাতব্যাপী চার প্রহর রুদ্রাভিষেক, বিল্বপত্র অর্পণ ও মহামৃত্যুঞ্জয় জপ মহাযজ্ঞ।`,
    image: '/assets/img/puja/5.webp',
    date: new Date('2027-02-18T00:00:00.000Z'),
    time: 'সন্ধ্যা ০৬:০০ – পরদিন ভোর ০৬:০০',
    location: 'শিব মন্দির ও যজ্ঞশালা',
    category: 'Maha Shivratri',
    organizer: 'মন্দির পূজারী পরিষদ',
    priest: 'আচার্য এম. কাপুর',
    rsvpCount: 1100,
  },
];

const blogs = [
  {
    title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমীর শাশ্বত মাহাত্ম্য ও লীলা রহস্য',
    excerpt: 'কংসের কারাগারে মধ্যরাতে শ্রীকৃষ্ণের আবির্ভাবের গভীর তাৎপর্য এবং মহামন্ত্র জপের শক্তি।',
    content: `ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথি পরম ভক্তি ও আনন্দের সাথে উদযাপন করা হয়। শ্রীকৃষ্ণ স্বয়ং ভগবান, যিনি জগতে ধর্ম সংস্থাপন ও ভক্তের প্রেমপূর্ণ আকুল আহ্বানে সাড়া দিতে আবির্ভূত হন।

### ১. কংসের কারাগারে মধ্যরাতের আবির্ভাব
ঘোর অন্ধকার রাত্রিতে রোহিনী নক্ষত্রে শ্রীকৃষ্ণের আবির্ভাব প্রমাণ করে যে, জীবনের যত গভীর সংকট ও অজ্ঞানতাই আসুক না কেন, আকুল হৃদয়ে ডাকলে পরমেশ্বর ভগবানের কৃপা অনিবার্য।

### ২. মহামন্ত্র জপের বৈজ্ঞানিক প্রভাব
> হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে
> হরে রাম হরে রাম রাম রাম হরে হরে

এই পবিত্র নামসংকীর্তন হৃদয়ের সমস্ত কলুষতা দূর করে আত্মাকে পরম শান্তির সন্ধান দেয়।`,
    image: '/assets/img/blog/1.webp',
    author: 'আচার্য রাকেশ পাণ্ডে',
    authorBio: 'প্রধান পূজারী ও বৈদিক শাস্ত্রজ্ঞ, ৩০ বছরেরও বেশি সময় ধরে সেবারত।',
    authorAvatar: '/assets/img/people/1.webp',
    category: 'Festivals',
    tags: ['জন্মাষ্টমী', 'ভক্তি', 'বৃন্দাবন', 'মহামন্ত্র'],
    views: 1240,
    comments: [
      {
        name: 'পূজা শর্মা',
        email: 'pooja@example.com',
        text: 'অত্যন্ত সুন্দর ও ভক্তিময় আলোচনা। অন্তরে অপার শান্তি লাভ করলাম।',
        date: new Date('2026-08-18'),
      },
    ],
  },
  {
    title: 'কর্ম ও ধর্মের রহস্য: শ্রীমদ্ভগবদ্গীতার মূল শিক্ষা',
    excerpt: 'ফলাকাঙ্ক্ষা বর্জন করে কীভাবে कर्तव्य কর্ম সম্পাদন করতে হয়। আধুনিক মানসিক চাপ ও উদ্বেগ থেকে মুক্তির চিরন্তন পথ।',
    content: `কুরুক্ষেত্রের যুদ্ধক্ষেত্রে ভগবান শ্রীকৃষ্ণ অর্জুনকে যে পরম জ্ঞান প্রদান করেছিলেন, তা মানবজীবনের প্রতিটি সংকটের সমাধান দিতে সক্ষম।

### ১. আত্মা অবিনাশী ও নিত্য
দেহ নশ্বর, কিন্তু দেহের অভ্যন্তরে বিরাজমান চৈতন্য আত্মা চিরন্তন, অবিনাশী ও পবিত্র।

### ২. নিষ্কাম কর্মযোগ
ফলের আশা ত্যাগ করে সমাজকল্যাণে ও ভগবৎ প্রীতিতে সমস্ত কর্তব্য সম্পাদন করাই হলো যোগ।`,
    image: '/assets/img/blog/2.webp',
    author: 'স্বামী য়েশ চোপড়া',
    authorBio: 'সিনিয়র আচার্য ও যুব উপদেষ্টা।',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Vedic Philosophy',
    tags: ['গীতা', 'কর্মযোগ', 'জ্ঞান', 'দর্শন'],
    views: 980,
  },
  {
    title: 'ভোরবেলার মঙ্গল আরতি ও মহামন্ত্র জপের শক্তি',
    excerpt: 'ব্রাহ্মমুহূর্তে সূর্যোদয়ের পূর্বে ভগবৎ আরাধনায় মনঃসংযোগ ও আধ্যাত্মিক শক্তির জাগরণ ঘটে।',
    content: `সূর্যোদয়ের দেড় ঘণ্টা পূর্বের ব্রাহ্মমুহূর্ত আধ্যাত্মিক সাধনার জন্য সর্বোত্তম সময়। এসময় নামসংকীর্তনে সারা দিনের সমস্ত ক্লান্তি ও বাধা দূরীভূত হয়।`,
    image: '/assets/img/blog/3.webp',
    author: 'পণ্ডিত মোহন দাস',
    authorAvatar: '/assets/img/people/1.webp',
    category: 'Sadhana',
    tags: ['মহামন্ত্র', 'আরতি', 'ধ্যান'],
    views: 740,
  },
  {
    title: 'পবিত্র অন্নদানের মহিমা: ক্ষুধাতুরকে খাদ্যদানই শ্রেষ্ঠ পূজা',
    excerpt: 'বৈদিক শাস্ত্রে অন্নকে ব্রহ্মস্বরূপ বলা হয়েছে। কীভাবে প্রসাদ বিতরণ আধ্যাত্মিক মুক্তি আনয়ন করে।',
    content: `অন্নদান বৈদিক শাস্ত্রে মহাদান হিসেবে খ্যাত। যখন ভগবানে নিবেদিত মহাপ্রসাদ বিনামূল্যে সর্বস্তরের মানুষের মাঝে বিতরণ করা হয়, তখন তা দাতা ও গ্রহীতা উভয়ের আত্মিক কল্যাণ সাধন করে।`,
    image: '/assets/img/donation/6.webp',
    author: 'আচার্য এম. কাপুর',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Seva & Charity',
    tags: ['অন্নদান', 'প্রসাদ', 'সেবা'],
    views: 890,
  },
  {
    title: 'সনাতন ধর্মে তুলসী বৃক্ষের তাৎপর্য ও নিত্য পূজা বিধি',
    excerpt: 'শ্রীমতী তুলসী দেবী ভগবান শ্রীকৃষ্ণের পরম প্রিয়া ভক্ত। কেন প্রতিটি গৃহে তুলসী সেবা কল্যাণকর।',
    content: `বৃন্দাবনের অধিষ্ঠাত্রী দেবী বৃন্দা দেবীই তুলসী নামে পরিচিত। গৃহে প্রতিদিন তুলসী দর্শন, প্রদক্ষিণ ও জলদানে পরম পবিত্রতা বিরাজ করে।`,
    image: '/assets/img/puja/4.webp',
    author: 'স্বামী য়েশ চোপড়া',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Rituals',
    tags: ['তুলসী সেবা', 'পূজা', 'প্রকৃতি'],
    views: 610,
  },
];

const pujas = [
  {
    title: 'শ্রী শ্রী রাধাকৃষ্ণ নিত্য মঙ্গল আরতি ও অর্চনা',
    description: 'শঙ্খনাদ, কর্পূর আরতি ও পুষ্পাঞ্জলি সহযোগে শ্রীকৃষ্ণের শ্রীপাদপদ্মে নামসংকীর্তন।',
    price: '৳ ৫০১ দক্ষিণা',
    image: '/assets/img/puja/1.webp',
    category: 'Daily Aarti',
    schedule: 'প্রতিদিন ভোর ০৪:১৫ – ০৫:১৫',
    benefits: ['ব্রাহ্মমুহূর্তের বিশেষ আশীর্বাদ', 'পারিবারিক অশান্তি ও গ্রহদোষ নিবারণ', 'মানসিক প্রশান্তি'],
    isFeatured: true,
  },
  {
    title: 'মহানবমী চণ্ডী হোম ও বিশেষ যজ্ঞ',
    description: 'পারিবারিক শান্তি, গ্রহদোষ খণ্ডন ও মায়ের বিশেষ আশীর্বাদ কামনায় বৈদিক হোম যজ্ঞ।',
    price: '৳ ২৫০১ দক্ষিণা',
    image: '/assets/img/puja/2.webp',
    category: 'Special Homa',
    schedule: 'প্রতি শুক্রবার ও নবরাত্রি',
    benefits: ['নেতিবাচক শক্তি বিনাশ', 'সাহস ও মানসিক শক্তি বৃদ্ধি', 'পারিবারিক সমৃদ্ধি'],
    isFeatured: true,
  },
  {
    title: '১০৮ কলশ পঞ্চামৃত মহা অভিষেক',
    description: 'দুধ, মধু, ঘৃত, গঙ্গাজল ও পঞ্চামৃত দিয়ে শ্রীকৃষ্ণের পরম পবিত্র অভিষেক ও ৫৬ ভোগ।',
    price: '৳ ৩১০০ দক্ষিণা',
    image: '/assets/img/puja/3.webp',
    category: 'Festival Puja',
    schedule: 'জন্মাষ্টমী ও একাদশী তিথিতে',
    benefits: ['ভগবৎ ভক্তি লাভ', 'সৎ সন্তান প্রাপ্তির শুভকামনা', 'পূর্বকৃত পাপক্ষয়'],
    isFeatured: true,
  },
  {
    title: 'গৃহপ্রবেশ ও বাস্তু শান্তি যজ্ঞ',
    description: 'নতুন বাসস্থান বা ব্যবসাপ্রতিষ্ঠানে শান্তি ও প্রাচুর্যের জন্য নবগ্রহ হোম ও বাস্তু পূজা।',
    price: '৳ ৫০০১ দক্ষিণা',
    image: '/assets/img/puja/4.webp',
    category: 'Samskaras',
    schedule: 'শুভ মুহূর্ত নির্ধারণ সাপেক্ষে',
    benefits: ['বাসস্থানের পবিত্রতা লাভ', 'বাস্তুদোষ মুক্তি', 'দীর্ঘায়ু ও আরোগ্য'],
    isFeatured: true,
  },
  {
    title: 'শ্রী সত্যনারায়ণ স্বামী মহাকথা ও ব্রত',
    description: 'ভগবান শ্রীবিষ্ণুর মহিমা পাঠ, পঞ্চামৃত ও সিন্নি ভোগ নিবেদন এবং পারিবারিক সৌভাগ্য কামনার ব্রত।',
    price: '৳ ১০০১ দক্ষিণা',
    image: '/assets/img/puja/5.webp',
    category: 'Vratam & Katha',
    schedule: 'প্রতি পূর্ণিমা তিথিতে',
    benefits: ['মনোবাঞ্ছা পূরণ', 'পারিবারিক ঐক্য ও সুখ', 'অনাবিল শান্তি'],
    isFeatured: true,
  },
  {
    title: 'রুদ্র অভিষেক ও বিল্বপত্র অর্চনা',
    description: 'শ্রী রুদ্রম পাঠ ও ১০০৮ বিল্বপত্র অর্পণে রোগব্যাধি ও পাপমুক্তি কামনায় যজ্ঞ।',
    price: '৳ ১৫০১ দক্ষিণা',
    image: '/assets/img/puja/6.webp',
    category: 'Abhishekam',
    schedule: 'প্রতি সোমবার ও প্রদোষ তিথিতে',
    benefits: ['দুরারোগ্য ব্যাধি মুক্তি', 'আয়ু ও তেজ বৃদ্ধি', 'ভয়মুক্তি'],
    isFeatured: true,
  },
];

// ─── Database Operations ──────────────────────────────────────────────────────

const importData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected for Seeding: ${conn.connection.host}`.cyan.underline);

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Donation.deleteMany();
    await Event.deleteMany();
    await Blog.deleteMany();
    await Puja.deleteMany();
    await PujaBooking.deleteMany();

    console.log('Previous database collections cleared.'.yellow);

    // Insert Users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Attach user reference to products reviews
    const sampleProducts = products.map((prod) => {
      if (prod.reviews && prod.reviews.length > 0) {
        prod.reviews = prod.reviews.map((rev) => ({
          ...rev,
          user: adminUser,
        }));
      }
      return prod;
    });

    await Product.insertMany(sampleProducts);
    await Donation.insertMany(donations);
    await Event.insertMany(events);
    await Blog.insertMany(blogs);
    await Puja.insertMany(pujas);

    console.log('✅ Krishna Mega Temple Data (BDT Currency) Successfully Seeded!'.green.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Product.deleteMany();
    await Donation.deleteMany();
    await Event.deleteMany();
    await Blog.deleteMany();
    await Puja.deleteMany();
    await PujaBooking.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
