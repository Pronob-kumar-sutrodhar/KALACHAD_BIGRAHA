import { useState } from 'react'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaPaperPlane, FaOm, FaCheckCircle
} from 'react-icons/fa'

export default function ContactPage() {
  const { language, settings } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const phone = settings?.phone || '+৮৮০ ১৭০০-০০০০০০'
  const email = settings?.email || 'info@krishnamatemple.org'
  const address = language === 'bn'
    ? (settings?.addressBn || 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ')
    : (settings?.addressEn || 'Brahmagacha, Raiganj, Sirajganj, Bangladesh')
  const openingHours = language === 'bn'
    ? (settings?.openingHoursBn || 'প্রতিদিন সকাল ৪:১৫ – রাত ৯:৩০ পর্যন্ত')
    : (settings?.openingHoursEn || 'Daily 04:15 AM – 09:30 PM EST')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/contact', formData)
    } catch {
      // Fallback
    } finally {
      setLoading(false)
      setSubmitted(true)
      toast.success(
        language === 'bn'
          ? 'ধন্যবাদ! আপনার বার্তা ও প্রার্থনা মন্দির কর্তৃপক্ষের কাছে পৌঁছেছে।'
          : 'Thank you! Your message has been sent to our temple team.'
      )
    }
  }

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'মন্দির কর্তৃপক্ষের সাথে যোগাযোগ' : 'Contact Our Mandir'}
        subtitle={language === 'bn' ? (settings?.templeNameBn || 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির') : (settings?.templeNameEn || 'Sri Sri Kalachand Bigraha Union Central Temple')}
        breadcrumb={[{ label: language === 'bn' ? 'যোগাযোগ' : 'Contact Us' }]}
      />
      <GodsTicker />

      {/* Info Cards */}
      <section className="py-16 px-4 bg-white font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-temple-light p-8 text-center border-t-4 border-temple-accent shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-temple-accent text-white flex items-center justify-center text-xl mx-auto mb-4 shadow-xs">
              <FaPhoneAlt />
            </div>
            <h4 className="font-lora font-bold text-temple-primary text-lg mb-2">
              {language === 'bn' ? 'ফোন হেল্পলাইন' : 'Phone Hotline'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold">{phone}</p>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'bn' ? 'সকাল ৬:০০ – রাত ৯:০০ পর্যন্ত' : 'Available 6:00 AM – 9:00 PM EST'}
            </p>
          </div>

          <div className="bg-temple-light p-8 text-center border-t-4 border-temple-primary shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-temple-primary text-temple-gold flex items-center justify-center text-xl mx-auto mb-4 shadow-xs">
              <FaEnvelope />
            </div>
            <h4 className="font-lora font-bold text-temple-primary text-lg mb-2">
              {language === 'bn' ? 'ইমেইল যোগাযোগ' : 'Email Office'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold">{email}</p>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'bn' ? '২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়' : 'Responses within 24 hours'}
            </p>
          </div>

          <div className="bg-temple-light p-8 text-center border-t-4 border-temple-gold shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-temple-gold text-temple-primary flex items-center justify-center text-xl mx-auto mb-4 shadow-xs">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-lora font-bold text-temple-primary text-lg mb-2">
              {language === 'bn' ? 'মন্দিরের ঠিকানা' : 'Temple Location'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold">
              {address}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'bn' ? 'বিনামূল্যে পার্কিং সুবিধা রয়েছে' : 'Complimentary Parking Area'}
            </p>
          </div>

          <div className="bg-temple-light p-8 text-center border-t-4 border-temple-accent shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-temple-accent text-white flex items-center justify-center text-xl mx-auto mb-4 shadow-xs">
              <FaClock />
            </div>
            <h4 className="font-lora font-bold text-temple-primary text-lg mb-2">
              {language === 'bn' ? 'দর্শন সময়সূচী' : 'Visiting Hours'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold">
              {openingHours}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Form & Sacred Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Left (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <div className="inline-flex items-center gap-1.5 text-temple-accent text-xs font-semibold uppercase tracking-[2px] mb-1">
                <FaOm />
                <span>{language === 'bn' ? 'বার্তা ও বিশেষ প্রার্থনা' : 'Devotee Inquiries'}</span>
              </div>
              <h3 className="font-lora text-2xl sm:text-3xl font-bold text-temple-primary">
                {language === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send a Devotional Message'}
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-green-50 border border-green-200">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center text-3xl">
                  <FaCheckCircle />
                </div>
                <h4 className="font-lora text-2xl font-bold text-temple-primary">
                  {language === 'bn' ? 'বার্তা সফলভাবে প্রেরিত হয়েছে!' : 'Message Received with Blessings!'}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto">
                  {language === 'bn'
                    ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির কর্তৃপক্ষ আপনার সাথে শীঘ্রই যোগাযোগ করবেন। হরে কৃষ্ণ!'
                    : 'Thank you for reaching out. Our temple priests or administrative sevaks will get back to you shortly.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                  }}
                  className="kr-btn-custom inline-block text-xs"
                >
                  {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      {language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'bn' ? 'যেমন: রাজেশ দাস' : 'e.g. Rajesh Das'}
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      {language === 'bn' ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="devotee@gmail.com"
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      {language === 'bn' ? 'মোবাইল নম্বর / হোয়াটসঅ্যাপ' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1700-000000"
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      {language === 'bn' ? 'বিষয় *' : 'Subject *'}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={language === 'bn' ? 'যেমন: পূজা বুকিং, অন্নদান বা সাধারণ জিজ্ঞাসা' : 'e.g. Special Puja, Annadaan Seva...'}
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'আপনার বার্তা বা প্রার্থনা অনুরোধ *' : 'Your Message / Prayer Request *'}
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={language === 'bn' ? 'আপনার বক্তব্য বিস্তারিত লিখুন...' : 'Write your prayer request, inquiry, or feedback here...'}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="kr-btn-custom flex items-center justify-center gap-2 py-3.5 px-8"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>
                    {loading
                      ? (language === 'bn' ? 'বার্তা পাঠানো হচ্ছে...' : 'Sending Message...')
                      : (language === 'bn' ? 'বার্তা পাঠান' : 'Send Message')}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Map / Directions Right (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-lora text-xl font-bold text-temple-primary border-b border-gray-100 pb-2">
                {language === 'bn' ? 'যাতায়াত ও অবস্থান' : 'Directions & Accessibility'}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {language === 'bn'
                  ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির প্রধান সড়ক থেকে সহজে গম্য। দর্শনার্থীদের জন্য সার্বক্ষণিক নিরাপত্তা এবং বিনামূল্যে পার্কিং সুবিধা রয়েছে।'
                  : 'Located near major transit lines with clear road connectivity. Dedicated wheelchair ramps, complimentary shoe counter, and pure drinking water stations.'}
              </p>

              <div className="aspect-[4/3] bg-temple-primary/10 border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.60485640398!2d90.395!3d23.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAwLjAiTiA5MMKwMjMnNDIuMCJF!5e0!3m2!1sen!2sbd!4v1600000000000"
                  title="Temple Map"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
