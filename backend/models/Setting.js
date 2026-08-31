const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    templeNameBn: {
      type: String,
      default: 'শ্রী শ্রী কৃষ্ণ মহা মন্দির',
    },
    templeNameEn: {
      type: String,
      default: 'Krishna Mega Temple',
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
      default: '১০৮ শ্রী ধাম রোড, বৃন্দাবন ধাম মার্গ',
    },
    addressEn: {
      type: String,
      default: '108 Sacred Way, Vrindavan Dham Blvd',
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
      default: 'ॐ নমো ভগবতে বাসুদেবায় • হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে হরে রাম হরে রাম রাম রাম হরে হরে • জয় শ্রী রাধে',
    },
    marqueeNoticeEn: {
      type: String,
      default: 'Om Namo Bhagavate Vasudevaya • Hare Krishna Mahamantra • Jai Sri Radhe Krishna',
    },
    heroSlide1TitleBn: {
      type: String,
      default: 'শ্রী শ্রী রাধাকৃষ্ণ পরম ধাম ও অখণ্ড হরিনাম সংকীর্তন',
    },
    heroSlide1TitleEn: {
      type: String,
      default: 'Lord Krishna Transcendental Sanctuary & Eternal Darshan',
    },
    heroSlide1SubtitleBn: {
      type: String,
      default: 'শ্রী শ্রী কৃষ্ণ মহা মন্দিরে আপনাকে স্বাগতম',
    },
    heroSlide1SubtitleEn: {
      type: String,
      default: 'Welcome to Sri Sri Krishna Mega Temple',
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
