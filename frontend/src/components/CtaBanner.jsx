import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'

export default function CtaBanner() {
  const [email, setEmail] = useState('')
  const { language } = useLanguage()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error(language === 'bn' ? 'সঠিক ইমেইল ঠিকানা প্রদান করুন' : 'Please enter a valid email address')
      return
    }
    toast.success(
      language === 'bn'
        ? 'ধন্যবাদ! আপনি দৈনিক দর্শন ও মন্দির সংবাদে নিবন্ধিত হয়েছেন।'
        : 'Thank you! You have subscribed to daily darshan and temple announcements.'
    )
    setEmail('')
  }

  return (
    <section className="bg-temple-light py-12 font-poppins" aria-label="Temple Hotline & Newsletter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 shadow-xl overflow-hidden">
          {/* Left CTA: Priest Hotline */}
          <div className="lg:col-span-6 bg-temple-primary text-white p-8 sm:p-10 flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="w-16 h-16 bg-temple-accent shrink-0 flex items-center justify-center text-white text-2xl shadow-md">
              <FaPhoneAlt className="animate-bounce" />
            </div>
            <div>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[2px] text-temple-gold block mb-1">
                {language === 'bn' ? 'আধ্যাত্মিক পরামর্শ ও পূজা বুকিং হেল্পলাইন' : 'Need Spiritual Guidance & Puja Booking?'}
              </span>
              <a
                href="tel:+8801700000000"
                className="font-lora text-2xl sm:text-3xl font-bold text-white hover:text-temple-gold transition-colors block"
              >
                +৮৮০ ১৭০০-০০০০০০
              </a>
              <p className="text-white/65 text-xs mt-1">
                {language === 'bn' ? 'প্রতিদিন সকাল ৬:০০ – রাত ৯:০০ পর্যন্ত পূজারীগণ উপলব্ধ' : 'Temple Priests Available Daily: 6:00 AM – 9:00 PM EST'}
              </p>
            </div>
          </div>

          {/* Right CTA: Daily Darshan Newsletter */}
          <div className="lg:col-span-6 bg-temple-accent text-white p-8 sm:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-temple-gold text-xs uppercase tracking-[2px] font-semibold mb-1">
              <FaEnvelope />
              <span>{language === 'bn' ? 'নিত্য দর্শন ও মন্দির বুলেটিন' : 'Temple Newsletter & Daily Darshan'}</span>
            </div>
            <h4 className="font-lora text-xl sm:text-2xl font-bold text-white mb-4">
              {language === 'bn' ? 'প্রতিদিনের শৃঙ্গার দর্শন ও ধর্মকথা পেতে যুক্ত থাকুন' : 'Receive Daily Shringar & Katha Alerts'}
            </h4>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'bn' ? 'আপনার ইমেইল ঠিকানা লিখুন...' : 'Enter your email address...'}
                className="flex-1 bg-white px-4 py-3 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-temple-gold"
                required
              />
              <button
                type="submit"
                className="bg-temple-primary hover:bg-slate-900 text-white font-lora text-xs uppercase tracking-wider font-semibold px-6 py-3 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>{language === 'bn' ? 'যুক্ত হোন' : 'Subscribe'}</span>
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
