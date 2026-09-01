const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    templeNameBn: {
      type: String,
      default: 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির',
    },
    templeNameEn: {
      type: String,
      default: 'Sri Sri Kalachand Bigraha Union Central Temple',
    },
    phone: {
      type: String,
      default: '+৮৮০ ১৭০০-০০০০০০',
    },
    email: {
      type: String,
      default: 'info@krishnamatemple.org',
    },
    addressBn: {
      type: String,
      default: 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ',
    },
    addressEn: {
      type: String,
      default: 'Brahmagacha, Raiganj, Sirajganj, Bangladesh',
    },
    openingHoursBn: {
      type: String,
      default: 'প্রতিদিন সকাল ৪:১৫ – রাত ৯:৩০ পর্যন্ত',
    },
    openingHoursEn: {
      type: String,
      default: 'Daily 04:15 AM – 09:30 PM EST',
    },
    liveStreamUrl: {
      type: String,
      default: 'https://www.youtube.com/embed/live_stream?channel=UCkrishnamandir',
    },
    marqueeNoticeBn: {
      type: String,
      default: 'ॐ নমো ভগবতে বাসুদেবায় • হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে হরে রাম হরে রাম রাম রাম হরে হরে • জয় শ্রী কালাচাঁদ বিগ্রহ',
    },
    marqueeNoticeEn: {
      type: String,
      default: 'Om Namo Bhagavate Vasudevaya • Hare Krishna Mahamantra • Jai Sri Kalachand Bigraha',
    },
    heroSlide1TitleBn: {
      type: String,
      default: 'শ্রী শ্রী কালাচাঁদ বিগ্রহ পরম ধাম ও অখণ্ড হরিনাম সংকীর্তন',
    },
    heroSlide1TitleEn: {
      type: String,
      default: 'Sri Sri Kalachand Bigraha Transcendental Sanctuary & Eternal Darshan',
    },
    heroSlide1SubtitleBn: {
      type: String,
      default: 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দিরে আপনাকে স্বাগতম',
    },
    heroSlide1SubtitleEn: {
      type: String,
      default: 'Welcome to Sri Sri Kalachand Bigraha Union Central Temple',
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
