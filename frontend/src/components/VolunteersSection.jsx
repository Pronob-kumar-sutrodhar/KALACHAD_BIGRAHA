import { FaOm, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const PRIESTS_DATA = [
  {
    id: 1,
    nameBn: 'পণ্ডিত রাকেশ কুমার পাণ্ডে',
    nameEn: 'Pandit Rakesh K. Pandey',
    roleBn: 'প্রধান পূজারী ও বৈদিক আচার্য',
    roleEn: 'Head Acharya & Chief Priest',
    image: '/assets/img/volunteers/4.webp',
    specialtyBn: 'বৈদিক মহাযজ্ঞ ও পঞ্চামৃত অভিষেক',
    specialtyEn: 'Vedic Yajna & Panchamrit Abhishekam',
  },
  {
    id: 2,
    nameBn: 'স্বামী য়েশ চোপড়া',
    nameEn: 'Swami Yesh Chopra',
    roleBn: 'সিনিয়র সেবা আচার্য',
    roleEn: 'Senior Seva Acharya',
    image: '/assets/img/volunteers/6.webp',
    specialtyBn: 'শ্রীমদ্ভগবদ্গীতা প্রবচন ও যুব সংকল্প',
    specialtyEn: 'Bhagavad Gita Katha & Youth Guidance',
  },
  {
    id: 3,
    nameBn: 'আচার্য এম. কাপুর',
    nameEn: 'Acharya M. Kapoor',
    roleBn: 'বৈদিক জ্যোতিষী ও শাস্ত্রজ্ঞ',
    roleEn: 'Vedic Astrologer & Scholar',
    image: '/assets/img/volunteers/5.webp',
    specialtyBn: 'শুভ মুহূর্ত নির্ধারণ ও বাস্তু শান্তি',
    specialtyEn: 'Muhurata & Sanskrit Scriptures',
  },
  {
    id: 4,
    nameBn: 'পণ্ডিত মোহন দাস',
    nameEn: 'Pandit Mohan Das',
    roleBn: 'সংকীর্তন ও ভজন বিশারদ',
    roleEn: 'Kirtan & Bhajan Master',
    image: '/assets/img/volunteers/3.webp',
    specialtyBn: 'ধ্রুপদ সঙ্গীত ও মহামন্ত্র সংকীর্তন',
    specialtyEn: 'Classical Dhrupad & Harinam Kirtan',
  },
]

export default function VolunteersSection() {
  const { language } = useLanguage()

  return (
    <section
      className="relative py-24 bg-cover bg-center bg-fixed text-white overflow-hidden font-poppins"
      style={{ backgroundImage: `url('/assets/img/banner/s1.webp')` }}
      aria-label="Temple Priests and Volunteers"
    >
      {/* Dark Teal Overlay */}
      <div className="absolute inset-0 bg-temple-primary/92" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-temple-gold text-xs font-semibold uppercase tracking-[3px] mb-2">
            <FaOm />
            <span>{language === 'bn' ? 'আধ্যাত্মিক পথপ্রদর্শক ও পূজারী' : 'Spiritual Guides & Sevaks'}</span>
          </div>
          <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {language === 'bn' ? 'আমাদের শ্রদ্ধেয় পূজারী ও আচার্যবৃন্দ' : 'Our Respected Priests & Acharyas'}
          </h2>
          <p className="text-white/70 text-sm">
            {language === 'bn'
              ? 'সনাতন ধর্মের জ্ঞান ও পবিত্র ঐতিহ্যের সংরক্ষণে নিবেদিত পুরোহিত ও সেবকগণ।'
              : 'Dedicated Vedic scholars, priests, and sevaks committed to preserving Sanatan Dharma and guiding devotees.'}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRIESTS_DATA.map((priest) => (
            <div
              key={priest.id}
              className="group bg-white text-temple-primary overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 border-b-4 border-temple-accent"
            >
              {/* Image with overlay on hover */}
              <div className="relative aspect-[3/4] overflow-hidden bg-temple-dark">
                <img
                  src={priest.image}
                  alt={language === 'bn' ? priest.nameBn : priest.nameEn}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-temple-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 bg-white/20 hover:bg-temple-accent text-white flex items-center justify-center text-xs transition-colors"><FaFacebookF /></a>
                    <a href="#" className="w-8 h-8 bg-white/20 hover:bg-temple-accent text-white flex items-center justify-center text-xs transition-colors"><FaTwitter /></a>
                    <a href="#" className="w-8 h-8 bg-white/20 hover:bg-temple-accent text-white flex items-center justify-center text-xs transition-colors"><FaInstagram /></a>
                    <a href="#" className="w-8 h-8 bg-white/20 hover:bg-temple-accent text-white flex items-center justify-center text-xs transition-colors"><FaYoutube /></a>
                  </div>
                </div>
              </div>

              <div className="p-5 text-center space-y-1.5">
                <h3 className="font-lora font-bold text-lg text-temple-primary group-hover:text-temple-accent transition-colors">
                  {language === 'bn' ? priest.nameBn : priest.nameEn}
                </h3>
                <p className="text-temple-accent font-semibold text-xs uppercase tracking-wider">
                  {language === 'bn' ? priest.roleBn : priest.roleEn}
                </p>
                <p className="text-gray-400 text-[11px] pt-1 border-t border-gray-100 mt-2">
                  {language === 'bn' ? priest.specialtyBn : priest.specialtyEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
