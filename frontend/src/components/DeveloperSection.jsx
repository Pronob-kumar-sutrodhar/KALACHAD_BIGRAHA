import { FaWhatsapp, FaEnvelope, FaGlobe, FaCode, FaExternalLinkAlt, FaHeart, FaLaptopCode, FaGraduationCap } from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'

export default function DeveloperSection() {
  const { language } = useLanguage()

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-temple-dark to-black text-white overflow-hidden font-poppins select-none border-t-2 border-temple-gold/30">
      {/* ── Ambient Background Glow Effects ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-temple-accent/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-temple-gold/15 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Glassmorphic Container with Golden Glow Border */}
        <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 p-8 sm:p-12 shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:shadow-[0_0_70px_rgba(212,175,55,0.3)] transition-all duration-500">
          {/* Top Pill / Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-temple-gold/10 border border-temple-gold/40 text-temple-gold text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <FaCode className="text-xs animate-bounce" />
              <span>{language === 'bn' ? 'ওয়েবসাইট স্থপতি ও ডেভেলপার' : 'Website Architect & Lead Developer'}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Global Engineering Projects</span>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            {/* Left Column: Developer Profile */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-white/60 tracking-wider uppercase font-semibold block">
                  Crafted with Excellence By
                </span>
                <h3 className="font-lora text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-temple-gold via-orange-200 to-amber-400 tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                  PRONOB KUMAR SUTRODHAR
                </h3>
              </div>

              {/* Education & Role Badges */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/90 text-xs font-medium">
                  <FaGraduationCap className="text-temple-gold text-sm shrink-0" />
                  <span>B.Sc. in Electrical and Computer Engineering</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/90 text-xs font-medium">
                  <FaLaptopCode className="text-cyan-400 text-sm shrink-0" />
                  <span>Full-Stack Cloud & Web Engineer</span>
                </div>
              </div>

              <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-xl pt-2">
                Specialized in architecting high-performance web applications, modern responsive UI/UX, robust RESTful APIs, cloud deployments, and scalable database systems with dedication and precision.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex items-center gap-3 pt-2 text-white/60 text-xs">
                <span className="font-semibold text-white/40 uppercase tracking-wider text-[10px]">Built With:</span>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors" title="React.js"><SiReact className="text-cyan-400" /> <span className="text-[11px]">React</span></span>
                  <span className="flex items-center gap-1 hover:text-green-500 transition-colors" title="Node.js"><SiNodedotjs className="text-green-500" /> <span className="text-[11px]">Node.js</span></span>
                  <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors" title="MongoDB"><SiMongodb className="text-emerald-400" /> <span className="text-[11px]">MongoDB</span></span>
                  <span className="flex items-center gap-1 hover:text-sky-400 transition-colors" title="Tailwind CSS"><SiTailwindcss className="text-sky-400" /> <span className="text-[11px]">Tailwind</span></span>
                </div>
              </div>
            </div>

            {/* Right Column: Glowing Action Links */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801756964612"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 text-xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                      Direct WhatsApp
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-200 transition-colors font-mono">
                      +880 1756964612
                    </span>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-xs text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Email Contact Button */}
              <a
                href="mailto:kpronob74@gmail.com"
                className="group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-950/60 to-orange-900/30 border border-orange-500/30 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-orange-500/20 border border-orange-400/50 flex items-center justify-center text-orange-400 text-lg group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)]">
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
                className="group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-temple-gold/20 via-amber-500/20 to-orange-600/30 border-2 border-temple-gold hover:border-amber-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-temple-gold text-slate-900 flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.8)]">
                    <FaGlobe />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-temple-gold tracking-widest block">
                      Live Portfolio & Works
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-temple-gold transition-colors flex items-center gap-1.5">
                      Explore Pronob's Portfolio
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-temple-gold/20 flex items-center justify-center text-temple-gold group-hover:bg-temple-gold group-hover:text-slate-900 transition-all">
                  <FaExternalLinkAlt className="text-xs" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
