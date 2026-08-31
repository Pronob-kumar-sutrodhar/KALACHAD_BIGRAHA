import { useState, useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import DonationCard from '../components/DonationCard'
import LoadingSpinner from '../components/LoadingSpinner'
import QuickDonateModal from '../components/QuickDonateModal'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { FaOm, FaShieldAlt, FaReceipt, FaUsers } from 'react-icons/fa'

const MOCK_DONATIONS = [
  {
    _id: '1',
    title: 'শিশু সুরক্ষা ও বৈদিক বিদ্যালয় তহবিল',
    description: 'গ্রামাঞ্চলের অনাথ ও দরিদ্র শিশুদের বিনামূল্যে বেদশিক্ষা, সাধারণ শিক্ষা, বাসস্থান ও পুষ্টিকর মহাপ্রসাদ প্রদান।',
    image: '/assets/img/donation/5.webp',
    category: 'Vedic Education',
    raised: 520000,
    goal: 850000,
  },
  {
    _id: '2',
    title: 'অন্নদান সেবা — প্রতিদিন ১৫০০+ ভক্তের মহাপ্রসাদ',
    description: 'মন্দিরে আগত ভক্ত, তীর্থযাত্রী ও অসহায় মানুষদের মাঝে প্রতিদিন গরম খিচুড়ি, ডাল, সবজি ও প্রসাদ বিতরণ।',
    image: '/assets/img/donation/6.webp',
    category: 'Annadaan Seva',
    raised: 410000,
    goal: 600000,
  },
  {
    _id: '3',
    title: 'মন্দির সংস্কার ও দেশীয় গৌশালা সেবা',
    description: 'প্রাচীন গর্ভগৃহ সংরক্ষণ, মার্বেল খোদাই এবং ২০০+ দেশীয় গোমাতার আজীবন সেবা ও ঘাস-ভুসি সরবরাহ।',
    image: '/assets/img/donation/7.webp',
    category: 'Mandir & Gaushala',
    raised: 780000,
    goal: 1000000,
  },
  {
    _id: '4',
    title: 'গীতা জয়ন্তী বিনামূল্যে শাস্ত্র বিতরণ সেবা',
    description: 'স্কুল, কলেজ ও কারাগারে নৈতিক মূল্যবোধ ও আধ্যাত্মিক চেতনায় শ্রীমদ্ভগবদ্গীতা গ্রন্থ বিতরণ।',
    image: '/assets/img/banner/s3.webp',
    category: 'Scripture Seva',
    raised: 150000,
    goal: 250000,
  },
  {
    _id: '5',
    title: 'সাধু, বৈষ্ণব ও পূজারী কল্যাণ তহবিল',
    description: 'মন্দিরের আজীবন সেবায় নিবেদিত বয়স্ক সাধু ও পূজারীদের চিকিৎসা, বাসস্থান ও কল্যাণ ভাতা।',
    image: '/assets/img/volunteers/4.webp',
    category: 'Sevak Welfare',
    raised: 280000,
    goal: 400000,
  },
  {
    _id: '6',
    title: 'তীর্থযাত্রী অতিথিশালা ও ছাত্রাবাস নির্মাণ',
    description: 'দূরদূরান্ত থেকে আগত ভক্ত ও দর্শনার্থীদের জন্য আধুনিক ও স্বাস্থ্যকর বিনামূল্যে থাকার ব্যবস্থা।',
    image: '/assets/img/banner/s4.webp',
    category: 'Pilgrim Seva',
    raised: 620000,
    goal: 1200000,
  },
]

export default function DonationsPage() {
  const { language, formatMoney } = useLanguage()
  const [donations, setDonations] = useState(MOCK_DONATIONS)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [donateModalCause, setDonateModalCause] = useState(null)

  const categories = language === 'bn'
    ? [
        { key: 'All', label: 'সকল সেবা তহবিল' },
        { key: 'Annadaan Seva', label: 'অন্নদান সেবা' },
        { key: 'Vedic Education', label: 'বৈদিক বিদ্যালয়' },
        { key: 'Mandir & Gaushala', label: 'গৌশালা ও মন্দির' },
        { key: 'Scripture Seva', label: 'শাস্ত্র বিতরণ' },
      ]
    : [
        { key: 'All', label: 'All Causes' },
        { key: 'Annadaan Seva', label: 'Annadaan' },
        { key: 'Vedic Education', label: 'Vedic Education' },
        { key: 'Mandir & Gaushala', label: 'Gaushala & Mandir' },
        { key: 'Scripture Seva', label: 'Scripture Seva' },
      ]

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/api/donations')
        if (data && data.donations && data.donations.length > 0) {
          setDonations(data.donations)
        } else if (Array.isArray(data) && data.length > 0) {
          setDonations(data)
        } else {
          setDonations(MOCK_DONATIONS)
        }
      } catch {
        setDonations(MOCK_DONATIONS)
      } finally {
        setLoading(false)
      }
    }
    fetchDonations()
  }, [])

  const filtered =
    activeCategory === 'All'
      ? donations
      : donations.filter((d) => d.category === activeCategory)

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ সেবা ও অন্নদান তহবিল' : 'Devotional Seva & Donations'}
        subtitle={language === 'bn' ? 'মানবসেবাই পরম ধর্ম' : 'Sacred Causes for Social Upliftment'}
        breadcrumb={[{ label: language === 'bn' ? 'সেবা দান' : 'Donations' }]}
      />
      <GodsTicker />

      {/* Trust & Exemption Badges */}
      <section className="py-12 bg-white border-b border-gray-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 bg-orange-50 text-temple-accent flex items-center justify-center text-xl shadow-xs">
                <FaReceipt />
              </div>
              <h4 className="font-lora font-bold text-temple-primary text-base">
                {language === 'bn' ? '১০০% আয়কর ছাড় প্রাপ্ত' : '80G Tax Exemption Certified'}
              </h4>
              <p className="text-gray-500 text-xs">
                {language === 'bn' ? 'প্রতিটি অনুদানে তাৎক্ষণিক অফিশিয়াল ৮-জি সার্টিফিকেট ও রসিদ।' : 'All donations qualify for 100% tax deduction with instant receipts.'}
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 bg-orange-50 text-temple-accent flex items-center justify-center text-xl shadow-xs">
                <FaShieldAlt />
              </div>
              <h4 className="font-lora font-bold text-temple-primary text-base">
                {language === 'bn' ? 'স্বচ্ছ ও সরাসরি বিতরণ' : 'Direct & Transparent Impact'}
              </h4>
              <p className="text-gray-500 text-xs">
                {language === 'bn' ? 'আপনার অনুদান সরাসরি অন্নদান রান্নাঘর ও শিশুদের শিক্ষায় ব্যবহৃত হয়।' : 'Funds directly support meals, school books, and cow fodder daily.'}
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 bg-orange-50 text-temple-accent flex items-center justify-center text-xl shadow-xs">
                <FaUsers />
              </div>
              <h4 className="font-lora font-bold text-temple-primary text-base">
                {language === 'bn' ? '১০,০০০+ নিয়মিত ভক্ত ও দাতা' : 'Over 10,000+ Active Donors'}
              </h4>
              <p className="text-gray-500 text-xs">
                {language === 'bn' ? 'বিশ্বজুড়ে ধর্মপ্রাণ ভক্তদের সম্মিলিত প্রচেষ্টায় আমাদের সেবা কার্যক্রম।' : 'Join our global community of compassionate sevaks.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Causes Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`font-lora text-xs sm:text-sm px-5 py-2.5 uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-temple-primary text-temple-gold shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-temple-accent border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((donation) => (
                <DonationCard
                  key={donation._id}
                  donation={donation}
                  onQuickDonate={(cause) => setDonateModalCause(cause)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Donate Modal */}
      <QuickDonateModal
        isOpen={Boolean(donateModalCause)}
        initialCause={donateModalCause}
        onClose={() => setDonateModalCause(null)}
      />
    </div>
  )
}
