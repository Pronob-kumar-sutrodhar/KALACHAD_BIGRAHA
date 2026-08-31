import { FaInstagram } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const IG_PHOTOS = [
  { id: 1, img: '/assets/img/ig/1.webp', captionBn: 'ভোরবেলার মঙ্গল শৃঙ্গার আরতি দর্শন', captionEn: 'Morning Mangala Shringar Aarti Darshan' },
  { id: 2, img: '/assets/img/ig/2.webp', captionBn: 'মন্দির প্রাঙ্গণে অখণ্ড হরিনাম সংকীর্তন', captionEn: 'Akhand Harinam Kirtan at Temple Hall' },
  { id: 3, img: '/assets/img/ig/3.webp', captionBn: 'ভগবানের ৫৬ ভোগ নিবেদন ও দর্শন', captionEn: '56 Bhog Mahaprasad Offering' },
  { id: 4, img: '/assets/img/ig/4.webp', captionBn: 'ভক্তদের সমবেত প্রদীপ প্রজ্বালন', captionEn: 'Devotees offering Deepam lamps' },
  { id: 5, img: '/assets/img/ig/5.webp', captionBn: 'ব্রজধাম পুষ্পাঞ্জলি ও হোলি মহোৎসব', captionEn: 'Braj Holi Color & Flower Mahotsav' },
  { id: 6, img: '/assets/img/ig/6.webp', captionBn: 'বৈদিক বিদ্যালয়ের শিশুদের গীতা আবৃত্তি', captionEn: 'Vedic Vidyalaya Children Chanting Gita' },
]

export default function InstagramSection() {
  const { language } = useLanguage()

  return (
    <section className="bg-white py-12 border-t border-gray-100 font-poppins" aria-label="Temple Instagram & Darshan Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-temple-accent font-semibold uppercase tracking-[3px] text-xs flex items-center gap-2">
              <FaInstagram />
              <span>@krishnamegatemple</span>
            </span>
            <h3 className="font-lora text-2xl font-bold text-temple-primary">
              {language === 'bn' ? 'ইনস্টাগ্রামে নিত্য বিগ্রহ দর্শন' : 'Daily Darshan on Instagram'}
            </h3>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FaInstagram />
            <span>{language === 'bn' ? 'ইনস্টাগ্রামে যুক্ত হোন' : 'Follow Us On Instagram'}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {IG_PHOTOS.map((photo) => (
            <a
              key={photo.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-slate-100 block shadow-xs"
            >
              <img
                src={photo.img}
                alt={language === 'bn' ? photo.captionBn : photo.captionEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-temple-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white p-3 text-center">
                <FaInstagram className="text-2xl text-temple-gold animate-bounce" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
