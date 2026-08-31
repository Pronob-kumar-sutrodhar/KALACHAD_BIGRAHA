import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import LoadingSpinner from '../components/LoadingSpinner'
import BookPujaModal from '../components/BookPujaModal'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import {
  FaCalendarAlt, FaMapMarkerAlt, FaFacebookF,
  FaTwitter, FaWhatsapp, FaLink, FaClock,
  FaUserCheck
} from 'react-icons/fa'
import toast from 'react-hot-toast'

const MOCK_EVENT = {
  _id: '1',
  title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমী ও ব্রজ রাস মহোৎসব',
  description: `শ্রী শ্রী কৃষ্ণ মহা মন্দিরে জন্মাষ্টমী হলো বছরের সর্বশ্রেষ্ঠ ও পরম আনন্দময় মহোৎসব। ভগবান শ্রীকৃষ্ণের আবির্ভাব তিথি উদযাপনে দেশ-বিদেশ থেকে সমবেত হন হাজারো ভক্তবৃন্দ।

উৎসবের প্রধান আকর্ষণসমূহ:
• ভোর ০৪:১৫ – মঙ্গল আরতি ও কলশ বন্দনা
• সকাল ০৯:০০ – ১০৮ কলশ পঞ্চামৃত ও গঙ্গাজল মহা অভিষেক
• দুপুর ১২:০০ – রাজভোগ নিবেদন ও মধ্যাহ্ন আরতি
• বিকাল ০৪:০০ – ব্রজলীলা নাটিকা ও আচার্যদের প্রবচন
• সন্ধ্যা ০৭:০০ – অখণ্ড হরিনাম সংকীর্তন ও ভজন
• মধ্যরাত ১২:০০ – মহা জন্মাষ্টমী আরতি, শঙ্খনাদ ও ৫৬ ভোগ মহাপ্রসাদ বিতরণ

সকল ভক্তকে সপরিবারে উপস্থিত হয়ে ভগবানের শ্রীপাদপদ্মে শ্রদ্ধাঞ্জলি নিবেদনের আহ্বান জানানো হচ্ছে।`,
  image: '/assets/img/banner/s1.webp',
  date: '2026-08-26T00:00:00.000Z',
  time: 'সকাল ১০:০০ – মধ্যরাত ১২:৩০',
  location: 'শ্রী শ্রী কৃষ্ণ মহা মন্দির • মূল গর্ভগৃহ ও প্রাঙ্গণ',
  category: 'Grand Festival',
  organizer: 'মন্দির মহোৎসব পরিষদ',
  priest: 'পণ্ডিত রাকেশ কুমার পাণ্ডে ও দল',
}

const UPCOMING_EVENTS = [
  { _id: '2', title: 'শ্রীমতী রাধারাণীর শুভ আবির্ভাব তিথি', date: '০৮ সেপ্টেম্বর, ২০২৬', image: '/assets/img/puja/2.webp', location: 'রাধা কৃষ্ণ নাটমন্দির' },
  { _id: '3', title: 'শ্রী গোবর্ধন অন্নকূট পূজা ও ১০০৮ পদ ভোগ', date: '২২ অক্টোবর, ২০২৬', image: '/assets/img/banner/s4.webp', location: 'অন্নকূট মণ্ডপ' },
  { _id: '4', title: 'দীপাবলি ও ১০,০০০ ঘৃত প্রদীপ মহোৎসব', date: '০১ নভেম্বর, ২০২৬', image: '/assets/img/puja/6.webp', location: 'মন্দির ঘাট ও প্রাঙ্গণ' },
]

export default function EventDetailPage() {
  const { id } = useParams()
  const { language } = useLanguage()
  const [event, setEvent] = useState(MOCK_EVENT)
  const [loading, setLoading] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/api/events/${id}`)
        if (data) setEvent(data)
      } catch {
        setEvent(MOCK_EVENT)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success(language === 'bn' ? 'উৎসবের লিঙ্ক কপি করা হয়েছে!' : 'Event link copied to clipboard!')
  }

  if (loading) return <LoadingSpinner />

  const dateObj = event?.date ? new Date(event.date) : new Date('2026-08-26')
  const dateFormatted = dateObj.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="w-full">
      <PageBanner
        title={event?.title || (language === 'bn' ? 'উৎসব বিবরণ' : 'Event Details')}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Divine Festival Schedule'}
        breadcrumb={[
          { label: language === 'bn' ? 'উৎসবসমূহ' : 'Events', href: '/events' },
          { label: event?.title || (language === 'bn' ? 'বিবরণ' : 'Details') },
        ]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Left (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="relative overflow-hidden aspect-[16/9] bg-temple-primary">
              <img
                src={event?.image || '/assets/img/banner/s1.webp'}
                alt={event?.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-temple-accent text-white text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 shadow-md">
                {event?.category || 'Grand Festival'}
              </span>
            </div>

            <div>
              <h1 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-bold text-temple-primary mb-3 leading-tight">
                {event?.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-y border-gray-100 py-3">
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-temple-accent" />
                  <span>{dateFormatted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaClock className="text-temple-accent" />
                  <span>{event?.time || '10:00 AM – 12:30 AM'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-temple-accent" />
                  <span>{event?.location}</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {event?.description}
            </div>

            {/* Share */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-700">
                {language === 'bn' ? 'উৎসবের তথ্য শেয়ার করুন:' : 'Share This Festival:'}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={handleCopyLink} className="p-2 bg-gray-100 hover:bg-temple-accent hover:text-white rounded-full text-xs transition-colors cursor-pointer" title="Copy Link"><FaLink /></button>
                <a href="#" className="p-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full text-xs transition-colors"><FaFacebookF /></a>
                <a href="#" className="p-2 bg-gray-100 hover:bg-sky-500 hover:text-white rounded-full text-xs transition-colors"><FaTwitter /></a>
                <a href="#" className="p-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-xs transition-colors"><FaWhatsapp /></a>
              </div>
            </div>
          </div>

          {/* Sidebar Right (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick RSVP Card */}
            <div className="bg-temple-primary text-white p-6 shadow-xl border-t-4 border-temple-gold space-y-4">
              <span className="text-temple-gold text-xs uppercase tracking-wider font-semibold block">
                {language === 'bn' ? 'উৎসব নিবন্ধন' : 'Festival Attendance'}
              </span>
              <h3 className="font-lora text-xl font-bold">
                {language === 'bn' ? 'আপনার উপস্থিতি ও সংকল্প নিশ্চিত করুন' : 'Join Sacred Celebrations'}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">
                {language === 'bn'
                  ? 'সকল ভক্তদের জন্য প্রবেশ ও মহাপ্রসাদ বিনামূল্যে। পূজা সংকল্পের জন্য আপনার নাম নিবন্ধন করুন।'
                  : 'Free entry and sanctified Mahaprasad for all devotees. Register to participate in the ceremonial Sankalp.'}
              </p>
              <button
                onClick={() => setRsvpOpen(true)}
                className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3"
              >
                <FaUserCheck className="text-xs" />
                <span>{language === 'bn' ? 'সংকল্পে অংশ নিন (বিনামূল্যে)' : 'Register RSVP Free'}</span>
              </button>
            </div>

            {/* Other Upcoming Events */}
            <div className="bg-white p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-lora text-lg font-bold text-temple-primary border-b border-gray-100 pb-2">
                {language === 'bn' ? 'অন্যান্য আসন্ন মহোৎসব' : 'More Upcoming Festivals'}
              </h3>
              <div className="space-y-4">
                {UPCOMING_EVENTS.map((ev) => (
                  <Link
                    key={ev._id}
                    to={`/events/${ev._id}`}
                    className="flex gap-3 items-center group"
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-14 h-14 object-cover shrink-0 bg-slate-100"
                    />
                    <div>
                      <h4 className="font-lora text-xs font-semibold text-gray-800 group-hover:text-temple-accent line-clamp-1">
                        {ev.title}
                      </h4>
                      <p className="text-[11px] text-gray-400">{ev.date} &bull; {ev.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <BookPujaModal
        isOpen={rsvpOpen}
        puja={{
          title: `${event?.title} (${language === 'bn' ? 'উপস্থিতি ও সংকল্প' : 'RSVP & Sankalp'})`,
          price: language === 'bn' ? 'বিনামূল্যে / ঐচ্ছিক' : 'Free / Optional',
        }}
        onClose={() => setRsvpOpen(false)}
      />
    </div>
  )
}
