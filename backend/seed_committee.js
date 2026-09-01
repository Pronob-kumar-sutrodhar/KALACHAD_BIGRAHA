const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });
const Committee = require('./models/Committee');

const DEFAULT_COMMITTEE_MEMBERS = [
  {
    nameBn: 'শ্রী সুব্রত কুমার সূত্রধর',
    nameEn: 'Sri Subrata Kumar Sutradhar',
    designationBn: 'সভাপতি',
    designationEn: 'President',
    photo: '/assets/img/volunteers/1.webp',
    phone: '+৮৮০ ১৭০০-১০০০০১',
    email: 'president@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'দীর্ঘ ২০ বছর ধরে শ্রী শ্রী কালাচাঁদ বিগ্রহ সেবা ও সার্বিক মন্দির উন্নয়নে অসামান্য নেতৃত্ব দিয়ে আসছেন।',
    bioEn: 'Providing outstanding leadership for temple development and deity seva for over 20 years.',
    order: 1,
    isActive: true,
  },
  {
    nameBn: 'শ্রী বিপ্লব কুমার রায়',
    nameEn: 'Sri Biplob Kumar Roy',
    designationBn: 'সাধারণ সম্পাদক',
    designationEn: 'General Secretary',
    photo: '/assets/img/volunteers/2.webp',
    phone: '+৮৮০ ১৭০০-১০০০০২',
    email: 'sec@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'দৈনন্দিন মন্দির প্রশাসন, মহোৎসব সমন্বয় এবং ভক্তদের সেবা ব্যবস্থাপনা কার্যক্রম পরিচালনা করেন।',
    bioEn: 'Overseeing daily mandir administration, festival coordination, and devotee hospitality management.',
    order: 2,
    isActive: true,
  },
  {
    nameBn: 'শ্রী অনিল চন্দ্র বিশ্বাস',
    nameEn: 'Sri Anil Chandra Biswas',
    designationBn: 'সহ-সভাপতি',
    designationEn: 'Vice President',
    photo: '/assets/img/volunteers/3.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৩',
    email: 'vp@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'মন্দিরের পরিকাঠামো উন্নয়ন, অতিথি ভবন নির্মাণ এবং সামাজিক কল্যাণমূলক প্রকল্পের সমন্বয়ক।',
    bioEn: 'Coordinator of temple infrastructure development, guest house construction, and community welfare.',
    order: 3,
    isActive: true,
  },
  {
    nameBn: 'শ্রী রঞ্জন কুমার পাল',
    nameEn: 'Sri Ranjan Kumar Paul',
    designationBn: 'যুগ্ম সাধারণ সম্পাদক',
    designationEn: 'Joint General Secretary',
    photo: '/assets/img/volunteers/4.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৪',
    email: 'joint.sec@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'উৎসবের শৃঙ্খলা, ভলান্টিয়ার টিম ব্যবস্থাপনা এবং প্রকাশনা কার্যক্রমে নিবেদিত প্রাণ।',
    bioEn: 'Dedicated to festival discipline, volunteer corps management, and spiritual publications.',
    order: 4,
    isActive: true,
  },
  {
    nameBn: 'শ্রী তাপস কুমার চক্রবর্তী',
    nameEn: 'Sri Tapas Kumar Chakraborty',
    designationBn: 'কোষাধ্যক্ষ',
    designationEn: 'Treasurer',
    photo: '/assets/img/volunteers/5.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৫',
    email: 'treasurer@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'মন্দিরের আয়-ব্যয়, অনুদান তহবিল ও স্বচ্ছ হিসাব পরিচালনার দায়িত্ব বিশ্বস্ততার সাথে পালন করছেন।',
    bioEn: 'Faithfully managing temple finances, donation funds, audit, and transparent accounts.',
    order: 5,
    isActive: true,
  },
  {
    nameBn: 'শ্রী প্রদীপ অধিকারী',
    nameEn: 'Sri Pradip Adhikari',
    designationBn: 'সাংগঠনিক সম্পাদক',
    designationEn: 'Organizing Secretary',
    photo: '/assets/img/volunteers/6.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৬',
    email: 'org.sec@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'ইউনিয়নের সকল এলাকার ভক্তদের সাথে সমন্বয় এবং ধর্মীয় পদযাত্রা পরিচালনায় মুখ্য ভূমিকা পালন করেন।',
    bioEn: 'Key coordinator for devotee outreach across all union sectors and organizing spiritual processions.',
    order: 6,
    isActive: true,
  },
  {
    nameBn: 'শ্রীমৎ স্বামী ভক্তিপ্রবণ মহারাজ',
    nameEn: 'Srimat Swami Bhaktiprabon Maharaj',
    designationBn: 'প্রধান উপদেষ্টা ও আচার্য',
    designationEn: 'Chief Spiritual Advisor & Acharya',
    photo: '/assets/img/people/1.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৭',
    email: 'advisor@kalachadtemple.org',
    addressBn: 'শ্রী কালাচাঁদ আশ্রম কুটির',
    addressEn: 'Sri Kalachand Ashram Kutir',
    bioBn: 'বেদান্ত ও ভাগবত প্রবচনের মাধ্যমে ভক্তদের আধ্যাত্মিক দিকনির্দেশনা প্রদান করেন।',
    bioEn: 'Guiding the committee and devotees with authentic Vedic principles and spiritual guidance.',
    order: 7,
    isActive: true,
  },
  {
    nameBn: 'শ্রীমতি সুমনা ভৌমিক',
    nameEn: 'Srimati Sumana Bhowmik',
    designationBn: 'মহিলা ও সমাজকল্যাণ সম্পাদিকা',
    designationEn: 'Women & Welfare Secretary',
    photo: '/assets/img/people/2.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৮',
    email: 'welfare@kalachadtemple.org',
    addressBn: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    addressEn: 'Brahmagacha, Raiganj, Sirajganj',
    bioBn: 'মন্দিরে নিত্য অন্নদান, নারী ভক্ত পরিষদ এবং শিশুদের নৈতিক শিক্ষা কার্যক্রম তত্ত্বাবধান করেন।',
    bioEn: 'Supervising daily Annadaan distribution, women devotee wing, and moral education for children.',
    order: 8,
    isActive: true,
  },
];

async function seedCommittee() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas...');
    await Committee.deleteMany({});
    const created = await Committee.insertMany(DEFAULT_COMMITTEE_MEMBERS);
    console.log(`Successfully seeded ${created.length} committee members into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding committee:', err);
    process.exit(1);
  }
}

seedCommittee();
