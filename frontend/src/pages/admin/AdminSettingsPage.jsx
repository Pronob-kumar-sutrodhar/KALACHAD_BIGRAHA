import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaCog, FaSave, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaVideo, FaBullhorn, FaImage
} from 'react-icons/fa'

export default function AdminSettingsPage() {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    templeNameBn: 'শ্রী শ্রী কৃষ্ণ মহা মন্দির',
    templeNameEn: 'Krishna Mega Temple',
    phone: '+৮৮০ ১৭০০-০০০০০০',
    email: 'info@krishnamatemple.org',
    addressBn: '১০৮ শ্রী ধাম রোড, বৃন্দাবন ধাম মার্গ',
    addressEn: '108 Sacred Way, Vrindavan Dham Blvd',
    openingHoursBn: 'প্রতিদিন সকাল ৪:১৫ – রাত ৯:৩০ পর্যন্ত',
    openingHoursEn: 'Daily 04:15 AM – 09:30 PM EST',
    liveStreamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCkrishnamandir',
    marqueeNoticeBn: 'ॐ নমো ভগবতে বাসুদেবায় • হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে হরে রাম হরে রাম রাম রাম হরে হরে • জয় শ্রী রাধে',
    marqueeNoticeEn: 'Om Namo Bhagavate Vasudevaya • Hare Krishna Mahamantra • Jai Sri Radhe Krishna',
    heroSlide1TitleBn: 'শ্রী শ্রী রাধাকৃষ্ণ পরম ধাম ও অখণ্ড হরিনাম সংকীর্তন',
    heroSlide1TitleEn: 'Lord Krishna Transcendental Sanctuary & Eternal Darshan',
    heroSlide1SubtitleBn: 'শ্রী শ্রী কৃষ্ণ মহা মন্দিরে আপনাকে স্বাগতম',
    heroSlide1SubtitleEn: 'Welcome to Sri Sri Krishna Mega Temple',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const res = await api.get('/api/settings')
        if (res.data) setFormData(res.data)
      } catch {
        toast.error('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/api/settings', formData)
      toast.success(language === 'bn' ? 'মন্দির সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Settings saved successfully!')
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'গ্লোবাল ওয়েবসাইট কনফিগারেশন' : 'Global Site CMS'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'মন্দির সাইট সেটিংস ও ব্যানার কাস্টমাইজেশন' : 'Site Settings & Live Broadcast'}
          </h2>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="kr-btn-custom flex items-center gap-2 py-2.5 px-6 text-xs cursor-pointer shadow-md"
        >
          <FaSave />
          <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সেভ করুন'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Contact & Hotline Info */}
        <div className="bg-white p-6 border border-gray-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-lora text-base font-bold text-temple-primary flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaPhoneAlt className="text-temple-accent" />
            <span>যোগাযোগ ও হেল্পলাইন তথ্য</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">মন্দির হেল্পলাইন ফোন *</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">অফিসিয়াল ইমেইল *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">মন্দিরের ঠিকানা (বাংলা) *</label>
              <input
                type="text"
                value={formData.addressBn}
                onChange={(e) => setFormData({ ...formData, addressBn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">মন্দিরের ঠিকানা (English) *</label>
              <input
                type="text"
                value={formData.addressEn}
                onChange={(e) => setFormData({ ...formData, addressEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Live Darshan Broadcast URL & Marquee Ticker */}
        <div className="bg-white p-6 border border-gray-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-lora text-base font-bold text-temple-primary flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaVideo className="text-temple-accent" />
            <span>লাইভ শৃঙ্গার দর্শন ও অ্যানাউন্সমেন্ট টিকার</span>
          </h3>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              লাইভ দর্শন YouTube Embed লিঙ্ক / ক্যামেরা স্ট্রিম
            </label>
            <input
              type="text"
              value={formData.liveStreamUrl}
              onChange={(e) => setFormData({ ...formData, liveStreamUrl: e.target.value })}
              placeholder="https://www.youtube.com/embed/live_stream?channel=..."
              className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                শীর্ষ টিকার নোটিশ (বাংলা)
              </label>
              <textarea
                rows="2"
                value={formData.marqueeNoticeBn}
                onChange={(e) => setFormData({ ...formData, marqueeNoticeBn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                শীর্ষ টিকার নোটিশ (English)
              </label>
              <textarea
                rows="2"
                value={formData.marqueeNoticeEn}
                onChange={(e) => setFormData({ ...formData, marqueeNoticeEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Hero Banner Customizer */}
        <div className="bg-white p-6 border border-gray-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-lora text-base font-bold text-temple-primary flex items-center gap-2 border-b border-gray-100 pb-2">
            <FaImage className="text-temple-accent" />
            <span>হোমপেজ প্রধান ব্যানার (Hero Slide)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ব্যানার প্রধান শিরোনাম (বাংলা)</label>
              <input
                type="text"
                value={formData.heroSlide1TitleBn}
                onChange={(e) => setFormData({ ...formData, heroSlide1TitleBn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">ব্যানার প্রধান শিরোনাম (English)</label>
              <input
                type="text"
                value={formData.heroSlide1TitleEn}
                onChange={(e) => setFormData({ ...formData, heroSlide1TitleEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ব্যানার সাবটাইটেল (বাংলা)</label>
              <input
                type="text"
                value={formData.heroSlide1SubtitleBn}
                onChange={(e) => setFormData({ ...formData, heroSlide1SubtitleBn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">ব্যানার সাবটাইটেল (English)</label>
              <input
                type="text"
                value={formData.heroSlide1SubtitleEn}
                onChange={(e) => setFormData({ ...formData, heroSlide1SubtitleEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="kr-btn-custom py-3 px-8 text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <FaSave />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সকল সেটিংস সেভ করুন'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
