import { Link } from 'react-router-dom'
import { FaHome, FaChevronRight, FaOm } from 'react-icons/fa'

export default function PageBanner({ title, subtitle, breadcrumb = [] }) {
  return (
    <div
      className="relative bg-cover bg-center py-20 md:py-24 px-4 overflow-hidden"
      style={{ backgroundImage: `url('/assets/img/banner/s1.webp')` }}
      aria-label={title}
    >
      {/* Dark Teal / Slate Overlay with Soft Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-temple-primary/95 via-temple-primary/90 to-temple-dark/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Rising particles */}
      <div className="kr-particles">
        <span />
        <span />
        <span />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Title */}
        <div className="space-y-2">
          {subtitle ? (
            <div className="inline-flex items-center gap-2 text-temple-gold font-semibold uppercase tracking-[3px] text-xs">
              <FaOm className="text-xs" />
              <span>{subtitle}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 text-temple-gold font-semibold uppercase tracking-[3px] text-xs">
              <FaOm className="text-xs" />
              <span>Krishna Mega Temple</span>
            </div>
          )}
          <h1 className="font-lora text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {title}
          </h1>
        </div>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-sm text-white/80 bg-black/30 px-4 py-2 border border-white/10 backdrop-blur-xs">
          <Link to="/" className="flex items-center gap-1.5 hover:text-temple-gold transition-colors font-medium">
            <FaHome className="text-temple-gold text-xs" />
            <span>Home</span>
          </Link>

          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <FaChevronRight className="text-temple-gold text-[10px] opacity-70" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-temple-gold transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-temple-gold font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}
