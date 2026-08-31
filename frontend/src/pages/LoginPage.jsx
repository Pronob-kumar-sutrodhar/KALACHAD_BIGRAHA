import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import toast from 'react-hot-toast'
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaOm } from 'react-icons/fa'

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
        await login(formData.email, formData.password)
        toast.success(language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দিরে স্বাগতম!' : 'Welcome back to Krishna Mega Temple!')
      } else {
        await register(formData.name, formData.email, formData.password)
        toast.success(language === 'bn' ? 'ভক্ত একাউন্ট সফলভাবে তৈরি হয়েছে!' : 'Devotee account created successfully!')
      }
      navigate(redirect)
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
          title={language === 'bn' ? 'ভক্ত পোর্টাল ও প্রোফাইল' : 'Devotee Portal Profile'}
          subtitle={language === 'bn' ? 'আপনার মন্দির একাউন্ট' : 'Manage Your Temple Account'}
          breadcrumb={[{ label: language === 'bn' ? 'একাউন্ট' : 'Account' }]}
        />
        <GodsTicker />

        <section className="py-20 px-4 bg-temple-light min-h-[60vh] flex items-center justify-center font-poppins">
          <div className="max-w-md w-full bg-white p-8 border-t-4 border-temple-accent shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-orange-50 text-temple-accent rounded-full mx-auto flex items-center justify-center text-3xl">
              <FaUser />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {language === 'bn' ? 'সক্রিয় ভক্ত একাউন্ট' : 'Active Devotee Profile'}
              </span>
              <h2 className="font-lora text-2xl font-bold text-temple-primary mt-1">
                {user.name}
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <div className="bg-temple-light p-4 text-xs text-left text-gray-600 space-y-2 border border-gray-200">
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'সদস্যপদ স্ট্যাটাস:' : 'Membership Status:'}</span>
                <strong className="text-green-600 font-bold">{language === 'bn' ? 'সক্রিয় ভক্ত' : 'Active Devotee'}</strong>
              </div>
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'ভূমিকা:' : 'Role:'}</span>
                <span className="font-semibold text-gray-800">{user.isAdmin ? (language === 'bn' ? 'মন্দির পরিচালক (Admin)' : 'Mandir Admin') : (language === 'bn' ? 'সাধারণ সেবক' : 'Registered Sevak')}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link to="/shop" className="kr-btn-custom w-full block text-center">
                {language === 'bn' ? 'মন্দির ভাণ্ডার ব্রাউজ করুন' : 'Visit Temple Store'}
              </Link>
              <button
                onClick={logout}
                className="w-full py-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'লগআউট করুন' : 'Sign Out'}
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
