import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import VolunteersSection from '../components/VolunteersSection'
import InstagramSection from '../components/InstagramSection'
import { useLanguage } from '../context/LanguageContext'
import {
  FaHandHoldingHeart, FaHeart, FaBookOpen,
  FaPrayingHands, FaChevronRight, FaOm,
  FaClock
} from 'react-icons/fa'

const VALUES_DATA = [
  {
    Icon: FaPrayingHands,
    titleBn: 'ভক্তি ও সমর্পণ',
    titleEn: 'Bhakti & Devotion',
    descBn: 'শ্রী শ্রী রাধাকৃষ্ণের চরণে শর্তহীন প্রেম ও পরম আত্মনিবেদনই অন্তরের চিরন্তন শান্তির পথ।',
    descEn: 'Unwavering love and complete surrender to Shri Radha Krishna as the supreme pathway to inner peace.',
  },
  {
    Icon: FaHandHoldingHeart,
    titleBn: 'নিষ্কাম সেবা ও অন্নদান',
    titleEn: 'Nishkama Seva',
    descBn: 'নিঃস্বার্থ মানবসেবা — প্রতিদিনের অন্নদান, দরিদ্র শিশুদের শিক্ষা এবং চিকিৎসার মাধ্যমে ঈশ্বরের সেবা।',
    descEn: 'Selfless humanitarian service — daily Annadaan, medical camps, and helping the underprivileged.',
  },
  {
    Icon: FaBookOpen,
    titleBn: 'বৈদিক জ্ঞান ও গীতা পাঠ',
    titleEn: 'Vedic Wisdom',
    descBn: 'শ্রীমদ্ভগবদ্গীতা, শ্রীমদ্ভাগবতম ও উপনিষদের গভীর পাঠ ও মননশীল চিন্তার মাধ্যমে আত্মজ্ঞান লাভ।',
    descEn: 'Deep study and daily contemplation of the Bhagavad Gita, Srimad Bhagavatam, and Upanishads.',
  },
  {
    Icon: FaHeart,
    titleBn: 'সর্বভূতে দয়া ও অহিংসা',
    titleEn: 'Universal Compassion',
    descBn: 'সমস্ত জীবের প্রতি দয়াভাব (অহিংসা) এবং দেশীয় গোমাতার আজীবন সুরক্ষা ও গৌশালা সেবা।',
    descEn: 'Reverence and loving kindness towards all living entities (Ahimsa) and protection of sacred cows.',
  },
]

const DARSHAN_TIMINGS_DATA = [
  { aartiBn: 'মঙ্গল আরতি', aartiEn: 'Mangala Aarti', time: '০৪:১৫ ভোর – ০৫:১৫ ভোর', prasadBn: 'মিশ্রি ও মাখন ভোগ', prasadEn: 'Mishri & Fresh Butter' },
  { aartiBn: 'শৃঙ্গার ও তুলসী আরতি', aartiEn: 'Darshan & Tulsi Aarti', time: '০৭:০০ সকাল – ০৭:৪৫ সকাল', prasadBn: 'চরণামৃত ও পুষ্পাঞ্জলি', prasadEn: 'Charanamrit & Flowers' },
  { aartiBn: 'রাজভোগ মহা আরতি', aartiEn: 'Rajbhog Maha Aarti', time: '১২:০০ দুপুর – ১২:৩০ দুপুর', prasadBn: '৫৬ ভোগ মহাপ্রসাদ', prasadEn: 'Full 56 Bhog Mahaprasad' },
  { aartiBn: 'ধূপ ও পুষ্প আরতি', aartiEn: 'Temple Reopens / Dhoop Aarti', time: '০৪:৩০ বিকাল – ০৫:০০ বিকাল', prasadBn: 'সুগন্ধি ধূপ ও ফলমূল', prasadEn: 'Sacred Dhoop & Fruits' },
  { aartiBn: 'সন্ধ্যা গৌর আরতি', aartiEn: 'Sandhya Gaura Aarti', time: '০৬:৩০ সন্ধ্যা – ০৭:৩০ সন্ধ্যা', prasadBn: 'অখণ্ড সংকীর্তন ও পায়েস', prasadEn: 'Akhand Kirtan & Kheer' },
  { aartiBn: 'শয়ন আরতি ও মন্দির বিশ্রাম', aartiEn: 'Shayan Aarti & Temple Closes', time: '০৮:৩০ রাত – ০৯:০০ রাত', prasadBn: 'সুগন্ধি উষ্ণ দুগ্ধ', prasadEn: 'Warm Spiced Milk' },
]

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'মন্দির পরিচিতি ও ঐতিহ্য' : 'About Our Mandir'}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Heritage & Divine Vision'}
        breadcrumb={[{ label: language === 'bn' ? 'পরিচিতি' : 'About Us' }]}
      />
      <GodsTicker />

      {/* ── Mission & Story ── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-temple-accent font-semibold uppercase tracking-[3px] text-xs">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'আমাদের ইতিহাস ও লক্ষ্য' : 'Our Story & Purpose'}</span>
            </div>

            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-bold text-temple-primary leading-tight">
              {language === 'bn' ? 'ভক্তি, শান্তি ও সনাতন সংস্কৃতির পীঠস্থান' : 'A Sanctuary of Divine Peace, Bhakti & Sanatan Culture'}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? '১৯৯৯ সালে প্রতিষ্ঠিত শ্রী শ্রী কৃষ্ণ মহা মন্দির বিশ্বজুড়ে সনাতন ধর্মের শাশ্বত বাণী প্রচার, সর্বজনীন ঐক্য এবং নিঃস্বার্থ মানবসেবায় এক অনন্য প্রতিষ্ঠান। প্রতিদিন শত শত ভক্ত এখানে এসে শ্রী শ্রী রাধাকৃষ্ণের রূপ দর্শন করে মনের পরম প্রশান্তি লাভ করেন।'
                : 'Founded in 1999, the Krishna Mega Temple serves as an international spiritual beacon dedicated to spreading universal love, peace, and transcendental Vedic wisdom. Through daily puja ceremonies, Vedic discourses, devotional kirtan, and humanitarian seva, we welcome seekers from every walk of life.'}
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'আমাদের মূল লক্ষ্য হলো প্রতিটি মানুষের মাঝে আধ্যাত্মিক চেতনার উন্মেষ ঘটানো এবং বৈদিক অন্নদান ও শিক্ষার মাধ্যমে সমাজের দুস্থ মানুষের সেবা করা।'
                : 'Our vision is to uplift humanity through the practice of pure Bhakti Yoga, authentic Vedic education for children, daily Annadaan (free food distribution), and preserving cultural heritage for future generations.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/events" className="kr-btn-custom">
                {language === 'bn' ? 'উৎসব সময়সূচী দেখুন' : 'View Festival Schedule'}
              </Link>
              <Link to="/donations" className="btn-secondary">
                {language === 'bn' ? 'অন্নদান সেবায় দান করুন' : 'Support Mandir Seva'}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative shadow-2xl overflow-hidden aspect-[4/3] bg-temple-primary border-4 border-temple-gold/30">
              <img
                src="/assets/img/banner/s1.webp"
                alt="Krishna Temple Sanctum"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-temple-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-temple-gold text-xs uppercase tracking-widest font-semibold block">
                  {language === 'bn' ? 'শ্রীধাম বৃন্দাবন সেবাশ্রম' : 'Main Sanctum Sanctorum'}
                </span>
                <h3 className="font-lora text-2xl font-bold">
                  {language === 'bn' ? 'শ্রী শ্রী রাধাকৃষ্ণ জীউ' : 'Sri Sri Radha Krishna Deities'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Core Pillars ── */}
      <section className="py-20 bg-temple-light font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-subtitle">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'মন্দিরের মূল স্তম্ভ' : 'Guiding Principles'}</span>
            </div>
            <h2 className="section-title">
              {language === 'bn' ? 'আমাদের চারটি মূল আধ্যাত্মিক স্তম্ভ' : 'The Four Pillars of Our Temple'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES_DATA.map(({ Icon, titleBn, titleEn, descBn, descEn }) => (
              <div
                key={titleEn}
                className="bg-white p-8 border-t-4 border-temple-accent shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className="w-14 h-14 bg-orange-50 text-temple-accent flex items-center justify-center text-2xl shadow-xs">
                  <Icon />
                </div>
                <h3 className="font-lora font-bold text-temple-primary text-xl">
                  {language === 'bn' ? titleBn : titleEn}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {language === 'bn' ? descBn : descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Daily Darshan Schedule Table ── */}
      <section className="py-20 bg-white font-poppins">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-subtitle">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'প্রতিদিনের সময়সূচী' : 'Auspicious Timings'}</span>
            </div>
            <h2 className="section-title">
              {language === 'bn' ? 'নিত্য দর্শন ও ভোগ সময়সূচী' : 'Daily Darshan & Aarti Schedule'}
            </h2>
          </div>

          <div className="bg-temple-light border border-gray-200 overflow-hidden shadow-lg">
            <div className="grid grid-cols-12 bg-temple-primary text-white text-xs font-bold uppercase tracking-wider p-4">
              <div className="col-span-5">{language === 'bn' ? 'আরতি / পূজা' : 'Aarti Ceremony'}</div>
              <div className="col-span-4">{language === 'bn' ? 'সময়সূচী' : 'Timing'}</div>
              <div className="col-span-3 text-right">{language === 'bn' ? 'প্রসাদ ভোগ' : 'Prasadam'}</div>
            </div>

            <div className="divide-y divide-gray-200">
              {DARSHAN_TIMINGS_DATA.map((row) => (
                <div
                  key={row.aartiEn}
                  className="grid grid-cols-12 p-4 text-xs sm:text-sm items-center hover:bg-white transition-colors"
                >
                  <div className="col-span-5 font-lora font-bold text-temple-primary">
                    {language === 'bn' ? row.aartiBn : row.aartiEn}
                  </div>
                  <div className="col-span-4 text-gray-600 flex items-center gap-1.5 font-mono text-xs">
                    <FaClock className="text-temple-accent text-xs" />
                    <span>{row.time}</span>
                  </div>
                  <div className="col-span-3 text-right text-temple-accent font-medium text-xs">
                    {language === 'bn' ? row.prasadBn : row.prasadEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priests Directory */}
      <VolunteersSection />

      {/* Instagram Mosaic */}
      <InstagramSection />
    </div>
  )
}
