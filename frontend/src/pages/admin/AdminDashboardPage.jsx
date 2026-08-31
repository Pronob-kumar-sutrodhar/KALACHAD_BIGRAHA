import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import {
  FaHeart, FaShoppingCart, FaPrayingHands, FaCalendarAlt,
  FaBoxOpen, FaBookOpen, FaEnvelope, FaCheckCircle,
  FaArrowRight, FaPlus, FaMoneyBillWave, FaClock
} from 'react-icons/fa'

export default function AdminDashboardPage() {
  const { language, formatMoney } = useLanguage()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/settings/admin-stats')
        setData(res.data)
      } catch (err) {
        console.error('Failed to load admin stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <LoadingSpinner />

  const m = data?.metrics || {}

  const kpis = [
    {
      titleBn: 'মোট সেবা অনুদান সংগ্রহ',
      titleEn: 'Total Seva Donations',
      value: formatMoney(m.totalDonationsRaised || 0),
      subtitleBn: `${m.totalDonorsCount || 0} জন দাতা অংশ নিয়েছেন`,
      subtitleEn: `${m.totalDonorsCount || 0} Devotee Donors`,
      icon: FaHeart,
      bg: 'bg-emerald-600',
      link: '/admin/donations',
    },
    {
      titleBn: 'স্টোর মোট বিক্রয় রাজস্ব',
      titleEn: 'Total Store Sales',
      value: formatMoney(m.totalStoreRevenue || 0),
      subtitleBn: `${m.totalOrdersCount || 0}টি অর্ডার সম্পন্ন`,
      subtitleEn: `${m.totalOrdersCount || 0} Total Orders`,
      icon: FaMoneyBillWave,
      bg: 'bg-indigo-600',
      link: '/admin/orders',
    },
    {
      titleBn: 'সক্রিয় পূজা ও সংকল্প বুকিং',
      titleEn: 'Active Puja Sankalps',
      value: `${m.activePujaBookings || 0} টি`,
      subtitleBn: 'ভক্তদের নাম ও গোত্রে আরতি',
      subtitleEn: 'Devotee Chanting Bookings',
      icon: FaPrayingHands,
      bg: 'bg-amber-600',
      link: '/admin/pujas',
    },
    {
      titleBn: 'উৎসব ও মেলা উপস্থিতি (RSVP)',
      titleEn: 'Festival RSVPs',
      value: `${m.totalFestivalRsvps || 0} জন`,
      subtitleBn: 'আগামী মহোৎসবে নিবন্ধিত ভক্ত',
      subtitleEn: 'Registered Devotees',
      icon: FaCalendarAlt,
      bg: 'bg-rose-600',
      link: '/admin/events',
    },
  ]

  return (
    <div className="space-y-8 font-poppins">
      {/* ── Welcome Header ── */}
      <div className="bg-white p-6 sm:p-8 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির কন্ট্রোল সিস্টেম' : 'Mandir Administration Console'}
          </span>
          <h2 className="font-lora text-2xl sm:text-3xl font-bold text-temple-primary">
            {language === 'bn' ? 'সার্বিক কার্যবিবরণী ও পরিসংখ্যান' : 'Temple Operations & Analytics'}
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            {language === 'bn'
              ? 'মন্দিরের সমস্ত পণ্য, অনুদান তহবিল, পূজা বুকিং, উৎসব ও বাণী এখান থেকে সরাসরি নিয়ন্ত্রণ করুন।'
              : 'Manage products, seva campaigns, puja rituals, devotee prayers, and discourses in real-time.'}
          </p>
        </div>

        {/* Quick Add Buttons */}
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/products"
            className="kr-btn-custom py-2 px-3 text-xs flex items-center gap-1.5"
          >
            <FaPlus className="text-[10px]" />
            <span>{language === 'bn' ? 'নতুন পণ্য যোগ' : 'Add Product'}</span>
          </Link>
          <Link
            to="/admin/donations"
            className="btn-secondary py-2 px-3 text-xs flex items-center gap-1.5"
          >
            <FaPlus className="text-[10px]" />
            <span>{language === 'bn' ? 'নতুন সেবা প্রকল্প' : 'New Campaign'}</span>
          </Link>
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Link
              key={idx}
              to={kpi.link}
              className="bg-white border border-gray-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 line-clamp-1">
                  {language === 'bn' ? kpi.titleBn : kpi.titleEn}
                </span>
                <div className={`w-10 h-10 ${kpi.bg} text-white flex items-center justify-center text-base shadow-xs`}>
                  <Icon />
                </div>
              </div>

              <div>
                <span className="font-lora text-2xl font-bold text-temple-primary block">
                  {kpi.value}
                </span>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  {language === 'bn' ? kpi.subtitleBn : kpi.subtitleEn}
                </span>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-temple-accent font-semibold group-hover:translate-x-1 transition-transform">
                <span>{language === 'bn' ? 'বিবরণ ও পরিচালনা' : 'Manage Section'}</span>
                <FaArrowRight className="text-[10px]" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── Secondary Quick Metric Counts ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-temple-light text-temple-primary flex items-center justify-center text-lg">
            <FaBoxOpen />
          </div>
          <div>
            <span className="text-xs text-gray-500 block">{language === 'bn' ? 'মোট পণ্য সংখ্যা' : 'Store Products'}</span>
            <strong className="font-lora text-lg text-temple-primary">{m.productsCount || 0} টি</strong>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-temple-light text-temple-primary flex items-center justify-center text-lg">
            <FaBookOpen />
          </div>
          <div>
            <span className="text-xs text-gray-500 block">{language === 'bn' ? 'ধর্মপ্রবন্ধ সংখ্যা' : 'Katha Blogs'}</span>
            <strong className="font-lora text-lg text-temple-primary">{m.blogsCount || 0} টি</strong>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-temple-light text-temple-primary flex items-center justify-center text-lg">
            <FaEnvelope />
          </div>
          <div>
            <span className="text-xs text-gray-500 block">{language === 'bn' ? 'প্রার্থনা বার্তা' : 'Prayers / Msg'}</span>
            <strong className="font-lora text-lg text-temple-primary">{m.contactsCount || 0} টি</strong>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-temple-light text-temple-primary flex items-center justify-center text-lg">
            <FaCheckCircle className="text-green-600" />
          </div>
          <div>
            <span className="text-xs text-gray-500 block">{language === 'bn' ? 'নিবন্ধিত সদস্য' : 'Devotees'}</span>
            <strong className="font-lora text-lg text-temple-primary">{m.usersCount || 0} জন</strong>
          </div>
        </div>
      </div>

      {/* ── Recent Activity Tables Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-white border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-lora text-lg font-bold text-temple-primary flex items-center gap-2">
              <FaShoppingCart className="text-temple-accent" />
              <span>{language === 'bn' ? 'সাম্প্রতিক স্টোর অর্ডারসমূহ' : 'Recent Store Orders'}</span>
            </h3>
            <Link to="/admin/orders" className="text-xs text-temple-accent hover:underline font-semibold">
              {language === 'bn' ? 'সকল দেখুন' : 'View All'}
            </Link>
          </div>

          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto text-xs">
            {(data?.recentOrders || []).length === 0 ? (
              <p className="text-gray-400 py-4 text-center">{language === 'bn' ? 'কোনো অর্ডার পাওয়া যায়নি' : 'No orders yet'}</p>
            ) : (
              data.recentOrders.map((ord) => (
                <div key={ord._id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-800 block">{ord._id.substring(0, 10)}...</span>
                    <span className="text-[11px] text-gray-400">
                      {ord.orderItems?.length || 1} {language === 'bn' ? 'সামগ্রী' : 'items'} &bull; {ord.paymentMethod}
                    </span>
                  </div>
                  <div className="text-right">
                    <strong className="font-lora text-temple-accent font-bold block">{formatMoney(ord.totalPrice)}</strong>
                    <span className={`text-[10px] px-1.5 py-0.5 font-semibold ${
                      ord.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {ord.isPaid ? (language === 'bn' ? 'পরিশোধিত' : 'PAID') : (language === 'bn' ? 'অপেক্ষমাণ' : 'PENDING')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Devotee Puja Bookings */}
        <div className="bg-white border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-lora text-lg font-bold text-temple-primary flex items-center gap-2">
              <FaPrayingHands className="text-temple-accent" />
              <span>{language === 'bn' ? 'সাম্প্রতিক পূজা সংকল্প বুকিং' : 'Recent Puja Sankalps'}</span>
            </h3>
            <Link to="/admin/pujas" className="text-xs text-temple-accent hover:underline font-semibold">
              {language === 'bn' ? 'সকল দেখুন' : 'View All'}
            </Link>
          </div>

          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto text-xs">
            {(data?.recentBookings || []).length === 0 ? (
              <p className="text-gray-400 py-4 text-center">{language === 'bn' ? 'কোনো পূজা বুকিং পাওয়া যায়নি' : 'No bookings yet'}</p>
            ) : (
              data.recentBookings.map((b) => (
                <div key={b._id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-800 block">{b.devoteeName} ({b.gotra || 'ভক্ত'})</span>
                    <span className="text-[11px] text-gray-400 line-clamp-1">
                      {b.pujaTitle} &bull; {b.timeSlot}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-500 flex items-center gap-1 justify-end">
                      <FaClock className="text-[9px]" />
                      {b.date}
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 font-semibold">
                      {b.status || 'Confirmed'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
