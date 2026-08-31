import { useState } from 'react'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import BookPujaModal from '../components/BookPujaModal'
import { useLanguage } from '../context/LanguageContext'
import {
  FaPhoneAlt, FaEnvelope, FaOm, FaCalendarCheck
} from 'react-icons/fa'

const TEAM_MEMBERS = [
  {
    nameBn: 'পণ্ডিত রাকেশ কুমার পাণ্ডে',
    nameEn: 'Pandit Rakesh K. Pandey',
    roleBn: 'প্রধান পূজারী ও বৈদিক আচার্য',
    roleEn: 'Chief Acharya & Head Priest',
    image: '/assets/img/volunteers/4.webp',
    bioBn: '৩০ বছরেরও বেশি সময় ধরে মন্দিরের পূজা, বৈদিক যজ্ঞ ও বিগ্রহ শৃঙ্গার পরিচালনায় নিবেদিত।',
    bioEn: 'Guiding temple rituals, Vedic Yajna, and daily deity alankaram with over 30 years of spiritual dedication.',
    phone: '+৮৮০ ১৭০০-০০০০০০',
    email: 'acharya.rakesh@krishnamatemple.org',
  },
  {
    nameBn: 'স্বামী য়েশ চোপড়া',
    nameEn: 'Swami Yesh Chopra',
    roleBn: 'সিনিয়র সেবা পরিচালক ও কথাবাচক',
    roleEn: 'Senior Seva Director & Katha Vachak',
    image: '/assets/img/volunteers/6.webp',
    bioBn: 'শ্রীমদ্ভগবদ্গীতা শিক্ষা, যুব আধ্যাত্মিক কর্মশালা ও বার্ষিক ব্রজধাম পরিক্রমা পরিচালনা করেন।',
    bioEn: 'Conducting youth Bhagavad Gita classes, spiritual counseling, and annual Braj Yatra pilgrimages.',
    phone: '+৮৮০ ১৭০০-০০০০০১',
    email: 'swami.yesh@krishnamatemple.org',
  },
  {
    nameBn: 'আচার্য এম. কাপুর',
    nameEn: 'Acharya M. Kapoor',
    roleBn: 'প্রধান বৈদিক জ্যোতিষী ও শাস্ত্রজ্ঞ',
    roleEn: 'Chief Vedic Astrologer & Sanskrit Dean',
    image: '/assets/img/volunteers/5.webp',
    bioBn: 'শুভ লগ্ন নির্ধারণ, বাস্তু শান্তি, বিবাহ সংস্কার এবং প্রাচীন সংস্কৃত পাণ্ডুলিপি বিশারদ।',
    bioEn: 'Specialist in Vedic Muhurata, Kundali analysis, Vivaha Samskaras, and ancient Sanskrit scriptures.',
    phone: '+৮৮০ ১৭০০-০০০০০২',
    email: 'acharya.kapoor@krishnamatemple.org',
  },
  {
    nameBn: 'পণ্ডিত মোহন দাস',
    nameEn: 'Pandit Mohan Das',
    roleBn: 'সংকীর্তন ও ভজন বিশারদ',
    roleEn: 'Kirtan & Bhajan Master',
    image: '/assets/img/volunteers/3.webp',
    bioBn: 'দৈনিক অখণ্ড হরিনাম সংকীর্তন ও ঐতিহ্যবাহী বৈষ্ণবীয় সঙ্গীত উৎসবে নেতৃত্ব প্রদান করেন।',
    bioEn: 'Leading the daily Akhand Harinam Sankirtan and directing traditional Vaishnava musical festivals.',
    phone: '+৮৮০ ১৭০০-০০০০০৩',
    email: 'mohan.das@krishnamatemple.org',
  },
  {
    nameBn: 'রাধা প্রিয়া দেবী',
    nameEn: 'Radha Priya Devi',
    roleBn: 'অন্নদান ও সেবা সমন্বয়ক',
    roleEn: 'Annadaan & Seva Coordinator',
    image: '/assets/img/people/1.webp',
    bioBn: 'প্রতিদিন ১৫০০+ ভক্তের জন্য সাত্ত্বিক মহাপ্রসাদ রান্না ও স্বাস্থ্যসম্মত পরিবেশন তত্ত্বাবধান করেন।',
    bioEn: 'Overseeing daily free sanctified Mahaprasad preparation and serving over 1,500 devotees every day.',
    phone: '+৮৮০ ১৭০০-০০০০০৪',
    email: 'radha.priya@krishnamatemple.org',
  },
  {
    nameBn: 'গৌরাঙ্গ দাস',
    nameEn: 'Gauranga Das',
    roleBn: 'মন্দির ব্যবস্থাপনা ও ভক্ত সেবা',
    roleEn: 'Mandir Infrastructure & Guest Relations',
    image: '/assets/img/people/2.webp',
    bioBn: 'মন্দির চত্বর রক্ষণাবেক্ষণ, ভক্ত অতিথিশালা ও আন্তর্জাতিক দর্শনার্থীদের আতিথেয়তা পরিচালনাকারী।',
    bioEn: 'Managing temple sanctum maintenance, guest house logistics, and international devotee hosting.',
    phone: '+৮৮০ ১৭০০-০০০০০৫',
    email: 'gauranga@krishnamatemple.org',
  },
]

export default function TeamPage() {
  const [consultModalPriest, setConsultModalPriest] = useState(null)
  const { language } = useLanguage()

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'পূজারী, আচার্য ও সেবা পরিষদ' : 'Priests, Acharyas & Sevaks'}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Spiritual Guidance & Dedication'}
        breadcrumb={[{ label: language === 'bn' ? 'সেবা পরিষদ' : 'Team' }]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="section-subtitle">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'আধ্যাত্মিক পথপ্রদর্শক' : 'Spiritual Leadership'}</span>
            </div>
            <h2 className="section-title">
              {language === 'bn' ? 'আমাদের নিবেদিতপ্রাণ পূজারী ও সেবকবৃন্দ' : 'Dedicated to Sanatan Dharma & Devotee Seva'}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              {language === 'bn'
                ? 'যেকোনো ধর্মীয় সংস্কার, ব্যক্তিগত পূজা, জ্যোতিষীয় পরামর্শ বা আধ্যাত্মিক জিজ্ঞাসার জন্য সরাসরি আমাদের পূজারীদের সাথে যোগাযোগ করুন।'
                : 'Connect with our experienced priests for personalized pujas, astrological consultation, and spiritual wisdom.'}
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.nameEn}
                className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-temple-primary">
                    <img
                      src={member.image}
                      alt={language === 'bn' ? member.nameBn : member.nameEn}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-temple-primary/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-white text-xs font-semibold uppercase tracking-wider">
                      {language === 'bn' ? member.roleBn : member.roleEn}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-lora font-bold text-temple-primary text-xl group-hover:text-temple-accent transition-colors">
                      {language === 'bn' ? member.nameBn : member.nameEn}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {language === 'bn' ? member.bioBn : member.bioEn}
                    </p>

                    <div className="space-y-1.5 pt-2 text-xs text-gray-600 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-temple-accent text-[10px]" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-temple-accent text-[10px]" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setConsultModalPriest(member)}
                    className="w-full bg-temple-primary hover:bg-temple-accent text-white font-lora text-xs uppercase tracking-wider font-semibold py-2.5 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FaCalendarCheck />
                    <span>{language === 'bn' ? 'পরামর্শ ও পূজা বুক করুন' : 'Book Priest Consultation'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Puja Modal */}
      <BookPujaModal
        isOpen={Boolean(consultModalPriest)}
        puja={{
          title: consultModalPriest ? `${language === 'bn' ? consultModalPriest.nameBn : consultModalPriest.nameEn} (${language === 'bn' ? 'পরামর্শ ও সেবা' : 'Consultation'})` : '',
          price: language === 'bn' ? 'ঐচ্ছিক দক্ষিণা' : 'Optional Dakshina',
        }}
        onClose={() => setConsultModalPriest(null)}
      />
    </div>
  )
}
