import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaOm, FaHandsHelping, FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

// Components
import HeroSlider from '../components/HeroSlider'
import GodsTicker from '../components/GodsTicker'
import AboutSection from '../components/AboutSection'
import FestivalBanner from '../components/FestivalBanner'
import CtaBanner from '../components/CtaBanner'
import DevotionalBanner2 from '../components/DevotionalBanner2'
import PujaSection from '../components/PujaSection'
import VolunteersSection from '../components/VolunteersSection'
import CommitteeSection from '../components/CommitteeSection'
import LiveBroadcastSection from '../components/LiveBroadcastSection'
import InstagramSection from '../components/InstagramSection'
import DeveloperSection from '../components/DeveloperSection'
import DonationCard from '../components/DonationCard'
import BlogCard from '../components/BlogCard'
import QuickDonateModal from '../components/QuickDonateModal'
import BookPujaModal from '../components/BookPujaModal'
import api from '../services/api'

// Fallback Authentic Data in Bengali Default
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
]

const MOCK_BLOGS = [
  {
    _id: '1',
    title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমীর শাশ্বত মাহাত্ম্য ও দিব্য লীলা রহস্য',
    excerpt: 'কংসের কারাগারে মধ্যরাতে শ্রীকৃষ্ণের আবির্ভাবের গভীর তাৎপর্য, ননী চুরি এবং রাসলীলার পারমার্থিক তত্ত্ব।',
    image: '/assets/img/blog/1.webp',
    author: 'আচার্য রাকেশ পাণ্ডে',
    authorAvatar: '/assets/img/people/1.webp',
    category: 'Festivals',
    createdAt: '2026-08-15',
  },
  {
    _id: '2',
    title: 'কর্ম ও ধর্মের রহস্য: শ্রীমদ্ভগবদ্গীতার মূল শিক্ষা',
    excerpt: 'ফলাকাঙ্ক্ষা বর্জন করে কীভাবে কর্তব্য কর্ম সম্পাদন করতে হয়। আধুনিক মানসিক চাপ ও উদ্বেগ থেকে মুক্তির চিরন্তন পথ।',
    image: '/assets/img/blog/2.webp',
    author: 'স্বামী য়েশ চোপড়া',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Vedic Philosophy',
    createdAt: '2026-08-08',
  },
  {
    _id: '3',
    title: 'ভোরবেলার মঙ্গল আরতি ও মহামন্ত্র জপের শক্তি',
    excerpt: 'ব্রাহ্মমুহূর্তে সূর্যোদয়ের পূর্বে ভগবৎ আরাধনায় মনঃসংযোগ ও আধ্যাত্মিক শক্তির জাগরণ ঘটে।',
    image: '/assets/img/blog/3.webp',
    author: 'পণ্ডিত মোহন দাস',
    authorAvatar: '/assets/img/people/1.webp',
    category: 'Sadhana',
    createdAt: '2026-07-28',
  },
]

export default function HomePage() {
  const { language } = useLanguage()
  const [donations, setDonations] = useState(MOCK_DONATIONS)
  const [blogs, setBlogs] = useState(MOCK_BLOGS)

  // Modals state
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [selectedCause, setSelectedCause] = useState(null)
  const [pujaModalOpen, setPujaModalOpen] = useState(false)
  const [selectedPuja, setSelectedPuja] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donRes, blogRes] = await Promise.allSettled([
          api.get('/api/donations?limit=3'),
          api.get('/api/blogs?limit=3'),
        ])
        if (donRes.status === 'fulfilled') {
          const list = donRes.value.data?.donations || (Array.isArray(donRes.value.data) ? donRes.value.data : [])
          if (list.length > 0) setDonations(list)
        }
        if (blogRes.status === 'fulfilled') {
          const list = blogRes.value.data?.blogs || (Array.isArray(blogRes.value.data) ? blogRes.value.data : [])
          if (list.length > 0) setBlogs(list)
        }
      } catch {
        // Fallback already set in Bengali
      }
    }
    fetchData()
  }, [])

  const handleOpenDonate = (cause) => {
    setSelectedCause(cause || null)
    setDonateModalOpen(true)
  }

  const handleOpenPuja = (puja) => {
    setSelectedPuja(puja || null)
    setPujaModalOpen(true)
  }

  return (
    <div className="w-full font-poppins">
      {/* 1. Hero Slider 1 (Ken Burns, particles, Lora typography, timer) */}
      <HeroSlider onDonateClick={() => handleOpenDonate(null)} />

      {/* 2. Gods Ticker Marquee (Infinite scroll strip) */}
      <GodsTicker />

      {/* 3. About Mandir Section (Dual image layout + 25+ years counter + 3 pillars) */}
      <AboutSection />

      {/* 4. Special Festival & Countdown Banner (Holi & Janmashtami Mahotsav) */}
      <FestivalBanner onBookPujaClick={() => handleOpenPuja(null)} />

      {/* 5. CTA Banner (Priest Hotline + Daily Darshan Newsletter) */}
      <CtaBanner />

      {/* 6. Donation Section ("Make a Donation to Help Community") */}
      <section className="py-20 lg:py-24 bg-white" aria-label="Temple Charitable Causes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-subtitle">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'মানবসেবায় অনুদান' : 'Donate To Help'}</span>
            </div>
            <h2 className="section-title">
              {language === 'bn' ? 'মানবকল্যাণ ও মন্দির সেবায় দান করুন' : 'Make a Donation to Help Community'}
            </h2>
            <p className="text-gray-500 text-sm">
              {language === 'bn'
                ? 'আপনার পবিত্র দান অসহায় মানুষের মাঝে অন্নদান, অনাথ শিশুদের বেদশিক্ষা এবং সনাতন ঐতিহ্য সংরক্ষণে ব্যবহৃত হয়।'
                : 'Your sacred contributions bring nourishment to the hungry, education to rural children, and preserve our divine heritage.'}
            </p>
          </div>

          {/* Donation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donations.map((donation) => (
              <DonationCard
                key={donation._id}
                donation={donation}
                onQuickDonate={handleOpenDonate}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/donations" className="btn-secondary">
              <FaHandsHelping />
              <span>{language === 'bn' ? 'সকল সেবা প্রকল্প দেখুন' : 'View All Seva Campaigns'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Gods Ticker Marquee 2 */}
      <GodsTicker />

      {/* 8. Mid-page Devotional Hero Banner 2 ("Train your mind as fiercely as your body") */}
      <DevotionalBanner2 />

      {/* 9. Gods Ticker Marquee 3 */}
      <GodsTicker />

      {/* 10. Sacred Puja & Ritual Services Section with Category Filters */}
      <PujaSection onBookPuja={handleOpenPuja} />

      {/* 11. Temple Priests & Acharyas Showcase */}
      <VolunteersSection />

      {/* 12. Mandir Executive Committee Board Showcase */}
      <CommitteeSection limit={6} />

      {/* 13. Live Broadcast, Aarti Schedule & Video Gallery */}
      <LiveBroadcastSection />

      {/* 13. News Feed & Vedic Wisdom Blog Section */}
      <section
        className="py-20 lg:py-24 bg-cover bg-center bg-fixed relative text-white"
        style={{ backgroundImage: `url('/assets/img/banner/s3.webp')` }}
        aria-label="Spiritual News Feed"
      >
        <div className="absolute inset-0 bg-temple-primary/94" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-temple-gold text-xs font-semibold uppercase tracking-[3px] mb-2">
              <FaOm />
              <span>{language === 'bn' ? 'বৈদিক ধর্মোপদেশ ও আলোচনা' : 'Vedic Teachings & Discourses'}</span>
            </div>
            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {language === 'bn' ? 'ধর্মকথা, সংবাদ ও আধ্যাত্মিক প্রবন্ধ' : 'News Feed & Spiritual Articles'}
            </h2>
            <p className="text-white/70 text-sm">
              {language === 'bn'
                ? 'শ্রীমদ্ভগবদ্গীতা, উপনিষদ এবং উৎসবসমূহের গভীর পারমার্থিক আলোচনা পাঠ করুন।'
                : 'Enrich your daily sadhana with discourses on the Bhagavad Gita, Upanishads, and temple festival celebrations.'}
            </p>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blog" className="kr-btn-custom-outline">
              <span>{language === 'bn' ? 'সকল ধর্মপ্রবন্ধ পড়ুন' : 'Read All Katha Articles'}</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* 14. Instagram Darshan Gallery Grid */}
      <InstagramSection />

      {/* 15. Lead Engineer & Web Architect Showcase */}
      <DeveloperSection />

      {/* ── Global Interactive Modals ── */}
      <QuickDonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        initialCause={selectedCause}
      />

      <BookPujaModal
        isOpen={pujaModalOpen}
        onClose={() => setPujaModalOpen(false)}
        puja={selectedPuja}
      />
    </div>
  )
}
