import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import { useLanguage } from '../context/LanguageContext'
import { FaChevronDown, FaChevronUp, FaPhoneAlt, FaSearch, FaOm } from 'react-icons/fa'

const FAQ_DATA = [
  {
    categoryBn: 'মন্দির দর্শন ও নিয়মাবলী',
    categoryEn: 'Temple Visits & Darshan Protocol',
    items: [
      {
        qBn: 'মন্দির দর্শন ও আরতির দৈনিক সময়সূচী কী?',
        qEn: 'What are the daily temple visiting and darshan hours?',
        aBn: 'মন্দির প্রতিদিন ভোর ৪:১৫ টায় মঙ্গল আরতির মাধ্যমে উন্মুক্ত হয় এবং দুপুর ১:০০ টা পর্যন্ত খোলা থাকে। পুনরায় বিকাল ৪:৩০ টায় খুলে রাত্রি ৯:০০ টায় শয়ন আরতির পর বন্ধ হয়।',
        aEn: 'The temple sanctum opens every day at 4:15 AM for Mangala Aarti and remains open until 1:00 PM. It reopens at 4:30 PM for evening Dhoop Aarti and closes at 9:00 PM following Shayan Aarti.',
      },
      {
        qBn: 'মন্দিরে প্রবেশের জন্য কোনো বিশেষ পোশাকের নিয়ম আছে কি?',
        qEn: 'Is there a specific dress code required to visit the mandir?',
        aBn: 'ভক্তদের শালীন ও মার্জিত সনাতন পোশাক পরে আসার অনুরোধ করা হয়। মূল নাটমন্দিরে প্রবেশের পূর্বে জুতা কাউন্টারে জুতা জমা দিতে হবে।',
        aEn: 'We kindly request all devotees to wear traditional Indian attire or modest, respectful clothing covering shoulders and knees. Footwear must be deposited at the shoe counter.',
      },
      {
        qBn: 'অন্যান্য ধর্ম ও সম্প্রদায়ের দর্শনার্থীরা কি আসতে পারেন?',
        qEn: 'Are seekers of other faiths welcome to attend?',
        aBn: 'হ্যাঁ, অবশ্যই! শ্রী শ্রী কৃষ্ণ মহা মন্দিরে জাতি-ধর্ম নির্বিশেষে সকল দর্শনার্থী সানন্দে শ্রীকৃষ্ণের দিব্য দর্শন ও মহাপ্রসাদ গ্রহণ করতে পারেন।',
        aEn: 'Yes, absolutely! The Krishna Mega Temple warmly welcomes visitors of all nationalities, backgrounds, and faiths.',
      },
    ],
  },
  {
    categoryBn: 'পূজা ও পুরোহিত সেবা',
    categoryEn: 'Pujas, Sankalpas & Priest Services',
    items: [
      {
        qBn: 'পারিবারিক বিশেষ পূজা বা সংকল্প কীভাবে বুক করব?',
        qEn: 'How do I book a special family puja or Sankalp?',
        aBn: 'আমাদের অনলাইন পূজা পোর্টালের মাধ্যমে আপনার নাম, গোত্র ও শুভ তারিখ নির্বাচন করে সরাসরি পূজা সংকল্প বুক করতে পারেন অথবা ফোন করুন +৮৮০ ১৭০০-০০০০০০ নম্বরে।',
        aEn: 'You can book pujas directly through our online Puja Services page or contact our temple priest office.',
      },
      {
        qBn: 'গৃহপ্রবেশ বা বিয়ের অনুষ্ঠানের জন্য পূজারী কি বাসায় যেতে পারেন?',
        qEn: 'Can priests travel to our residence for Griha Pravesh or weddings?',
        aBn: 'হ্যাঁ, আমাদের অভিজ্ঞ বৈদিক পুরোহিতগণ গৃহপ্রবেশ, বিবাহ সংস্কার, সত্যনারায়ণ ব্রত ও নামাকরণের জন্য ভক্তদের গৃহে গিয়ে সেবা প্রদান করেন।',
        aEn: 'Yes, our certified Vedic priests travel to conduct traditional Griha Pravesh (housewarming), Vivaha Samskara (weddings), and Satyanarayana Katha.',
      },
    ],
  },
  {
    categoryBn: 'দান ও আয়কর ছাড় (80G)',
    categoryEn: 'Donations & 80G Tax Exemption',
    items: [
      {
        qBn: 'মন্দিরে করা অনুদান কি আয়কর ছাড়ের আওতাভুক্ত?',
        qEn: 'Are donations eligible for tax exemption?',
        aBn: 'হ্যাঁ, শ্রী শ্রী কৃষ্ণ মহা মন্দির একটি নিবন্ধিত ধর্মীয় ট্রাস্ট এবং সকল অনুদানে অফিশিয়াল আয়কর ছাড় রসিদ তৎক্ষণাৎ ইমেইলে প্রদান করা হয়।',
        aEn: 'Yes, Krishna Mega Temple is a registered religious non-profit trust and 80G tax exempt entity. An official digital receipt is generated immediately.',
      },
      {
        qBn: 'আমার অনুদানের অর্থ কীভাবে ব্যয় করা হয়?',
        qEn: 'How are my contributions utilized?',
        aBn: '১০০% অনুদান সরাসরি প্রতিদিনের অনাথ শিশুদের শিক্ষা, অন্নদান রান্নাঘর, গরুর খাদ্য এবং মন্দির সংস্কারে ব্যয়িত হয়।',
        aEn: '100% of public donations directly fund daily free Annadaan food distribution, Vedic Vidyalaya boarding, and Gaushala cow fodder.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({ '0-0': true })
  const [search, setSearch] = useState('')
  const { language } = useLanguage()

  const toggleAccordion = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'ভক্তদের সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Everything You Need to Know'}
        breadcrumb={[{ label: language === 'bn' ? 'জিজ্ঞাসা' : 'FAQ' }]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Live Search */}
          <div className="bg-white p-4 sm:p-6 border border-gray-200 shadow-sm flex items-center gap-3">
            <FaSearch className="text-gray-400 text-base shrink-0" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'আপনার প্রশ্ন বা অনুসন্ধানের বিষয় লিখুন (যেমন: আরতি, পূজা, দান)...' : 'Search questions, timings, dress code, donations...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm focus:outline-hidden text-gray-700"
            />
          </div>

          {/* Accordion Categories */}
          <div className="space-y-8">
            {FAQ_DATA.map((cat, catIdx) => (
              <div key={cat.categoryEn} className="space-y-3">
                <h3 className="font-lora text-xl font-bold text-temple-primary border-b border-gray-200 pb-2">
                  {language === 'bn' ? cat.categoryBn : cat.categoryEn}
                </h3>

                <div className="space-y-2">
                  {cat.items
                    .filter((item) => {
                      if (!search) return true
                      const q = language === 'bn' ? item.qBn : item.qEn
                      const a = language === 'bn' ? item.aBn : item.aEn
                      return (
                        q.toLowerCase().includes(search.toLowerCase()) ||
                        a.toLowerCase().includes(search.toLowerCase())
                      )
                    })
                    .map((item, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`
                      const isOpen = openItems[key]

                      return (
                        <div
                          key={key}
                          className="bg-white border border-gray-200 overflow-hidden shadow-xs"
                        >
                          <button
                            onClick={() => toggleAccordion(key)}
                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-orange-50/50 transition-colors cursor-pointer"
                          >
                            <span className="font-lora font-bold text-temple-primary text-sm sm:text-base">
                              {language === 'bn' ? item.qBn : item.qEn}
                            </span>
                            <span className="text-temple-accent text-xs shrink-0">
                              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-4 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 bg-slate-50/30">
                              {language === 'bn' ? item.aBn : item.aEn}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Help CTA */}
          <div className="bg-temple-primary text-white p-8 text-center space-y-4 border-t-4 border-temple-gold shadow-xl">
            <div className="inline-flex items-center gap-2 text-temple-gold text-xs font-semibold uppercase tracking-widest">
              <FaOm />
              <span>{language === 'bn' ? 'আরও কোনো জিজ্ঞাসা?' : 'Still Have Questions?'}</span>
            </div>
            <h3 className="font-lora text-2xl font-bold">
              {language === 'bn' ? 'মন্দির হেল্পলাইন ও পরামর্শ কেন্দ্র' : 'Our Temple Team is Here to Assist You'}
            </h3>
            <p className="text-white/75 text-xs sm:text-sm max-w-lg mx-auto">
              {language === 'bn'
                ? 'যেকোনো ব্যক্তিগত প্রশ্ন বা বিশেষ সহায়তার জন্য সরাসরি আমাদের যোগাযোগ করুন।'
                : 'Contact our temple administration directly for booking queries, spiritual counseling, or lodging assistance.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="kr-btn-custom">
                {language === 'bn' ? 'বার্তা পাঠান' : 'Send Inquiry'}
              </Link>
              <a
                href="tel:+8801700000000"
                className="bg-white/10 hover:bg-white/20 text-white font-lora text-xs uppercase tracking-wider font-semibold px-6 py-3 border border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <FaPhoneAlt className="text-temple-gold" />
                <span>+৮৮০ ১৭০০-০০০০০০</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
