import { Link } from 'react-router-dom'
import { FaOm, FaPrayingHands, FaBookOpen, FaHandHoldingHeart } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

export default function AboutSection() {
  const { language } = useLanguage()

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" aria-label="About Krishna Temple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Dual Layered Images + Counter Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative pb-14 pr-10 sm:pr-14">
              {/* Primary Large Image */}
              <div className="relative overflow-hidden shadow-2xl bg-temple-primary aspect-[4/3] sm:h-[460px]">
                <img
                  src="/assets/img/banner/s1.webp"
                  alt="Krishna Temple Sanctuary"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Secondary Overlapping Image */}
              <div className="absolute bottom-0 right-0 w-[60%] h-[220px] sm:h-[270px] overflow-hidden border-[6px] border-white shadow-2xl bg-temple-accent">
                <img
                  src="/assets/img/puja/2.webp"
                  alt="Daily Puja Darshan"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Decorative Accent Squares */}
              <div className="absolute top-0 right-10 w-6 h-6 bg-temple-accent -translate-y-1/2" />
              <div className="absolute bottom-12 left-0 w-6 h-6 bg-temple-primary -translate-x-1/2" />
            </div>

            {/* Heritage Counter Badge */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-temple-primary/95 text-white p-4 sm:p-6 border-l-4 border-temple-gold shadow-2xl backdrop-blur-xs max-w-[150px] sm:max-w-[190px]">
              <span className="font-lora text-3xl sm:text-5xl font-bold text-temple-gold block leading-none">
                ২৫<span className="text-xl sm:text-2xl text-white">+</span>
              </span>
              <p className="font-poppins text-[10px] sm:text-[11px] tracking-[1.5px] uppercase text-white/80 mt-1.5 sm:mt-2 font-medium">
                {language === 'bn' ? 'বছরের পবিত্র সেবা' : 'Years of Sacred Seva'}
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-temple-accent font-semibold uppercase tracking-[3px] text-xs">
                <FaOm className="text-sm" />
                <span>{language === 'bn' ? 'পবিত্র মন্দিরের ইতিহাস ও মহিমা' : 'About Our Sacred Mandir'}</span>
              </div>

              <h2 className="font-lora text-3xl sm:text-4xl lg:text-[40px] font-bold text-temple-primary leading-tight">
                {language === 'bn'
                  ? 'আমরা ভগবান শ্রীকৃষ্ণ ও সনাতন ধর্মে সমর্পিত'
                  : 'We Are Devoted to Lord Krishna & Sanatan Dharma'}
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {language === 'bn'
                ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির সর্বজনীন প্রেম, পারমার্থিক শান্তি ও বৈদিক প্রজ্ঞার এক মহান পীঠস্থান। প্রতিদিনের পূজা-অর্চনা, শ্রীমদ্ভগবদ্গীতা পাঠ, আকুল হরিনাম সংকীর্তন এবং অন্নদান সেবার মাধ্যমে ভক্ত ও সন্ধানীদের ভগবানের পরম কৃপা লাভে আমরা সর্বদা নিয়োজিত।'
                : 'The Krishna Mega Temple stands as a sacred spiritual sanctuary dedicated to spreading universal love, peace, and transcendental wisdom. Through daily puja ceremonies, Vedic discourses, devotional kirtan, and humanitarian seva, we welcome seekers from every walk of life to experience divine grace.'}
            </p>

            {/* Devotional Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="bg-temple-light p-5 border-t-2 border-temple-accent card-hover">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-temple-accent shadow-sm mb-3">
                  <FaPrayingHands className="text-xl" />
                </div>
                <h4 className="font-lora font-bold text-temple-primary text-base mb-1">
                  {language === 'bn' ? 'নিত্য পঞ্চ আরতি' : 'Daily Aarti'}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {language === 'bn' ? 'প্রতিদিন ৫ বার বৈদিক স্তোত্র ও ভক্তিপূর্ণ আরতি দর্শন।' : 'Five daily aarti ceremonies with live Vedic chanting.'}
                </p>
              </div>

              <div className="bg-temple-light p-5 border-t-2 border-temple-primary card-hover">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-temple-primary shadow-sm mb-3">
                  <FaBookOpen className="text-xl" />
                </div>
                <h4 className="font-lora font-bold text-temple-primary text-base mb-1">
                  {language === 'bn' ? 'গীতা ও ভাগবত পাঠ' : 'Gita Katha'}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {language === 'bn' ? 'আচার্যদের মুখে শ্রীমদ্ভগবদ্গীতা ও বেদান্তের গভীর ব্যাখ্যা।' : 'Authentic discourses on the Bhagavad Gita and Vedic philosophy.'}
                </p>
              </div>

              <div className="bg-temple-light p-5 border-t-2 border-temple-gold card-hover">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-temple-gold-hover shadow-sm mb-3">
                  <FaHandHoldingHeart className="text-xl" />
                </div>
                <h4 className="font-lora font-bold text-temple-primary text-base mb-1">
                  {language === 'bn' ? 'অন্নদান সেবা' : 'Annadaan'}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {language === 'bn' ? 'প্রতিদিন শত শত ভক্তের মাঝে বিনামূল্যে মহাপ্রসাদ বিতরণ।' : 'Free sanctified mahaprasad served daily to hundreds.'}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link to="/about" className="kr-btn-custom">
                {language === 'bn' ? 'মন্দিরের বিস্তারিত জানুন' : 'Discover Our Story'}
              </Link>
              <Link to="/events" className="btn-secondary">
                {language === 'bn' ? 'উৎসবের সময়সূচী দেখুন' : 'View Mandir Schedule'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
