import { Link } from 'react-router-dom'
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaOm,
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
  FaChevronUp, FaCalendarAlt, FaHeart
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const RECENT_POSTS_DATA = [
  {
    id: 1,
    titleBn: 'শ্রীকৃষ্ণের মোহন বাঁশির সুর ও দিব্য রাসলীলার রহস্য',
    titleEn: 'Significance of Lord Krishna’s Flute & Divine Raas',
    dateBn: '১৮ আগস্ট, ২০২৬',
    dateEn: 'Aug 18, 2026',
    img: '/assets/img/blog/sm/1.webp',
  },
  {
    id: 2,
    titleBn: 'ভোরবেলার মঙ্গল আরতি ও আধ্যাত্মিক সুফল',
    titleEn: 'Daily Mangala Aarti Rituals and Their Cosmic Benefits',
    dateBn: '১৪ আগস্ট, ২০২৬',
    dateEn: 'Aug 14, 2026',
    img: '/assets/img/blog/sm/2.webp',
  },
  {
    id: 3,
    titleBn: 'আত্মজ্ঞান ও শান্তির জন্য কীভাবে গীতা পাঠ করবেন',
    titleEn: 'How to Study Bhagavad Gita for Peace & Self Realization',
    dateBn: '০৫ আগস্ট, ২০২৬',
    dateEn: 'Aug 05, 2026',
    img: '/assets/img/blog/sm/3.webp',
  },
]

export default function Footer() {
  const { language } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-temple-primary text-white relative select-none font-poppins" aria-label="Temple Footer">
      {/* ── Middle Footer Columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: About Mandir */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-temple-accent text-white flex items-center justify-center text-xl shadow-md">
                <FaOm />
              </div>
              <div>
                <span className="font-lora text-lg sm:text-xl font-bold text-white block">
                  {language === 'bn' ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির' : 'Sri Sri Kalachand Bigraha Union Central Temple'}
                </span>
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-temple-gold block">
                  {language === 'bn' ? 'সনাতন ধর্ম সেবাশ্রম' : 'Sanatan Dharma Central Mandir'}
                </span>
              </div>
            </div>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              {language === 'bn'
                ? 'ভগবান শ্রী শ্রী রাধাকৃষ্ণের নিত্য আরাধনা, ধ্যান ও সনাতন ধর্মীয় সেবায় নিবেদিত। প্রেম, ভক্তি, বেদপাঠ এবং নিঃস্বার্থ অন্নদান সেবার এক পরম পবিত্র ধাম।'
                : 'Dedicated to the worship, meditation, and celebration of Sri Radha Krishna. A sanctified haven of eternal devotion, Vedic scripture, and selfless community seva.'}
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-white/85">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-temple-gold text-xs shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-temple-gold transition-colors">+৮৮০ ১৭০০-০০০০০০</a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-temple-gold text-xs shrink-0" />
                <a href="mailto:info@krishnamatemple.org" className="hover:text-temple-gold transition-colors">info@krishnamatemple.org</a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-temple-gold text-xs shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ' : 'Brahmagacha, Raiganj, Sirajganj, Bangladesh'}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Sacred Information */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-lora text-lg font-bold text-white border-b border-white/15 pb-2">
              {language === 'bn' ? 'তথ্য ও সেবা' : 'Information'}
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li><Link to="/about" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'মন্দির পরিচিতি' : 'About Mandir'}</Link></li>
              <li><Link to="/events" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'নিত্য পূজা ও আরতি' : 'Puja Schedule'}</Link></li>
              <li><Link to="/events" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'আসন্ন মহোৎসব' : 'Festivals'}</Link></li>
              <li><Link to="/donations" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'অন্নদান প্রকল্প' : 'Annadaan Seva'}</Link></li>
              <li><Link to="/team" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'পূজারী পরিষদ' : 'Priests & Acharyas'}</Link></li>
            </ul>
          </div>

          {/* Col 3: Other Portals */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-lora text-lg font-bold text-white border-b border-white/15 pb-2">
              {language === 'bn' ? 'অন্যান্য লিঙ্ক' : 'Other Links'}
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li><Link to="/shop" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'মন্দির ভাণ্ডার' : 'Temple Store'}</Link></li>
              <li><Link to="/cart" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'শপিং ঝুড়ি' : 'Shopping Cart'}</Link></li>
              <li><Link to="/checkout" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'চেকআউট' : 'Checkout'}</Link></li>
              <li><Link to="/blog" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'ধর্মকথা ও প্রবন্ধ' : 'Gita Katha'}</Link></li>
              <li><Link to="/faq" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Devotee FAQ'}</Link></li>
              <li><Link to="/contact" className="hover:text-temple-gold transition-colors">&bull; {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}</Link></li>
            </ul>
          </div>

          {/* Col 4: Recent Discourses */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-lora text-lg font-bold text-white border-b border-white/15 pb-2">
              {language === 'bn' ? 'সাম্প্রতিক ধর্মকথা' : 'Recent Discourses'}
            </h4>
            <div className="space-y-3">
              {RECENT_POSTS_DATA.map((post) => (
                <div key={post.id} className="flex gap-3 items-center group">
                  <img
                    src={post.img}
                    alt={language === 'bn' ? post.titleBn : post.titleEn}
                    className="w-14 h-14 object-cover shrink-0 bg-temple-accent"
                    loading="lazy"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-temple-gold">
                      <FaCalendarAlt className="text-[9px]" />
                      <span>{language === 'bn' ? post.dateBn : post.dateEn}</span>
                    </div>
                    <Link
                      to="/blog/1"
                      className="font-lora text-xs font-semibold text-white/90 group-hover:text-temple-gold transition-colors line-clamp-2 leading-snug"
                    >
                      {language === 'bn' ? post.titleBn : post.titleEn}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Copyright, Developer Signature & Socials (Responsive for all screens) ── */}
      <div className="bg-black/40 border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Copyright Notice */}
          <p className="text-xs text-white/70 order-2 md:order-1">
            &copy; {new Date().getFullYear()} {language === 'bn' ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির। সর্বস্বত্ব সংরক্ষিত।' : 'Sri Sri Kalachand Bigraha Union Central Temple. All rights reserved.'}
          </p>

          {/* Developer Signature with Fine Glow */}
          <div className="order-1 md:order-2 inline-flex items-center justify-center gap-1.5 sm:gap-2 font-poppins font-medium tracking-wider sm:tracking-widest text-[10px] sm:text-xs uppercase py-1.5 px-3.5 sm:px-5 rounded-full bg-white/5 backdrop-blur-xs border border-temple-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all whitespace-nowrap select-none">
            <span className="text-white/80">DEVELOPED WITH</span>
            <FaHeart className="text-red-500 text-xs sm:text-sm animate-pulse mx-0.5 shrink-0 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
            <span className="text-white/80">BY</span>
            <span className="text-temple-gold font-bold tracking-wider drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]">PRONOB</span>
          </div>

          {/* Social Icons */}
          <div className="order-3 flex items-center justify-center gap-4 text-sm text-white/70">
            <a href="#" aria-label="Facebook" className="hover:text-temple-gold transition-colors p-1"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-temple-gold transition-colors p-1"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-temple-gold transition-colors p-1"><FaInstagram /></a>
            <a href="#" aria-label="YouTube" className="hover:text-temple-gold transition-colors p-1"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* ── Back to Top Floating Button ── */}
      <button
        onClick={scrollToTop}
        aria-label="Back to Top"
        className="fixed bottom-6 right-6 w-11 h-11 bg-temple-accent hover:bg-orange-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-40 cursor-pointer border-2 border-white/20"
      >
        <FaChevronUp className="text-sm" />
      </button>
    </footer>
  )
}
