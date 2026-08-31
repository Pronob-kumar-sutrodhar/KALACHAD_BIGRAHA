import { useState } from 'react'
import { FaPlay, FaTimes, FaOm, FaCircle, FaClock, FaCalendarAlt } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const AARTI_SCHEDULE_DATA = [
  {
    nameBn: 'মঙ্গল আরতি',
    nameEn: 'Mangala Aarti',
    time: '০৪:১৫ ভোর',
    descBn: 'শ্রীকৃষ্ণের দিব্য জাগরণ ও মাখন-মিশ্রি ভোগ নিবেদন',
    descEn: 'Awakening darshan & sweet butter-mishri offering',
  },
  {
    nameBn: 'শৃঙ্গার আরতি',
    nameEn: 'Shringar Aarti',
    time: '০৭:৩০ সকাল',
    descBn: 'পবিত্র পুষ্প শৃঙ্গার ও বৈদিক প্রাতঃকালীন স্তুতি',
    descEn: 'Divine flower adornment & morning stuti',
  },
  {
    nameBn: 'রাজভোগ আরতি',
    nameEn: 'Rajbhog Aarti',
    time: '১২:০০ দুপুর',
    descBn: 'দুপুরের প্রধান ভোগ নিবেদন ও ৫৬ ভোগ দর্শন',
    descEn: 'Grand noon offering with 56 Bhog Mahaprasad',
  },
  {
    nameBn: 'সন্ধ্যা আরতি (গৌর আরতি)',
    nameEn: 'Sandhya Aarti (Gaura Aarti)',
    time: '০৬:৩০ সন্ধ্যা',
    descBn: 'দীপদান, শঙ্খধ্বনি ও অখণ্ড হরিনাম সংকীর্তন',
    descEn: 'Evening lamp offering with Akhand Kirtan',
  },
  {
    nameBn: 'শয়ন আরতি',
    nameEn: 'Shayan Aarti',
    time: '০৮:৩০ রাত',
    descBn: 'রাত্রিকালীন বিশ্রাম ও ভক্তিমূলক কীর্তন',
    descEn: 'Night repose offering & peaceful lullabies',
  },
]

const PAST_DISCOURSES_DATA = [
  { id: 1, titleBn: 'শ্রীমদ্ভগবদ্গীতা দ্বিতীয় অধ্যায়: নিত্য অবিনাশী আত্মা', titleEn: 'Bhagavad Gita Chapter 2: The Eternal Soul', duration: '৪৫ মিনিট', date: '১২ আগস্ট, ২০২৬', img: '/assets/img/video-gallery/1.webp', videoId: 'TKnufs85hXk' },
  { id: 2, titleBn: 'ভক্তিযোগ ও নিঃস্বার্থ প্রেমের পরম পথ', titleEn: 'Bhakti Yoga & The Way of Unconditional Love', duration: '৫২ মিনিট', date: '০৮ আগস্ট, ২০২৬', img: '/assets/img/video-gallery/2.webp', videoId: 'TKnufs85hXk' },
  { id: 3, titleBn: 'শ্রীমতী রাধারাণীর প্রেম ও মহিমা ব্যাখ্যা', titleEn: 'Significance of Sri Radha Ashtami Celebrations', duration: '৩৮ মিনিট', date: '৩০ জুলাই, ২০২৬', img: '/assets/img/video-gallery/3.webp', videoId: 'TKnufs85hXk' },
  { id: 4, titleBn: 'সন্ধ্যা ভজন ও বাঁশির সুরে আত্মধ্যান', titleEn: 'Evening Bhajan Sandhya & Flute Meditation', duration: '৬০ মিনিট', date: '২৪ জুলাই, ২০২৬', img: '/assets/img/video-gallery/4.webp', videoId: 'TKnufs85hXk' },
]

export default function LiveBroadcastSection() {
  const [activeVideo, setActiveVideo] = useState(null)
  const { language } = useLanguage()

  return (
    <section className="py-20 lg:py-24 bg-white font-poppins" aria-label="Live Darshan & Aarti Broadcast">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-subtitle">
            <FaOm className="text-sm" />
            <span>{language === 'bn' ? 'অনলাইন শ্রীমন্দির দর্শন' : 'Virtual Mandir Darshan'}</span>
          </div>
          <h2 className="section-title">
            {language === 'bn' ? 'নিত্য লাইভ দর্শন ও পঞ্চ আরতি সময়সূচী' : 'Our Live Broadcast & Daily Aarti'}
          </h2>
          <p className="text-gray-500 text-sm">
            {language === 'bn'
              ? 'বিশ্বের যেকোনো প্রান্ত থেকে শ্রী শ্রী রাধাকৃষ্ণের নিত্য দর্শন ও আরতিতে যুক্ত হোন।'
              : 'Connect from anywhere in the world and take divine darshan of Sri Radha Krishna Vigraha in real time.'}
          </p>
        </div>

        {/* Featured Video Player & Daily Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-center">
          {/* Main Video Card */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden shadow-2xl bg-temple-dark group border border-gray-100">
              <img
                src="/assets/img/video-gallery/01.webp"
                alt="Live Temple Aarti Darshan"
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />

              {/* Live Badge */}
              <div className="absolute top-5 left-5 bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-2 tracking-wider uppercase border border-red-400/50 backdrop-blur-xs">
                <FaCircle className="text-[8px] animate-ping" />
                <span>{language === 'bn' ? 'সরাসরি আরতি সম্প্রচার' : 'Live Darshan Stream'}</span>
              </div>

              {/* Play Button */}
              <button
                onClick={() => setActiveVideo('TKnufs85hXk')}
                aria-label="Play Live Darshan Video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-temple-accent hover:bg-temple-primary text-white rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group-hover:ring-8 group-hover:ring-white/20"
              >
                <FaPlay className="ml-1" />
              </button>

              {/* Title & Timing on Video */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-semibold text-temple-gold uppercase tracking-[2px] block">
                  {language === 'bn' ? 'শ্রী শ্রী রাধাকৃষ্ণ প্রধান গর্ভগৃহ' : 'Main Sanctum Sanctorum'}
                </span>
                <h3 className="font-lora text-xl sm:text-2xl font-bold leading-snug">
                  {language === 'bn' ? 'নিত্য পঞ্চামৃত অভিষেক ও হরিনাম সংকীর্তন' : 'Akhand Kirtan & Evening Aarti Live'}
                </h3>
              </div>
            </div>
          </div>

          {/* Daily Aarti Schedule Box (5 cols) */}
          <div className="lg:col-span-5 bg-temple-primary text-white p-6 sm:p-8 shadow-2xl border-t-4 border-temple-gold space-y-5">
            <div className="border-b border-white/15 pb-3">
              <span className="text-temple-gold text-xs uppercase tracking-[2px] font-semibold block">
                {language === 'bn' ? 'নিত্য দর্শন সময়সূচী' : 'Mandir Schedule'}
              </span>
              <h3 className="font-lora text-2xl font-bold">
                {language === 'bn' ? 'দৈনিক পঞ্চ আরতি' : 'Daily 5 Aarti Timings'}
              </h3>
            </div>

            <div className="divide-y divide-white/10 space-y-3">
              {AARTI_SCHEDULE_DATA.map((item) => (
                <div key={item.nameEn} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-lora font-bold text-white text-sm sm:text-base">
                      {language === 'bn' ? item.nameBn : item.nameEn}
                    </h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      {language === 'bn' ? item.descBn : item.descEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 text-temple-gold font-bold text-xs font-lora border border-white/10 shrink-0">
                    <FaClock className="text-[10px]" />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Katha & Video Gallery Grid */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div>
              <span className="text-temple-accent text-xs uppercase tracking-[2px] font-semibold block">
                {language === 'bn' ? 'আর্কাইভ ও প্রবচন' : 'Recorded Discourses'}
              </span>
              <h3 className="font-lora text-2xl font-bold text-temple-primary">
                {language === 'bn' ? 'পূর্ববর্তী প্রবচন ও ভজন' : 'Previous Katha & Bhajans'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAST_DISCOURSES_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideo(item.videoId)}
                className="group bg-temple-light border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden bg-temple-dark">
                  <img
                    src={item.img}
                    alt={language === 'bn' ? item.titleBn : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-temple-accent text-white flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform">
                      <FaPlay className="ml-0.5 text-xs" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 font-bold">
                    {item.duration}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <FaCalendarAlt className="text-[9px]" />
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-lora font-bold text-temple-primary text-sm line-clamp-2 group-hover:text-temple-accent transition-colors leading-snug">
                    {language === 'bn' ? item.titleBn : item.titleEn}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black border border-white/20 aspect-video shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl cursor-pointer"
            >
              <FaTimes />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1`}
              title="Temple Broadcast Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
