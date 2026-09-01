import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import toast from 'react-hot-toast'
import {
  FaUser, FaLock, FaEnvelope, FaSignInAlt,
  FaUserPlus, FaOm, FaUserShield, FaPrayingHands,
  FaHeart, FaShoppingBag, FaBookOpen, FaSignOutAlt
} from 'react-icons/fa'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const { login, register, user, logout } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.state?.from || '/'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error(language === 'bn' ? 'পাসওয়ার্ড দুটি মেলেনি' : 'Passwords do not match')
      return
    }

    setLoading(true)
    try {
      if (isLogin) {
        const res = await login(formData.email, formData.password)
        toast.success(language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দিরে স্বাগতম!' : 'Welcome back to Krishna Mega Temple!')
        if (res?.user?.isAdmin || res?.isAdmin) {
          navigate('/admin')
        } else if (location.state?.from && location.state.from !== '/') {
          navigate(location.state.from)
        }
      } else {
        const res = await register(formData.name, formData.email, formData.password)
        toast.success(language === 'bn' ? 'ভক্ত একাউন্ট সফলভাবে তৈরি হয়েছে!' : 'Devotee account created successfully!')
        if (res?.user?.isAdmin || res?.isAdmin) {
          navigate('/admin')
        } else if (location.state?.from && location.state.from !== '/') {
          navigate(location.state.from)
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || (isLogin ? (language === 'bn' ? 'লগইন ব্যর্থ হয়েছে' : 'Login failed') : (language === 'bn' ? 'নিবন্ধন ব্যর্থ হয়েছে' : 'Registration failed')))
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="w-full">
        <PageBanner
          title={language === 'bn' ? 'ভক্ত ও সেবক পোর্টাল' : 'Devotee & Fan Portal Profile'}
          subtitle={language === 'bn' ? 'আপনার মন্দির একাউন্ট ও সেবা ব্যবস্থাপনা' : 'Manage Your Temple Account & Seva'}
          breadcrumb={[{ label: language === 'bn' ? 'ভক্ত পোর্টাল' : 'Portal' }]}
        />
        <GodsTicker />

        <section className="py-16 px-4 bg-temple-light min-h-[70vh] flex items-center justify-center font-poppins">
          <div className="max-w-2xl w-full bg-white p-6 sm:p-10 border-t-4 border-temple-accent shadow-2xl space-y-6 text-center">
            <div className="w-20 h-20 bg-orange-100 text-temple-accent rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner border-2 border-temple-accent/30">
              {user.isAdmin ? <FaUserShield className="text-temple-accent" /> : <FaUser />}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-orange-50 text-temple-accent border border-temple-accent/20 rounded-full mb-2">
                <FaOm />
                <span>{user.isAdmin ? (language === 'bn' ? 'মন্দির পরিচালক (Admin)' : 'Mandir Administrator') : (language === 'bn' ? 'পবিত্র ভক্ত প্রোফাইল' : 'Devotee & Fan Account')}</span>
              </span>
              <h2 className="font-lora text-2xl sm:text-3xl font-bold text-temple-primary mt-1">
                {user.name}
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Admin Quick Entry Button */}
            {user.isAdmin && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-5 rounded-xs text-white shadow-lg text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                    <FaUserShield className="text-lg text-yellow-200" />
                    <span>{language === 'bn' ? 'মন্দির অ্যাডমিন ও CMS প্যানেল' : 'Mandir Admin & CMS Panel'}</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono uppercase">Full Access</span>
                </div>
                <p className="text-xs text-white/90">
                  {language === 'bn'
                    ? 'পূজা বুকিং, পণ্য ভাণ্ডার, অনুদান প্রকল্প, উৎসব ও ব্লগ পরিচালনা করুন।'
                    : 'Manage puja bookings, temple shop products, donation campaigns, festival RSVPs, and discourses.'}
                </p>
                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center gap-2 bg-white text-temple-primary hover:bg-yellow-100 font-bold text-xs px-5 py-2.5 shadow-md transition-all uppercase tracking-wider w-full sm:w-auto"
                >
                  <span>{language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন' : 'Open Admin CMS Dashboard'}</span>
                  &rarr;
                </Link>
              </div>
            )}

            {/* Quick Fan / Devotee Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
              <Link
                to="/events"
                className="p-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-temple-accent transition-all rounded-xs group text-center"
              >
                <FaPrayingHands className="text-xl text-temple-accent mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-gray-800">{language === 'bn' ? 'পূজা ও উৎসব' : 'Pujas & Events'}</span>
              </Link>

              <Link
                to="/shop"
                className="p-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-temple-accent transition-all rounded-xs group text-center"
              >
                <FaShoppingBag className="text-xl text-temple-accent mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-gray-800">{language === 'bn' ? 'মন্দির স্টোর' : 'Temple Store'}</span>
              </Link>

              <Link
                to="/donations"
                className="p-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-temple-accent transition-all rounded-xs group text-center"
              >
                <FaHeart className="text-xl text-temple-accent mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-gray-800">{language === 'bn' ? 'অনুদান ও সেবা' : 'Seva & Donation'}</span>
              </Link>

              <Link
                to="/blog"
                className="p-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-temple-accent transition-all rounded-xs group text-center"
              >
                <FaBookOpen className="text-xl text-temple-accent mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-gray-800">{language === 'bn' ? 'গীতা ও ধর্মকথা' : 'Gita & Blog'}</span>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Link to="/" className="kr-btn-custom flex-1 text-center py-3">
                {language === 'bn' ? 'হোম পেজে ফিরুন' : 'Back to Home'}
              </Link>
              <button
                onClick={logout}
                className="flex-1 py-3 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-xs font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-gray-200"
              >
                <FaSignOutAlt />
                <span>{language === 'bn' ? 'লগআউট করুন' : 'Sign Out'}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'ভক্ত পোর্টাল লগইন ও নিবন্ধন' : 'Devotee Portal Login'}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Access Your Sacred Profile'}
        breadcrumb={[{ label: language === 'bn' ? 'লগইন' : 'Login' }]}
      />
      <GodsTicker />

      <section className="py-20 px-4 bg-temple-light min-h-screen flex items-center justify-center font-poppins">
        <div className="max-w-md w-full bg-white border border-gray-200 shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 text-center border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsLogin(true)}
              className={`py-4 font-lora text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                isLogin
                  ? 'bg-white text-temple-primary border-t-4 border-temple-accent'
                  : 'text-gray-500 hover:text-temple-accent'
              }`}
            >
              {language === 'bn' ? 'লগইন' : 'Devotee Login'}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`py-4 font-lora text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-white text-temple-primary border-t-4 border-temple-accent'
                  : 'text-gray-500 hover:text-temple-accent'
              }`}
            >
              {language === 'bn' ? 'নতুন নিবন্ধন' : 'Register Account'}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-temple-accent text-xs font-semibold uppercase tracking-widest mb-1">
                <FaOm />
                <span>{language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Devotee Gateway'}</span>
              </div>
              <h3 className="font-lora text-2xl font-bold text-temple-primary">
                {isLogin
                  ? (language === 'bn' ? 'স্বাগতম, ভক্তবৃন্দ' : 'Welcome Back')
                  : (language === 'bn' ? 'নতুন ভক্ত একাউন্ট' : 'Join Our Sangha')}
              </h3>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  {language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={language === 'bn' ? 'যেমন: রাজেশ দাস' : 'e.g. Rajesh Das'}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                  />
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                {language === 'bn' ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="devotee@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                {language === 'bn' ? 'পাসওয়ার্ড *' : 'Password *'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                  />
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3.5 mt-4"
            >
              {isLogin ? <FaSignInAlt className="text-xs" /> : <FaUserPlus className="text-xs" />}
              <span>
                {loading
                  ? (language === 'bn' ? 'প্রক্রিয়াধীন...' : 'Processing...')
                  : isLogin
                  ? (language === 'bn' ? 'লগইন করুন' : 'Sign In')
                  : (language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Create Account')}
              </span>
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
