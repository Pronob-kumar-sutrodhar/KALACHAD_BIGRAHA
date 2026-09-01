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

        {/* ── Integrated Glowing Developer Showcase Card (Compact & Slim Version) ── */}
        <div className="mt-6 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 p-4 sm:p-5 shadow-[0_0_25px_rgba(212,175,55,0.12)] hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] transition-all duration-300">
          {/* Top Pill / Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-[10px]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-temple-gold/10 border border-temple-gold/40 text-temple-gold font-semibold uppercase tracking-wider">
              <FaCode className="text-[10px]" />
              <span>{language === 'bn' ? 'ওয়েবসাইট স্থপতি ও ডেভেলপার' : 'Website Architect & Lead Developer'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Global Engineering Projects</span>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-3.5">
            {/* Left Column: Developer Profile */}
            <div className="lg:col-span-7 space-y-2">
              <div className="space-y-0.5">
                <span className="text-[9px] text-white/50 tracking-widest uppercase font-semibold block">
                  Crafted with Excellence By
                </span>
                <h3 className="font-lora text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-temple-gold via-orange-200 to-amber-400 tracking-wide leading-tight drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                  PRONOB KUMAR SUTRODHAR
                </h3>
              </div>

              {/* Education & Role Badges */}
              <div className="flex flex-wrap gap-1.5">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90 text-[10px] font-medium">
                  <FaGraduationCap className="text-temple-gold text-xs shrink-0" />
                  <span>B.Sc. in Electrical and Computer Engineering</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90 text-[10px] font-medium">
                  <FaLaptopCode className="text-cyan-400 text-xs shrink-0" />
                  <span>Full-Stack Cloud & Web Engineer</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex items-center gap-2 pt-0.5 text-white/50 text-[10px]">
                <span className="font-semibold text-white/40 uppercase tracking-wider text-[9px]">Stack:</span>
                <div className="flex items-center gap-2.5 text-[11px]">
                  <span className="flex items-center gap-1 text-cyan-400" title="React.js"><SiReact /> <span className="text-[10px] text-white/70">React</span></span>
                  <span className="flex items-center gap-1 text-green-500" title="Node.js"><SiNodedotjs /> <span className="text-[10px] text-white/70">Node.js</span></span>
                  <span className="flex items-center gap-1 text-emerald-400" title="MongoDB"><SiMongodb /> <span className="text-[10px] text-white/70">MongoDB</span></span>
                  <span className="flex items-center gap-1 text-sky-400" title="Tailwind CSS"><SiTailwindcss /> <span className="text-[10px] text-white/70">Tailwind</span></span>
                </div>
              </div>
            </div>

            {/* Right Column: Glowing Action Links */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801756964612"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-1.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block">
                      Direct WhatsApp
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-200 font-mono">
                      +880 1756964612
                    </span>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-[10px] text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email Contact Button */}
              <a
                href="mailto:kpronob74@gmail.com"
                className="group flex items-center justify-between py-1.5 px-3 rounded-lg bg-orange-950/40 border border-orange-500/30 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider block">
                      Official Email
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-orange-200 truncate max-w-[200px]">
                      kpronob74@gmail.com
                    </span>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-[10px] text-orange-400/60 group-hover:text-orange-300 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Live Portfolio Button */}
              <a
                href="https://portfolio-steel-nu-kpv23i024a.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-1.5 px-3 rounded-lg bg-gradient-to-r from-temple-gold/15 to-amber-500/20 border border-temple-gold hover:border-amber-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-temple-gold text-slate-900 flex items-center justify-center text-xs font-bold shrink-0">
                    <FaGlobe />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-temple-gold tracking-wider block">
                      Live Portfolio & Works
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-temple-gold">
                      Explore Pronob's Portfolio
                    </span>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-[10px] text-temple-gold group-hover:translate-x-0.5 transition-transform" />
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
