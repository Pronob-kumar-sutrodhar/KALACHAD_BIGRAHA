import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaOm, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

export default function FestivalBanner({ onBookPujaClick }) {
  const { language } = useLanguage()

  // Countdown to next grand festival (Janmashtami Mahotsav)
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 22,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-fixed text-white overflow-hidden"
      style={{ backgroundImage: `url('/assets/img/banner/s1.webp')` }}
      aria-label="Grand Festival Mahotsav"
    >
      {/* Deep teal/burgundy devotional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-temple-primary/95 via-temple-primary/88 to-temple-dark/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Text Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-temple-accent/40 text-temple-gold px-4 py-1.5 border border-temple-accent/60 text-xs uppercase tracking-[3px] font-semibold">
              <FaOm className="text-xs" />
              <span>{language === 'bn' ? 'আসন্ন মহোৎসব' : 'Upcoming Grand Mahotsav'}</span>
            </div>

            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {language === 'bn'
                ? 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমী ও ব্রজ রাস মহোৎসব'
                : 'Shri Krishna Janmashtami & Braj Holi Mahotsav'}
            </h2>

            <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
              {language === 'bn'
                ? 'ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথিতে ৩ দিনব্যাপী অখণ্ড হরিনাম সংকীর্তন, ১০৮ কলশ মহা অভিষেক, মধ্যরাত মহা আরতি ও ৫৬ ভোগ মহাপ্রসাদ বিতরণ মহোৎসবে আপনারা সপরিবারে আমন্ত্রিত।'
                : 'Join thousands of devotees for 3 days of blissful 24-hour Akhand Harinam Sankirtan, 108 Kalash Maha Abhishekam, midnight Aarti, and grand 56 Bhog Mahaprasad distribution.'}
            </p>

            <div className="flex flex-wrap gap-6 pt-2 text-xs sm:text-sm text-white/90">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-temple-gold" />
                <span>{language === 'bn' ? '২৬ – ২৮ আগস্ট, ২০২৬' : 'Aug 26 – Aug 28, 2026'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-temple-gold" />
                <span>{language === 'bn' ? 'মধ্যরাত মহা আরতি রাত ১২:০০ টায়' : 'Midnight Maha Aarti @ 12:00 AM'}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onBookPujaClick}
                className="kr-btn-custom"
              >
                {language === 'bn' ? 'উৎসব সংকল্প বুক করুন' : 'Book Festival Sankalp'}
              </button>
              <Link
                to="/events/1"
                className="kr-btn-custom-outline"
              >
                {language === 'bn' ? 'উৎসবের সময়সূচী ও বিবরণ' : 'Event Schedule & Details'}
              </Link>
            </div>
          </div>

          {/* Right: Countdown Box */}
          <div className="lg:col-span-5">
            <div className="bg-black/40 border border-white/20 p-8 text-center backdrop-blur-md shadow-2xl">
              <h3 className="font-lora text-xl font-bold text-temple-gold mb-6 uppercase tracking-wider">
                {language === 'bn' ? 'মহোৎসব কাউন্টডাউন' : 'Festival Countdown'}
              </h3>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-temple-primary/80 border border-white/10 p-3">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'দিন' : 'Days'}
                  </span>
                </div>

                <div className="bg-temple-primary/80 border border-white/10 p-3">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'ঘণ্টা' : 'Hours'}
                  </span>
                </div>

                <div className="bg-temple-primary/80 border border-white/10 p-3">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'মিনিট' : 'Mins'}
                  </span>
                </div>

                <div className="bg-temple-primary/80 border border-white/10 p-3">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'সেকেন্ড' : 'Secs'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 text-xs text-white/75 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                <span>{language === 'bn' ? 'সকল ভক্তের জন্য উন্মুক্ত ও মহাপ্রসাদ বিতরণ' : 'Free Entry for All Devotees • Prasad Included'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
