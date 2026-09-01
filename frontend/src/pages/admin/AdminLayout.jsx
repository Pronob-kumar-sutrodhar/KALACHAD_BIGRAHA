import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import {
  FaChartPie, FaBoxOpen, FaHeart, FaPrayingHands,
  FaCalendarAlt, FaBookOpen, FaShoppingCart, FaEnvelope,
  FaCog, FaSignOutAlt, FaHome, FaBars, FaTimes,
  FaOm, FaUserShield, FaUsers
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import api from '../../services/api'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const { language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    // Check if user is logged in as admin
    if (!user) {
      toast.error(language === 'bn' ? 'অ্যাডমিন পোর্টালে প্রবেশের জন্য লগইন করুন' : 'Please log in to access the admin portal')
      navigate('/login')
      return
    }

    // Fetch live counts
    api.get('/api/settings/admin-stats')
      .then((res) => setStats(res.data?.metrics))
      .catch(() => {})
  }, [user, navigate, language])

  const menuItems = [
    {
      path: '/admin',
      exact: true,
      labelBn: 'ওভারভিউ ড্যাশবোর্ড',
      labelEn: 'Dashboard Overview',
      icon: FaChartPie,
    },
    {
      path: '/admin/products',
      labelBn: 'পণ্য ভাণ্ডার (স্টোর)',
      labelEn: 'Products & Store',
      icon: FaBoxOpen,
      badge: stats?.productsCount,
    },
    {
      path: '/admin/donations',
      labelBn: 'সেবা প্রকল্প ও অনুদান',
      labelEn: 'Donation Campaigns',
      icon: FaHeart,
      badge: stats?.totalDonorsCount,
    },
    {
      path: '/admin/pujas',
      labelBn: 'পূজা ও সংকল্প বুকিং',
      labelEn: 'Pujas & Bookings',
      icon: FaPrayingHands,
      badge: stats?.activePujaBookings,
    },
    {
      path: '/admin/events',
      labelBn: 'উৎসব ও মেলা ক্যালেন্ডার',
      labelEn: 'Festivals & RSVPs',
      icon: FaCalendarAlt,
      badge: stats?.eventsCount,
    },
    {
      path: '/admin/blogs',
      labelBn: 'ধর্মকথা ও প্রবন্ধ (ব্লগ)',
      labelEn: 'Discourses & Blog',
      icon: FaBookOpen,
      badge: stats?.blogsCount,
    },
    {
      path: '/admin/orders',
      labelBn: 'অর্ডার ও ডেলিভারি',
      labelEn: 'Orders & Shipments',
      icon: FaShoppingCart,
      badge: stats?.totalOrdersCount,
    },
    {
      path: '/admin/committee',
      labelBn: 'মন্দির পরিচালনা কমিটি',
      labelEn: 'Mandir Committee',
      icon: FaUsers,
      badge: stats?.committeeCount,
    },
    {
      path: '/admin/inquiries',
      labelBn: 'বার্তা ও প্রার্থনা অনুরোধ',
      labelEn: 'Prayers & Inquiries',
      icon: FaEnvelope,
      badge: stats?.contactsCount,
    },
    {
      path: '/admin/settings',
      labelBn: 'মন্দির সেটিংস ও ব্যানার',
      labelEn: 'Site CMS & Settings',
      icon: FaCog,
    },
  ]

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    toast.success(language === 'bn' ? 'লগআউট সফল হয়েছে' : 'Logged out successfully')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-poppins select-none">
      {/* ── Top Header ── */}
      <header className="bg-temple-primary text-white border-b-2 border-temple-gold px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xs cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-temple-accent text-white flex items-center justify-center text-lg shadow-xs">
              <FaOm />
            </div>
            <div>
              <h1 className="font-lora text-base sm:text-lg font-bold text-white leading-none">
                {language === 'bn' ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ কেন্দ্রীয় মন্দির CMS' : 'Kalachand Bigraha Union Central Temple CMS'}
              </h1>
              <span className="text-[10px] text-temple-gold font-mono tracking-wider">
                LIVE PRODUCTION CMS &bull; BDT STANDARD
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 transition-colors border border-white/20"
          >
            <FaHome className="text-temple-gold" />
            <span>{language === 'bn' ? 'মূল ওয়েবসাইট দেখুন' : 'View Live Website'}</span>
          </Link>

          <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 border border-white/10">
            <FaUserShield className="text-temple-gold text-xs" />
            <span className="text-xs font-semibold text-white truncate max-w-[120px]">
              {user?.name || 'Chief Priest'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-temple-accent hover:bg-orange-700 text-white text-xs px-3 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Logout"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
          </button>
        </div>
      </header>

      {/* ── Main Layout Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-temple-dark text-white transform transition-transform duration-300 ease-in-out flex flex-col justify-between shrink-0 shadow-2xl lg:shadow-none border-r border-white/10 ${
            sidebarOpen ? 'translate-x-0 top-[60px]' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-temple-gold tracking-widest">
              {language === 'bn' ? 'কন্ট্রোল প্যানেল মেনু' : 'ADMINISTRATION MENU'}
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path, item.exact)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-all rounded-xs ${
                    active
                      ? 'bg-temple-accent text-white font-bold shadow-sm border-l-4 border-temple-gold'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`text-sm ${active ? 'text-temple-gold' : 'text-white/60'}`} />
                    <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      active ? 'bg-temple-primary text-temple-gold' : 'bg-white/20 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-white/10 bg-black/40 text-[11px] text-white/60 space-y-2">
            <p className="font-semibold text-white/80">Sri Sri Kalachand Bigraha Central Temple</p>
            <p>Database: MongoDB Atlas (Live)</p>
            <p className="text-[10px] text-temple-gold">Currency: BDT (৳) &bull; Stripe Gateway</p>

            <div className="pt-2">
              <div className="inline-flex items-center justify-center gap-1.5 font-medium tracking-wider text-[9px] uppercase py-1 px-2.5 rounded-full bg-white/5 border border-temple-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.3)] whitespace-nowrap">
                <span className="text-white/80">DEVELOPED WITH</span>
                <FaHeart className="text-red-500 text-[10px] animate-pulse shrink-0 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
                <span className="text-white/80">BY</span>
                <span className="text-temple-gold font-bold tracking-wider drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]">PRONOB</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Outlet Area */}
        <main className="flex-1 bg-slate-100 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-62px)] flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>

          <div className="max-w-7xl mx-auto w-full pt-8 pb-4 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 font-poppins font-medium tracking-wider sm:tracking-widest text-[10px] sm:text-xs uppercase py-1.5 px-3.5 sm:px-5 rounded-full bg-temple-primary text-white/80 border border-temple-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_22px_rgba(212,175,55,0.5)] transition-all whitespace-nowrap select-none">
              <span>DEVELOPED WITH</span>
              <FaHeart className="text-red-500 text-xs sm:text-sm animate-pulse mx-0.5 shrink-0 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
              <span>BY</span>
              <span className="text-temple-gold font-bold tracking-wider drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]">PRONOB</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
