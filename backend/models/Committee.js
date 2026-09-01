const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema(
  {
    nameBn: {
      type: String,
      required: [true, 'নাম (বাংলা) আবশ্যক'],
      trim: true,
    },
    nameEn: {
      type: String,
      required: [true, 'Name (English) is required'],
      trim: true,
    },
    designationBn: {
      type: String,
      required: [true, 'পদবী (বাংলা) আবশ্যক'],
      trim: true,
    },
    designationEn: {
      type: String,
      required: [true, 'Designation / Position (English) is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: '/assets/img/volunteers/1.webp',
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    addressBn: {
      type: String,
      default: '',
    },
    addressEn: {
      type: String,
      default: '',
    },
    bioBn: {
      type: String,
      default: '',
    },
    bioEn: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Committee = mongoose.model('Committee', committeeSchema);
module.exports = Committee;
