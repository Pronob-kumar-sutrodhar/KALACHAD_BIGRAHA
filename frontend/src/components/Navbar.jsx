import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FaPhoneAlt, FaEnvelope, FaSearch, FaShoppingCart,
  FaBars, FaTimes, FaChevronDown, FaFacebookF,
  FaInstagram, FaYoutube, FaOm, FaCircle,
  FaTrash, FaSignInAlt, FaUserCheck, FaGlobe, FaUserShield
} from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { cartItems, removeFromCart, cartCount, cartTotal } = useCart()
  const { user, logout } = useAuth()
  const { language, toggleLanguage, t, formatMoney } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const cartRef = useRef(null)

  const navLinks = [
    { label: t('nav_home'), href: '/' },
    { label: t('nav_about'), href: '/about' },
    {
      label: t('nav_events'),
      href: '/events',
      dropdown: [
        { label: t('nav_events_upcoming'), href: '/events' },
        { label: t('nav_events_schedule'), href: '/events/1' },
      ],
    },
    {
      label: t('nav_donation'),
      href: '/donations',
      dropdown: [
        { label: t('nav_donation_all'), href: '/donations' },
        { label: t('nav_donation_annadaan'), href: '/donations/1' },
      ],
    },
    {
      label: t('nav_shop'),
      href: '/shop',
      dropdown: [
        { label: t('nav_shop_store'), href: '/shop' },
        { label: t('nav_shop_cart'), href: '/cart' },
        { label: t('nav_shop_checkout'), href: '/checkout' },
      ],
    },
    {
      label: t('nav_blog'),
      href: '/blog',
      dropdown: [
        { label: t('nav_blog_articles'), href: '/blog' },
        { label: 'গীতা মাহাত্ম্য ও প্রবন্ধ', href: '/blog/1' },
      ],
    },
    {
      label: t('nav_pages'),
      href: '#',
      dropdown: [
        { label: t('nav_team'), href: '/team' },
        { label: t('nav_faq'), href: '/faq' },
        { label: t('nav_login'), href: '/login' },
      ],
    },
    { label: t('nav_contact'), href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile drawer on route change
  const currentPath = location.pathname
  const prevPathRef = useRef(currentPath)
  useEffect(() => {
    if (prevPathRef.current !== currentPath) {
      setMobileOpen(false)
      setActiveDropdown(null)
      prevPathRef.current = currentPath
    }
  }, [currentPath])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="w-full relative z-40 font-poppins">
      {/* ── Top Bar ── */}
      <div className="bg-temple-primary text-white text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          {/* Left: Phone & Email */}
          <div className="flex items-center gap-6 text-white/85">
            <a href="tel:+8801700000000" className="flex items-center gap-2 hover:text-temple-gold transition-colors">
              <FaPhoneAlt className="text-temple-accent text-[10px]" />
              <span>+৮৮০ ১৭০০-০০০০০০</span>
            </a>
            <a href="mailto:info@krishnamatemple.org" className="flex items-center gap-2 hover:text-temple-gold transition-colors">
              <FaEnvelope className="text-temple-accent text-[10px]" />
              <span>info@krishnamatemple.org</span>
            </a>
          </div>

          {/* Middle Links */}
          <div className="flex items-center gap-6 font-semibold tracking-wider text-[11px] text-white/70">
            <Link to="/events" className="hover:text-temple-gold transition-colors">{t('events')}</Link>
            <span>&bull;</span>
            <Link to="/blog" className="hover:text-temple-gold transition-colors">{t('sermons')}</Link>
            <span>&bull;</span>
            <Link to="/about" className="hover:text-temple-gold transition-colors">{t('ministries')}</Link>
          </div>

          {/* Right: Language Switcher, Live Darshan & Socials */}
          <div className="flex items-center gap-4">
            {/* Admin CMS Button */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 bg-temple-gold hover:bg-white text-temple-primary px-2.5 py-1 text-xs font-bold rounded-xs shadow-xs transition-all"
              title="Temple Administration Portal"
            >
              <FaUserShield className="text-[11px]" />
              <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin CMS'}</span>
            </Link>

            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-1.5 bg-temple-accent/90 hover:bg-temple-accent text-white px-2.5 py-1 text-xs font-semibold rounded-xs border border-temple-gold/40 shadow-xs transition-all cursor-pointer"
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
            >
              <FaGlobe className="text-[11px] text-temple-gold" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            <div className="flex items-center gap-1.5 text-temple-gold font-semibold uppercase tracking-wider text-[11px]">
              <FaCircle className="text-green-400 text-[8px] animate-pulse" />
              <span>{t('live_darshan')}</span>
            </div>

            <div className="flex items-center gap-3 text-white/70 border-l border-white/20 pl-3">
              <a href="#" aria-label="Facebook" className="hover:text-temple-gold transition-colors"><FaFacebookF className="text-[11px]" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-temple-gold transition-colors"><FaInstagram className="text-[11px]" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-temple-gold transition-colors"><FaYoutube className="text-[11px]" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Sticky Navigation ── */}
      <nav
        className={`w-full bg-white transition-all duration-300 ${
          scrolled ? 'sticky top-0 shadow-lg py-2.5' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-temple-primary text-temple-gold flex items-center justify-center text-2xl shadow-sm border border-temple-gold/40 group-hover:bg-temple-accent group-hover:text-white transition-all">
              <FaOm />
            </div>
            <div className="leading-tight">
              <span className="font-lora text-xl sm:text-2xl font-bold text-temple-primary block group-hover:text-temple-accent transition-colors">
                {language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ' : 'Krishna'}
              </span>
              <span className="text-[10px] font-semibold tracking-[2px] uppercase text-gray-500 block">
                {language === 'bn' ? 'মহা মন্দির সেবাশ্রম' : 'Mega Temple'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const hasDropdown = Boolean(link.dropdown)
              const isActive = location.pathname === link.href

              return (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`font-lora text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-temple-accent'
                        : 'text-gray-800 hover:text-temple-accent'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <FaChevronDown className="text-[9px] opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border-t-2 border-temple-accent py-2 animate-fadeIn z-50">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-temple-accent transition-colors border-b border-gray-50 last:border-0"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile & Small Screen Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="lg:hidden text-xs font-bold bg-orange-50 text-temple-accent px-2 py-1 border border-temple-accent/30 cursor-pointer"
            >
              {language === 'bn' ? 'EN' : 'বাং'}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search Mandir Store and Events"
              className="text-gray-700 hover:text-temple-accent text-base p-2 transition-colors cursor-pointer"
            >
              <FaSearch />
            </button>

            {/* Cart Icon & Dropdown */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                aria-label="View Shopping Cart"
                className="text-gray-700 hover:text-temple-accent text-base p-2 transition-colors relative cursor-pointer"
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-temple-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown Preview */}
              {cartOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white shadow-2xl border-t-2 border-temple-accent p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between border-b pb-2 mb-3">
                    <span className="font-lora font-bold text-temple-primary text-sm">
                      {t('nav_shop_cart')} ({cartCount})
                    </span>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="py-6 text-center text-gray-400 text-xs">
                      {t('cart_empty')}
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item._id || item.id} className="flex items-center gap-3 border-b border-gray-100 pb-2">
                          <img
                            src={item.image || '/assets/img/products/new/1.webp'}
                            alt={item.name}
                            className="w-10 h-10 object-cover bg-slate-100"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                            <p className="text-[11px] text-gray-500">
                              {item.quantity} &times; <strong className="text-temple-accent">{formatMoney(item.price)}</strong>
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id || item.id)}
                            className="text-gray-400 hover:text-red-500 text-xs p-1"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {cartItems.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 space-y-2.5">
                      <div className="flex justify-between text-xs font-bold text-gray-800">
                        <span>{t('cart_subtotal')}:</span>
                        <span className="text-temple-accent font-lora text-sm">{formatMoney(cartTotal)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/cart"
                          onClick={() => setCartOpen(false)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-lora text-[11px] uppercase tracking-wider font-semibold py-2 transition-colors"
                        >
                          {t('nav_shop_cart')}
                        </Link>
                        <Link
                          to="/checkout"
                          onClick={() => setCartOpen(false)}
                          className="bg-temple-accent hover:bg-orange-700 text-white text-center font-lora text-[11px] uppercase tracking-wider font-semibold py-2 transition-colors"
                        >
                          {t('nav_shop_checkout')}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Devotee Login / Account / Admin */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-temple-primary bg-orange-50 px-3 py-1.5 border border-temple-accent/30">
                <FaUserCheck className="text-temple-accent" />
                <span className="truncate max-w-[90px]">{user.name}</span>
                <Link
                  to="/admin"
                  className="bg-temple-accent hover:bg-orange-700 text-white text-[10px] px-1.5 py-0.5 font-bold transition-colors"
                >
                  Admin
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-red-600 text-[10px] ml-1 cursor-pointer">
                  (লগআউট)
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-temple-accent transition-colors"
              >
                <FaSignInAlt className="text-temple-accent" />
                <span>{t('devotee_portal')}</span>
              </Link>
            )}

            {/* Quick Donate Button */}
            <Link
              to="/donations"
              className="hidden md:inline-flex bg-temple-accent hover:bg-temple-primary text-white font-lora text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors"
            >
              {t('donate_seva')}
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Mobile Navigation"
              className="lg:hidden text-temple-primary hover:text-temple-accent text-xl p-2 cursor-pointer"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* ── Mobile Responsive Menu Drawer ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
            {/* Language Switcher in Drawer */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-600">ভাষা পরিবর্তন / Language:</span>
              <button
                onClick={toggleLanguage}
                className="bg-temple-primary text-temple-gold px-3 py-1 text-xs font-bold flex items-center gap-1.5"
              >
                <FaGlobe />
                <span>{language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}</span>
              </button>
            </div>

            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-gray-100 last:border-0 pb-1">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.label ? null : link.label)
                      }
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-temple-accent"
                    >
                      <span>{link.label}</span>
                      <FaChevronDown
                        className={`text-xs transition-transform ${
                          activeDropdown === link.label ? 'rotate-180 text-temple-accent' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="pl-4 pb-2 space-y-1.5 bg-gray-50 pt-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="block text-xs text-gray-600 hover:text-temple-accent py-1"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="block py-2 text-sm font-semibold text-gray-800 hover:text-temple-accent"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="bg-temple-gold text-temple-primary hover:bg-yellow-500 font-bold w-full text-center py-2.5 text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <FaUserShield />
                <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল / CMS' : 'Admin CMS Portal'}</span>
              </Link>
              <Link
                to="/donations"
                className="kr-btn-custom w-full text-center"
              >
                {t('donate_seva')}
              </Link>
              <Link
                to="/login"
                className="btn-secondary w-full text-center"
              >
                {t('devotee_portal')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Global Search Popup Modal ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-temple-primary/95 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl text-center">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="inline-flex items-center gap-2 text-temple-gold text-xs font-semibold uppercase tracking-[3px] mb-3">
              <FaOm />
              <span>{t('site_title')}</span>
            </div>

            <h3 className="font-lora text-2xl sm:text-3xl font-bold text-white mb-6">
              পূজা, ধর্মগ্রন্থ, বিগ্রহ ও উৎসব অনুসন্ধান
            </h3>

            <form onSubmit={handleSearch} className="flex gap-2 bg-white p-2 shadow-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="flex-1 px-4 py-3 text-sm text-gray-800 focus:outline-hidden"
                autoFocus
              />
              <button
                type="submit"
                className="bg-temple-accent hover:bg-temple-primary text-white font-lora text-xs uppercase tracking-wider font-semibold px-6 py-3 transition-colors cursor-pointer"
              >
                অনুসন্ধান
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-white/70">
              <span className="font-semibold">জনপ্রিয়:</span>
              <button onClick={() => navigate('/events')} className="underline hover:text-temple-gold">জন্মাষ্টমী</button>
              <span>&bull;</span>
              <button onClick={() => navigate('/shop')} className="underline hover:text-temple-gold">শ্রীমদ্ভগবদ্গীতা</button>
              <span>&bull;</span>
              <button onClick={() => navigate('/donations')} className="underline hover:text-temple-gold">অন্নদান সেবা</button>
              <span>&bull;</span>
              <button onClick={() => navigate('/events')} className="underline hover:text-temple-gold">নিত্য আরতি</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
