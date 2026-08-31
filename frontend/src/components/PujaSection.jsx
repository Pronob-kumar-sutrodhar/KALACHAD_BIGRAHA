import { useState, useEffect } from 'react'
import { FaOm, FaClock, FaCalendarCheck } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

const PUJAS_DATA = [
  {
    id: 1,
    _id: '1',
    category: 'Durga Puja',
    categoryBn: 'দুর্গাপূজা',
    titleBn: 'মহানবমী চণ্ডী হোম ও বিশেষ যজ্ঞ',
    titleEn: 'Maha Navami Chandi Homam',
    image: '/assets/img/puja/1.webp',
    timingBn: 'প্রতি শুক্রবার ও নবরাত্রি • সকাল ০৮:০০',
    timingEn: 'Every Friday & Navaratri • 08:00 AM',
    price: 2501,
    descBn: 'পারিবারিক শান্তি, গ্রহদোষ খণ্ডন ও মায়ের বিশেষ আশীর্বাদ কামনায় বৈদিক হোম যজ্ঞ।',
    descEn: 'Grand ritual invocation of Divine Mother for spiritual protection, peace, and abundance.',
  },
  {
    id: 2,
    _id: '2',
    category: 'Daily Aarti',
    categoryBn: 'নিত্য আরতি',
    titleBn: 'শ্রী শ্রী রাধাকৃষ্ণ নিত্য মঙ্গল আরতি ও অর্চনা',
    titleEn: 'Radha Krishna Mangala Aarti',
    image: '/assets/img/puja/2.webp',
    timingBn: 'প্রতিদিন ভোর • ০৪:১৫ – ০৫:১৫',
    timingEn: 'Daily Morning • 04:30 AM – 06:00 AM',
    price: 501,
    descBn: 'শঙ্খনাদ, কর্পূর আরতি ও পুষ্পাঞ্জলি সহযোগে শ্রীকৃষ্ণের শ্রীপাদপদ্মে নামসংকীর্তন।',
    descEn: 'Sacred waking of the Lord with conch blowing, camphor aarti, and offering of fresh floral garlands.',
  },
  {
    id: 3,
    _id: '3',
    category: 'Janmashtami',
    categoryBn: 'জন্মাষ্টমী',
    titleBn: '১০৮ কলশ পঞ্চামৃত মহা অভিষেক',
    titleEn: '108 Kalash Maha Abhishekam',
    image: '/assets/img/puja/3.webp',
    timingBn: 'জন্মাষ্টমী ও একাদশী • সন্ধ্যা ০৬:০০',
    timingEn: 'Janmashtami & Ekadashi • 06:00 PM',
    price: 3100,
    descBn: 'দুধ, মধু, ঘৃত, গঙ্গাজল ও পঞ্চামৃত দিয়ে শ্রীকৃষ্ণের পরম পবিত্র অভিষেক ও ৫৬ ভোগ।',
    descEn: 'Holy bathing ceremony with milk, honey, ghee, gangajal, and panchamrit chanting Sri Suktam.',
  },
  {
    id: 4,
    _id: '4',
    category: 'Raksha Bandhan',
    categoryBn: 'রক্ষা বন্ধন',
    titleBn: 'শ্রীকৃষ্ণ রক্ষা কবচ ও তুলসী অর্চনা',
    titleEn: 'Sri Krishna Raksha Archana',
    image: '/assets/img/puja/4.webp',
    timingBn: 'বিশেষ তিথি • সকাল ১০:০০',
    timingEn: 'Special Tithis • 10:00 AM',
    price: 1001,
    descBn: 'পারিবারিক সুস্বাস্থ্য ও দীর্ঘায়ু কামনায় বৈদিক মন্ত্রোচ্চারণে রক্ষাসূত্র বন্ধন।',
    descEn: 'Auspicious protective thread sanctification and archana for family harmony and long life.',
  },
  {
    id: 5,
    _id: '5',
    category: 'Mahashivratri',
    categoryBn: 'মহাশিবরাত্রি',
    titleBn: 'রুদ্র অভিষেক ও বিল্বপত্র অর্চনা',
    titleEn: 'Rudra Abhishekam & Bilva Archana',
    image: '/assets/img/puja/5.webp',
    timingBn: 'প্রদোষ ও মহাশিবরাত্রি • সন্ধ্যা ০৬:৩০',
    timingEn: 'Pradosham & Shivratri • 06:30 PM',
    price: 1501,
    descBn: 'শ্রী রুদ্রম পাঠ ও ১০০৮ বিল্বপত্র অর্পণে রোগব্যাধি ও পাপমুক্তি কামনায় যজ্ঞ।',
    descEn: 'Chanting Sri Rudram and 1008 Bilva leaf offerings to Lord Shiva for purification.',
  },
  {
    id: 6,
    _id: '6',
    category: 'Diwali',
    categoryBn: 'দীপাবলি',
    titleBn: '১০৮ ঘৃত প্রদীপ দান ও শ্রীলক্ষ্মী যজ্ঞ',
    titleEn: 'Deepotsav & Lakshmi Kuber Homam',
    image: '/assets/img/puja/6.webp',
    timingBn: 'কার্তিক মাস ও দীপাবলি • সন্ধ্যা ০৭:০০',
    timingEn: 'Kartik Month & Diwali • 07:00 PM',
    price: 2100,
    descBn: 'কার্তিক দামোদর ব্রতে ঘৃতপ্রদীপ নিবেদন ও শ্রীলক্ষ্মী সহস্রনাম অর্চনে সমৃদ্ধি লাভ।',
    descEn: 'Lighting 108 sacred ghee lamps and Lakshmi Sahasranama for spiritual enlightenment and fortune.',
  },
]

export default function PujaSection({ onBookPuja }) {
  const [activeTab, setActiveTab] = useState('All')
  const [pujas, setPujas] = useState(PUJAS_DATA)
  const { language, formatMoney } = useLanguage()

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const { data } = await api.get('/api/pujas')
        if (data?.pujas?.length > 0) {
          // Merge API data with localized fields
          const dbPujas = data.pujas.map((p, i) => ({
            id: p._id || i + 1,
            _id: p._id,
            category: p.category || 'Daily Aarti',
            categoryBn: p.category === 'Daily Aarti' ? 'নিত্য আরতি' : p.category,
            titleBn: p.title,
            titleEn: p.title,
            image: p.image || '/assets/img/puja/1.webp',
            timingBn: p.schedule || 'প্রতিদিন ভোর ও সন্ধ্যা',
            timingEn: p.schedule || 'Daily Morning & Evening',
            price: Number(p.price?.replace(/[^0-9]/g, '')) || 501,
            descBn: p.description,
            descEn: p.description,
          }))
          setPujas(dbPujas)
        }
      } catch {
        // Fallback to initial verified dataset
      }
    }
    fetchPujas()
  }, [])

  const categories = language === 'bn'
    ? [
        { key: 'All', label: 'সকল পূজা' },
        { key: 'Daily Aarti', label: 'নিত্য আরতি' },
        { key: 'Janmashtami', label: 'জন্মাষ্টমী' },
        { key: 'Durga Puja', label: 'দুর্গাপূজা' },
        { key: 'Mahashivratri', label: 'মহাশিবরাত্রি' },
        { key: 'Diwali', label: 'দীপাবলি' },
      ]
    : [
        { key: 'All', label: 'All Pujas' },
        { key: 'Daily Aarti', label: 'Daily Aarti' },
        { key: 'Janmashtami', label: 'Janmashtami' },
        { key: 'Durga Puja', label: 'Durga Puja' },
        { key: 'Mahashivratri', label: 'Mahashivratri' },
        { key: 'Diwali', label: 'Diwali' },
      ]

  const filteredPujas =
    activeTab === 'All'
      ? pujas
      : pujas.filter((p) => p.category === activeTab)

  return (
    <section className="py-20 lg:py-24 bg-temple-light font-poppins" aria-label="Sacred Pujas and Rituals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="section-subtitle lg:justify-start">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'বৈদিক পূজা ও সেবা' : 'Sacred Devotional Pujas'}</span>
            </div>
            <h2 className="section-title mb-0">
              {language === 'bn' ? 'মন্দিরের বিশেষ পূজা ও সংকল্প সেবা' : 'Sacred Rituals & Archana Services'}
            </h2>
          </div>

          {/* Filter Tab Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`font-lora text-xs sm:text-sm px-4 py-2 uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeTab === cat.key
                    ? 'bg-temple-primary text-temple-gold shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-temple-accent border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pujas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPujas.map((puja) => (
            <div
              key={puja.id}
              className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Price Ribbon */}
              <div className="relative aspect-[16/10] overflow-hidden bg-temple-primary">
                <img
                  src={puja.image}
                  alt={language === 'bn' ? puja.titleBn : puja.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-temple-accent text-white text-[10px] uppercase tracking-[1.5px] font-semibold px-2.5 py-1 shadow-md">
                  {language === 'bn' ? puja.categoryBn : puja.category}
                </span>

                {/* Dakshina Ribbon */}
                <div className="absolute top-3 right-3 bg-temple-primary/95 text-temple-gold font-lora font-bold text-sm px-3 py-1 border border-temple-gold/40 shadow-md">
                  {formatMoney(puja.price)} {language === 'bn' ? 'দক্ষিণা' : 'Dakshina'}
                </div>

                {/* Bottom schedule info */}
                <div className="absolute bottom-3 left-4 right-4 text-white/90 text-xs flex items-center gap-1.5">
                  <FaClock className="text-temple-gold text-xs" />
                  <span className="truncate">{language === 'bn' ? puja.timingBn : puja.timingEn}</span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-lora font-bold text-temple-primary text-xl mb-2 group-hover:text-temple-accent transition-colors leading-snug">
                    {language === 'bn' ? puja.titleBn : puja.titleEn}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {language === 'bn' ? puja.descBn : puja.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-lora font-bold text-temple-accent text-lg">
                    {formatMoney(puja.price)}
                  </span>

                  <button
                    onClick={() =>
                      onBookPuja &&
                      onBookPuja({
                        title: language === 'bn' ? puja.titleBn : puja.titleEn,
                        price: `${formatMoney(puja.price)} दक्षिণা`,
                      })
                    }
                    className="bg-temple-primary hover:bg-temple-accent text-white font-lora text-xs uppercase tracking-wider font-semibold px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FaCalendarCheck className="text-[11px]" />
                    <span>{language === 'bn' ? 'সংকল্প বুকিং' : 'Book Puja'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
