import { Link } from 'react-router-dom'
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaOm,
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
  FaChevronUp, FaCalendarAlt, FaHeart, FaWhatsapp,
  FaGlobe, FaCode, FaExternalLinkAlt, FaLaptopCode,
  FaGraduationCap
} from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss } from 'react-icons/si'
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
  const { language, t, settings } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const phone = settings?.phone || '+৮৮০ ১৭০০-০০০০০০'
  const email = settings?.email || 'info@krishnamatemple.org'
  const address = language === 'bn'
    ? (settings?.addressBn || 'ব্রহ্মগাছা, রায়গঞ্জ, সিরাজগঞ্জ')
    : (settings?.addressEn || 'Brahmagacha, Raiganj, Sirajganj, Bangladesh')

  return (
    <footer className="bg-temple-primary text-white relative select-none font-poppins border-t-4 border-temple-gold" aria-label="Temple Footer">
      {/* ── Top Footer Columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-white/10">
          {/* Col 1: About Mandir */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-temple-accent text-white flex items-center justify-center text-xl shadow-md">
                <FaOm />
              </div>
              <div>
                <span className="font-lora text-lg sm:text-xl font-bold text-white block">
                  {t('site_title')}
                </span>
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-temple-gold block">
                  {t('site_tagline')}
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
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-temple-gold transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-temple-gold text-xs shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-temple-gold transition-colors">{email}</a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-temple-gold text-xs shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Sacred Information */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-lora text-lg font-bold text-white border-b border-white/15 pb-2">
              {language === 'bn' ? 'পবিত্র সেবা' : 'Sacred Links'}
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link to="/about" className="hover:text-temple-gold transition-colors flex items-center gap-2">
                  <span>&rsaquo;</span>
                  <span>{language === 'bn' ? 'মন্দির পরিচিতি' : 'About Mandir'}</span>
                </Link>
              </li>
              <li>
                <Link to="/committee" className="hover:text-temple-gold transition-colors flex items-center gap-2">
                  <span>&rsaquo;</span>
                  <span>{language === 'bn' ? 'পরিচালনা কমিটি' : 'Mandir Committee'}</span>
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-temple-gold transition-colors flex items-center gap-2">
                  <span>&rsaquo;</span>
                  <span>{language === 'bn' ? 'পূজারী ও আচার্যবৃন্দ' : 'Temple Priests'}</span>
                </Link>
              </li>
              <li>
                <Link to="/donations" className="hover:text-temple-gold transition-colors flex items-center gap-2">
                  <span>&rsaquo;</span>
                  <span>{language === 'bn' ? 'অন্নদান সেবা' : 'Annadaan Seva'}</span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-temple-gold transition-colors flex items-center gap-2">
                  <span>&rsaquo;</span>
                  <span>{language === 'bn' ? 'পূজা সামগ্রী স্টোর' : 'Temple Store'}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-temple-gold transition-colors flex items-center gap-2">
                  <span>&rsaquo;</span>
                  <span>{language === 'bn' ? 'জিজ্ঞাসা (FAQ)' : 'Help & FAQs'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Daily Darshan Timings */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-lora text-lg font-bold text-white border-b border-white/15 pb-2">
              {language === 'bn' ? 'দর্শন সময়সূচী' : 'Darshan Hours'}
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              <div>
                <strong className="text-temple-gold block">{language === 'bn' ? 'ভোর আরতি:' : 'Mangala Aarti:'}</strong>
                <span>০৪:১৫ ভোর – ০৫:১৫ ভোর</span>
              </div>
              <div>
                <strong className="text-temple-gold block">{language === 'bn' ? 'মধ্যাহ্ন ভোগ:' : 'Rajbhog Darshan:'}</strong>
                <span>১২:০০ দুপুর – ০১:০০ দুপুর</span>
              </div>
              <div>
                <strong className="text-temple-gold block">{language === 'bn' ? 'সন্ধ্যা আরতি:' : 'Sandhya Aarti:'}</strong>
                <span>০৬:৩০ সন্ধ্যা – ০৮:০০ রাত</span>
              </div>
              <div>
                <strong className="text-temple-gold block">{language === 'bn' ? 'শয়ন আরতি:' : 'Shayan Aarti:'}</strong>
                <span>০৮:৩০ রাত – ০৯:০০ রাত</span>
              </div>
            </div>
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

        {/* ── Integrated Glowing Developer Showcase Card (Very little space after main content) ── */}
        <div className="mt-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.28)] transition-all duration-500">
          {/* Top Pill / Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-temple-gold/10 border border-temple-gold/40 text-temple-gold text-[11px] font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <FaCode className="text-xs animate-bounce" />
              <span>{language === 'bn' ? 'ওয়েবসাইট স্থপতি ও ডেভেলপার' : 'Website Architect & Lead Developer'}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Global Engineering Projects</span>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-6">
            {/* Left Column: Developer Profile */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="space-y-0.5">
                <span className="text-[11px] text-white/60 tracking-wider uppercase font-semibold block">
                  Crafted with Excellence By
                </span>
                <h3 className="font-lora text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-temple-gold via-orange-200 to-amber-400 tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                  PRONOB KUMAR SUTRODHAR
                </h3>
              </div>

              {/* Education & Role Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/90 text-xs font-medium">
                  <FaGraduationCap className="text-temple-gold text-xs shrink-0" />
                  <span>B.Sc. in Electrical and Computer Engineering</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/90 text-xs font-medium">
                  <FaLaptopCode className="text-cyan-400 text-xs shrink-0" />
                  <span>Full-Stack Cloud & Web Engineer</span>
                </div>
              </div>

              <p className="text-white/70 text-xs leading-relaxed max-w-xl">
                Specialized in architecting high-performance web applications, modern responsive UI/UX, robust RESTful APIs, cloud deployments, and scalable database systems with dedication and precision.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex items-center gap-3 pt-1 text-white/60 text-xs">
                <span className="font-semibold text-white/40 uppercase tracking-wider text-[10px]">Built With:</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors" title="React.js"><SiReact className="text-cyan-400" /> <span className="text-[11px]">React</span></span>
                  <span className="flex items-center gap-1 hover:text-green-500 transition-colors" title="Node.js"><SiNodedotjs className="text-green-500" /> <span className="text-[11px]">Node.js</span></span>
                  <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors" title="MongoDB"><SiMongodb className="text-emerald-400" /> <span className="text-[11px]">MongoDB</span></span>
                  <span className="flex items-center gap-1 hover:text-sky-400 transition-colors" title="Tailwind CSS"><SiTailwindcss className="text-sky-400" /> <span className="text-[11px]">Tailwind</span></span>
                </div>
              </div>
            </div>

            {/* Right Column: Glowing Action Links */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801756964612"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 text-lg group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                      Direct WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-200 transition-colors font-mono">
                      +880 1756964612
                    </span>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-xs text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Email Contact Button */}
              <a
                href="mailto:kpronob74@gmail.com"
                className="group relative flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-orange-950/60 to-orange-900/30 border border-orange-500/30 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-400/50 flex items-center justify-center text-orange-400 text-base group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider block">
                      Official Email
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-200 transition-colors">
                      kpronob74@gmail.com
                    </span>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-xs text-orange-400/60 group-hover:text-orange-300 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Live Portfolio Button (Featured Glowing Action) */}
              <a
                href="https://portfolio-steel-nu-kpv23i024a.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-temple-gold/20 via-amber-500/20 to-orange-600/30 border-2 border-temple-gold hover:border-amber-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-temple-gold text-slate-900 flex items-center justify-center text-base font-bold group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.8)]">
                    <FaGlobe />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-temple-gold tracking-widest block">
                      Live Portfolio & Works
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-temple-gold transition-colors flex items-center gap-1">
                      Explore Pronob's Portfolio
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-temple-gold/20 flex items-center justify-center text-temple-gold group-hover:bg-temple-gold group-hover:text-slate-900 transition-all">
                  <FaExternalLinkAlt className="text-[10px]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Copyright, Developer Signature & Socials ── */}
      <div className="bg-black/40 border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Copyright Notice */}
          <p className="text-xs text-white/70 order-2 md:order-1">
            &copy; {new Date().getFullYear()} {language === 'bn' ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির। সর্বস্বত্ব সংরক্ষিত।' : 'Sri Sri Kalachand Bigraha Union Central Temple. All rights reserved.'}
          </p>

          {/* Developer Signature with Fine Glow */}
          <a
            href="https://portfolio-steel-nu-kpv23i024a.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="order-1 md:order-2 inline-flex items-center justify-center gap-1.5 sm:gap-2 font-poppins font-medium tracking-wider sm:tracking-widest text-[10px] sm:text-xs uppercase py-1.5 px-3.5 sm:px-5 rounded-full bg-white/5 backdrop-blur-xs border border-temple-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.8)] hover:scale-105 transition-all whitespace-nowrap select-none cursor-pointer"
            title="View Pronob Kumar Sutradhar's Portfolio"
          >
            <span className="text-white/80">DEVELOPED WITH</span>
            <FaHeart className="text-red-500 text-xs sm:text-sm animate-pulse mx-0.5 shrink-0 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
            <span className="text-white/80">BY</span>
            <span className="text-temple-gold font-bold tracking-wider drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]">PRONOB KUMAR SUTRODHAR</span>
          </a>

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
        <FaChevronUp />
      </button>
    </footer>
  )
}
