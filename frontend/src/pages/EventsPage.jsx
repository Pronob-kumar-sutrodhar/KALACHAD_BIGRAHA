import { useState, useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import EventCard from '../components/EventCard'
import LoadingSpinner from '../components/LoadingSpinner'
import BookPujaModal from '../components/BookPujaModal'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { FaOm } from 'react-icons/fa'

const MOCK_EVENTS = [
  {
    _id: '1',
    title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমী ও ব্রজ রাস মহোৎসব',
    description: 'বছরের সর্বশ্রেষ্ঠ মহোৎসব! ৩ দিনব্যাপী ১০৮ কলশ মহা অভিষেক, মধ্যরাত মহা আরতি ও ৫৬ ভোগ মহাপ্রসাদ বিতরণ।',
    image: '/assets/img/banner/s1.webp',
    date: '2026-08-26T00:00:00.000Z',
    time: 'সকাল ১০:০০ – মধ্যরাত ১২:৩০',
    location: 'মূল গর্ভগৃহ ও মন্দির প্রাঙ্গণ',
    category: 'Grand Festival',
  },
  {
    _id: '2',
    title: 'শ্রীমতী রাধারাণীর শুভ আবির্ভাব তিথি মহোৎসব',
    description: 'শ্রীমতী রাধারাণীর পরম কৃপা ও ভক্তি প্রার্থনায় পুষ্পাঞ্জলি অভিষেক, ভজন ও সংকীর্তন মহোৎসব।',
    image: '/assets/img/puja/2.webp',
    date: '2026-09-08T00:00:00.000Z',
    time: 'বিকাল ০৪:৩০ – রাত ০৯:০০',
    location: 'রাধা কৃষ্ণ নাটমন্দির',
    category: 'Devotional Festival',
  },
  {
    _id: '3',
    title: 'শ্রী গোবর্ধন অন্নকূট পূজা ও ১০০৮ পদ নিবেদন',
    description: 'ভগবান শ্রীকৃষ্ণের গোবর্ধন পর্বত ধারণ স্মরণে পর্বতাকৃতির সুস্বাদু অন্ন ও ব্যঞ্জন ভোগ নিবেদন ও গো-পূজা।',
    image: '/assets/img/banner/s4.webp',
    date: '2026-10-22T00:00:00.000Z',
    time: 'সকাল ১১:০০ – দুপুর ০৩:০০',
    location: 'অন্নকূট মণ্ডপ',
    category: 'Annakut Puja',
  },
  {
    _id: '4',
    title: 'দীপাবলি ও ১০,০০০ পবিত্র ঘৃত প্রদীপ মহোৎসব',
    description: 'পবিত্র কার্তিক মাসে মন্দির প্রাঙ্গণে ১০ হাজার মাটির প্রদীপ প্রজ্বালন ও দামোদরাষ্টকম স্তোত্র পাঠ।',
    image: '/assets/img/puja/6.webp',
    date: '2026-11-01T00:00:00.000Z',
    time: 'সন্ধ্যা ০৬:০০ – রাত ০৯:৩০',
    location: 'মন্দির ঘাট ও প্রাঙ্গণ',
    category: 'Deepotsav',
  },
  {
    _id: '5',
    title: 'গীতা জয়ন্তী আন্তর্জাতিক শাস্ত্র সম্মেলন',
    description: 'শ্রীমদ্ভগবদ্গীতার ৭০০ শ্লোক সম্মিলিত আবৃত্তি এবং বাস্তব জীবনে প্রয়োগ বিষয়ক আলোচনা।',
    image: '/assets/img/banner/s3.webp',
    date: '2026-12-11T00:00:00.000Z',
    time: 'সকাল ০৯:০০ – বিকাল ০৫:০০',
    location: 'বৈদিক মিলনায়তন',
    category: 'Gita Seminar',
  },
  {
    _id: '6',
    title: 'মহা শিবরাত্রি অখণ্ড রুদ্রাভিষেক',
    description: 'সারারাতব্যাপী চার প্রহর রুদ্রাভিষেক, বিল্বপত্র অর্পণ ও মহামৃত্যুঞ্জয় জপ মহাযজ্ঞ।',
    image: '/assets/img/puja/5.webp',
    date: '2027-02-18T00:00:00.000Z',
    time: 'সন্ধ্যা ০৬:০০ – পরদিন ভোর ০৬:০০',
    location: 'শিব মন্দির ও যজ্ঞশালা',
    category: 'Maha Shivratri',
  },
]

export default function EventsPage() {
  const { language } = useLanguage()
  const [events, setEvents] = useState(MOCK_EVENTS)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [registerEvent, setRegisterEvent] = useState(null)

  const categories = language === 'bn'
    ? [
        { key: 'All', label: 'সকল মহোৎসব' },
        { key: 'Grand Festival', label: 'মহোৎসব' },
        { key: 'Devotional Festival', label: 'ভক্তি উৎসব' },
        { key: 'Annakut Puja', label: 'অন্নকূট' },
        { key: 'Deepotsav', label: 'দীপাবলি' },
      ]
    : [
        { key: 'All', label: 'All Festivals' },
        { key: 'Grand Festival', label: 'Grand Festivals' },
        { key: 'Devotional Festival', label: 'Devotional' },
        { key: 'Annakut Puja', label: 'Annakut' },
        { key: 'Deepotsav', label: 'Deepotsav' },
      ]

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/api/events')
        if (data && data.events && data.events.length > 0) {
          setEvents(data.events)
        } else if (Array.isArray(data) && data.length > 0) {
          setEvents(data)
        } else {
          setEvents(MOCK_EVENTS)
        }
      } catch {
        setEvents(MOCK_EVENTS)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filtered =
    selectedCategory === 'All'
      ? events
      : events.filter((e) => e.category === selectedCategory)

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'উৎসব ও ধর্মীয় অনুষ্ঠান সময়সূচী' : 'Sacred Festivals & Calendar'}
        subtitle={language === 'bn' ? 'ভগবানের দিব্য উৎসব দর্শন' : 'Celebrate Transcendental Leelas'}
        breadcrumb={[{ label: language === 'bn' ? 'উৎসবসমূহ' : 'Events' }]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header & Filter Chips */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="section-subtitle md:justify-start">
                <FaOm className="text-sm" />
                <span>{language === 'bn' ? 'বাৎসরিক উৎসব পঞ্চিকা' : 'Festival Calendar'}</span>
              </div>
              <h2 className="section-title mb-0">
                {language === 'bn' ? 'আসন্ন শ্রীকৃষ্ণ মহোৎসব ও অনুষ্ঠান' : 'Upcoming Auspicious Mahotsav'}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`font-lora text-xs sm:text-sm px-4 py-2 uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-temple-primary text-temple-gold shadow-md'
                      : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-temple-accent border border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event) => (
                <EventCard
                  key={event._id || event.id}
                  event={event}
                  onRegister={(ev) => setRegisterEvent(ev)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Book Puja / RSVP Modal */}
      <BookPujaModal
        isOpen={Boolean(registerEvent)}
        puja={{
          title: registerEvent ? `${registerEvent.title} (${language === 'bn' ? 'উপস্থিতি ও সংকল্প' : 'RSVP & Sankalp'})` : '',
          price: language === 'bn' ? 'বিনামূল্যে / ঐচ্ছিক দক্ষিণা' : 'Free / Optional Dakshina',
        }}
        onClose={() => setRegisterEvent(null)}
      />
    </div>
  )
}
