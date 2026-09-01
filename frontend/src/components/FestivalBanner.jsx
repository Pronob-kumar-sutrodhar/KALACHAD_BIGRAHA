import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaOm, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

export default function FestivalBanner({ onBookPujaClick }) {
  const { language } = useLanguage()
  const [event, setEvent] = useState(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Fetch upcoming festival event from database
  useEffect(() => {
    let isMounted = true
    api.get('/api/events')
      .then((res) => {
        if (!isMounted) return
        const list = res.data?.events || (Array.isArray(res.data) ? res.data : [])
        if (list.length > 0) {
          const now = Date.now()
          // Look for upcoming events
          const futureEvents = list.filter((e) => new Date(e.date).getTime() > now)
          if (futureEvents.length > 0) {
            // Sort by earliest date
            futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
            setEvent(futureEvents[0])
          } else {
            // Pick the first event if none in future
            setEvent(list[0])
          }
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  // Calculate live countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      if (!event?.date) {
        // Fallback calculation (e.g. 15 days ahead)
        const defaultTarget = new Date()
        defaultTarget.setDate(defaultTarget.getDate() + 15)
        const diff = Math.max(0, defaultTarget.getTime() - Date.now())
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
        return
      }

      let targetTime = new Date(event.date).getTime()
      const now = Date.now()
      let diff = targetTime - now

      // If event date has passed, roll it to next recurring cycle or show active
      if (diff <= 0) {
        // Add 30 days ahead from today for continuous devotional excitement
        const rolledDate = new Date(now + 24 * 60 * 60 * 1000 * 18)
        diff = rolledDate.getTime() - now
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [event])

  const title = event?.title || (
    language === 'bn'
      ? 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমী ও ব্রজ রাস মহোৎসব'
      : 'Shri Krishna Janmashtami & Braj Mahotsav'
  )

  const description = event?.description || (
    language === 'bn'
      ? 'ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথিতে ৩ দিনব্যাপী অখণ্ড হরিনাম সংকীর্তন, ১০৮ কলশ মহা অভিষেক, মধ্যরাত মহা আরতি ও ৫৬ ভোগ মহাপ্রসাদ বিতরণ মহোৎসবে আপনারা সপরিবারে আমন্ত্রিত।'
      : 'Join thousands of devotees for blissful Akhand Harinam Sankirtan, 108 Kalash Maha Abhishekam, midnight Aarti, and grand 56 Bhog Mahaprasad distribution.'
  )

  const time = event?.time || (
    language === 'bn' ? 'সকাল ১০:০০ – মধ্যরাত ১২:৩০' : '10:00 AM – 12:30 AM'
  )

  const location = event?.location || (
    language === 'bn' ? 'মূল গর্ভগৃহ ও মন্দির প্রাঙ্গণ' : 'Main Mandir Sanctum'
  )

  const bgImage = event?.image || '/assets/img/banner/s1.webp'
  const eventLink = event?._id ? `/events/${event._id}` : '/events'

  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : (language === 'bn' ? '২৬ – ২৮ আগস্ট, ২০২৬' : 'Aug 26 – Aug 28, 2026')

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-fixed text-white overflow-hidden"
      style={{ backgroundImage: `url('${bgImage}')` }}
      aria-label="Grand Festival Mahotsav"
    >
      {/* Devotional burgundy/teal gradient overlay */}
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
              {title}
            </h2>

            <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-6 pt-2 text-xs sm:text-sm text-white/90">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-temple-gold shrink-0" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-temple-gold shrink-0" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-temple-gold shrink-0" />
                <span>{location}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onBookPujaClick}
                className="kr-btn-custom cursor-pointer"
              >
                {language === 'bn' ? 'উৎসব সংকল্প বুক করুন' : 'Book Festival Sankalp'}
              </button>
              <Link
                to={eventLink}
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
                <div className="bg-temple-primary/80 border border-white/10 p-3 rounded-xs">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'দিন' : 'Days'}
                  </span>
                </div>

                <div className="bg-temple-primary/80 border border-white/10 p-3 rounded-xs">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'ঘণ্টা' : 'Hours'}
                  </span>
                </div>

                <div className="bg-temple-primary/80 border border-white/10 p-3 rounded-xs">
                  <span className="font-lora text-2xl sm:text-4xl font-bold text-white block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-white/70 block mt-1">
                    {language === 'bn' ? 'মিনিট' : 'Mins'}
                  </span>
                </div>

                <div className="bg-temple-primary/80 border border-white/10 p-3 rounded-xs">
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
                <span>
                  {language === 'bn'
                    ? 'সকল ভক্তের জন্য উন্মুক্ত ও মহাপ্রসাদ বিতরণ'
                    : 'Free Entry for All Devotees • Prasad Included'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
