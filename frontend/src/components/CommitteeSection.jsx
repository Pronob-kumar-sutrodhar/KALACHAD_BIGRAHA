import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaOm,
  FaUserTie, FaCheckCircle, FaUsers, FaArrowRight
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

const FALLBACK_MEMBERS = [
  {
    _id: '1',
    nameBn: 'শ্রী সুব্রত কুমার সূত্রধর',
    nameEn: 'Sri Subrata Kumar Sutradhar',
    designationBn: 'সভাপতি',
    designationEn: 'President',
    photo: '/assets/img/volunteers/1.webp',
    phone: '+৮৮০ ১৭০০-১০০০০১',
    email: 'president@kalachadtemple.org',
    addressBn: 'ইউনিয়ন কেন্দ্রীয় মন্দির চত্বর',
    addressEn: 'Union Central Mandir Complex',
    bioBn: 'দীর্ঘ ২০ বছর ধরে শ্রী শ্রী কালাচাঁদ বিগ্রহ সেবা ও সার্বিক মন্দির উন্নয়নে অসামান্য নেতৃত্ব দিয়ে আসছেন।',
    bioEn: 'Providing outstanding leadership for temple development and deity seva for over 20 years.',
    order: 1,
  },
  {
    _id: '2',
    nameBn: 'শ্রী বিপ্লব কুমার রায়',
    nameEn: 'Sri Biplob Kumar Roy',
    designationBn: 'সাধারণ সম্পাদক',
    designationEn: 'General Secretary',
    photo: '/assets/img/volunteers/2.webp',
    phone: '+৮৮০ ১৭০০-১০০০০২',
    email: 'sec@kalachadtemple.org',
    addressBn: 'কালীতলা রোড, সেবাশ্রম মার্গ',
    addressEn: 'Kalitala Road, Sevashram Marg',
    bioBn: 'দৈনন্দিন মন্দির প্রশাসন, মহোৎসব সমন্বয় এবং ভক্তদের সেবা ব্যবস্থাপনা কার্যক্রম পরিচালনা করেন।',
    bioEn: 'Overseeing daily mandir administration, festival coordination, and devotee hospitality management.',
    order: 2,
  },
  {
    _id: '3',
    nameBn: 'শ্রী অনিল চন্দ্র বিশ্বাস',
    nameEn: 'Sri Anil Chandra Biswas',
    designationBn: 'সহ-সভাপতি',
    designationEn: 'Vice President',
    photo: '/assets/img/volunteers/3.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৩',
    email: 'vp@kalachadtemple.org',
    addressBn: 'মন্দির লেন, কেন্দ্রীয় পাড়া',
    addressEn: 'Mandir Lane, Central Area',
    bioBn: 'মন্দিরের পরিকাঠামো উন্নয়ন, অতিথি ভবন নির্মাণ এবং সামাজিক কল্যাণমূলক প্রকল্পের সমন্বয়ক।',
    bioEn: 'Coordinator of temple infrastructure development, guest house construction, and community welfare.',
    order: 3,
  },
  {
    _id: '4',
    nameBn: 'শ্রী রঞ্জন কুমার পাল',
    nameEn: 'Sri Ranjan Kumar Paul',
    designationBn: 'যুগ্ম সাধারণ সম্পাদক',
    designationEn: 'Joint General Secretary',
    photo: '/assets/img/volunteers/4.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৪',
    email: 'joint.sec@kalachadtemple.org',
    addressBn: 'রাধাকৃষ্ণ পল্লী',
    addressEn: 'Radha Krishna Palli',
    bioBn: 'উৎসবের শৃঙ্খলা, ভলান্টিয়ার টিম ব্যবস্থাপনা এবং প্রকাশনা কার্যক্রমে নিবেদিত প্রাণ।',
    bioEn: 'Dedicated to festival discipline, volunteer corps management, and spiritual publications.',
    order: 4,
  },
  {
    _id: '5',
    nameBn: 'শ্রী তাপস কুমার চক্রবর্তী',
    nameEn: 'Sri Tapas Kumar Chakraborty',
    designationBn: 'কোষাধ্যক্ষ',
    designationEn: 'Treasurer',
    photo: '/assets/img/volunteers/5.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৫',
    email: 'treasurer@kalachadtemple.org',
    addressBn: 'গোবিন্দ মার্গ',
    addressEn: 'Govinda Marg',
    bioBn: 'মন্দিরের আয়-ব্যয়, অনুদান তহবিল ও স্বচ্ছ হিসাব পরিচালনার দায়িত্ব বিশ্বস্ততার সাথে পালন করছেন।',
    bioEn: 'Faithfully managing temple finances, donation funds, audit, and transparent accounts.',
    order: 5,
  },
  {
    _id: '6',
    nameBn: 'শ্রী প্রদীপ অধিকারী',
    nameEn: 'Sri Pradip Adhikari',
    designationBn: 'সাংগঠনিক সম্পাদক',
    designationEn: 'Organizing Secretary',
    photo: '/assets/img/volunteers/6.webp',
    phone: '+৮৮০ ১৭০০-১০০০০৬',
    email: 'org.sec@kalachadtemple.org',
    addressBn: 'শান্তিবাগ',
    addressEn: 'Shantibagh',
    bioBn: 'ইউনিয়নের সকল এলাকার ভক্তদের সাথে সমন্বয় এবং ধর্মীয় পদযাত্রা পরিচালনায় মুখ্য ভূমিকা পালন করেন।',
    bioEn: 'Key coordinator for devotee outreach across all union sectors and organizing spiritual processions.',
    order: 6,
  },
]

export default function CommitteeSection({
  limit = 0,
  showTitle = true,
  className = '',
}) {
  const { language } = useLanguage()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    api
      .get('/api/committee')
      .then((res) => {
        if (isMounted) {
          const list = res.data?.members || []
          setMembers(list.length > 0 ? list : FALLBACK_MEMBERS)
        }
      })
      .catch(() => {
        if (isMounted) {
          setMembers(FALLBACK_MEMBERS)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const displayMembers = limit > 0 ? members.slice(0, limit) : members

  return (
    <section className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 font-poppins relative select-none ${className}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-temple-accent font-semibold uppercase tracking-[3px] text-xs">
              <FaOm className="text-sm" />
              <span>
                {language === 'bn'
                  ? 'মন্দির পরিচালনা পরিষদ'
                  : 'Executive Leadership Board'}
              </span>
            </div>
            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-bold text-temple-primary leading-tight">
              {language === 'bn'
                ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ মন্দির পরিচালনা কমিটি'
                : 'Mandir Executive Committee Members'}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {language === 'bn'
                ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দিরের নিত্য পূজা-অর্চনা, উৎসব সমন্বয়, উন্নয়ন কর্মকাণ্ড ও ভক্ত সেবায় নিবেদিত কার্যনির্বাহী পরিষদ।'
                : 'Dedicated executive council overseeing deity seva, infrastructure development, festival harmony, and devotee hospitality.'}
            </p>
          </div>
        )}

        {/* Committee Members Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white p-6 border border-gray-200 animate-pulse space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto" />
                <div className="h-4 bg-gray-200 w-3/4 mx-auto" />
                <div className="h-3 bg-gray-200 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayMembers.map((member, index) => {
              const name = language === 'bn' ? (member.nameBn || member.nameEn) : (member.nameEn || member.nameBn)
              const designation = language === 'bn' ? (member.designationBn || member.designationEn) : (member.designationEn || member.designationBn)
              const bio = language === 'bn' ? (member.bioBn || member.bioEn) : (member.bioEn || member.bioBn)
              const address = language === 'bn' ? (member.addressBn || member.addressEn) : (member.addressEn || member.addressBn)

              return (
                <div
                  key={member._id || index}
                  className="bg-white border border-gray-200 hover:border-temple-accent shadow-sm hover:shadow-xl transition-all duration-300 rounded-xs flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Top Avatar Banner */}
                    <div className="relative bg-gradient-to-r from-temple-primary to-temple-dark p-6 text-center text-white pb-12">
                      <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-temple-gold text-temple-primary rounded-xs">
                        #{member.order || index + 1}
                      </div>

                      {/* Photo / Avatar */}
                      <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-white mt-2">
                        <img
                          src={member.photo || `/assets/img/volunteers/${(index % 6) + 1}.webp`}
                          alt={name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = '/assets/img/people/1.webp'
                          }}
                        />
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-6 pt-3 text-center space-y-3">
                      {/* Designation Badge */}
                      <span className="inline-block bg-orange-50 text-temple-accent border border-temple-accent/30 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-xs">
                        {designation}
                      </span>

                      {/* Member Name */}
                      <h3 className="font-lora text-xl font-bold text-temple-primary group-hover:text-temple-accent transition-colors leading-snug">
                        {name}
                      </h3>

                      {/* Bio */}
                      {bio && (
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                          {bio}
                        </p>
                      )}

                      {/* Contact Info */}
                      <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600 text-left">
                        {member.phone && (
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-orange-50 text-temple-accent flex items-center justify-center shrink-0">
                              <FaPhoneAlt className="text-[10px]" />
                            </span>
                            <a
                              href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                              className="font-medium hover:text-temple-accent transition-colors truncate"
                            >
                              {member.phone}
                            </a>
                          </div>
                        )}

                        {member.email && (
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-orange-50 text-temple-accent flex items-center justify-center shrink-0">
                              <FaEnvelope className="text-[10px]" />
                            </span>
                            <a
                              href={`mailto:${member.email}`}
                              className="font-medium hover:text-temple-accent transition-colors truncate"
                            >
                              {member.email}
                            </a>
                          </div>
                        )}

                        {address && (
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-orange-50 text-temple-accent flex items-center justify-center shrink-0">
                              <FaMapMarkerAlt className="text-[10px]" />
                            </span>
                            <span className="text-gray-500 truncate">{address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Status */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                      <FaCheckCircle className="text-xs" />
                      <span>{language === 'bn' ? 'সক্রিয় সদস্য' : 'Active Member'}</span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-400">
                      ID: {String(member._id).slice(-4).toUpperCase()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* View Full Committee Button if limited */}
        {limit > 0 && members.length > limit && (
          <div className="text-center pt-4">
            <Link
              to="/committee"
              className="inline-flex items-center gap-2 bg-temple-accent hover:bg-temple-primary text-white font-lora text-xs uppercase tracking-wider font-semibold px-8 py-3.5 shadow-md hover:shadow-xl transition-all"
            >
              <span>{language === 'bn' ? 'সম্পূর্ণ কমিটি তালিকা দেখুন' : 'View Full Committee Board'}</span>
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
