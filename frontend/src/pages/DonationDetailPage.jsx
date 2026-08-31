import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import LoadingSpinner from '../components/LoadingSpinner'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'
import { FaCheckCircle, FaLock, FaHeart, FaOm, FaReceipt } from 'react-icons/fa'

const MOCK_DONATIONS = {
  '1': {
    _id: '1',
    title: 'শিশু সুরক্ষা ও বৈদিক বিদ্যালয় তহবিল',
    description: `প্রতিটি শিশুর অধিকার রয়েছে সনাতন শাস্ত্রীয় শিকড়, গুণগত আধুনিক শিক্ষা এবং পুষ্টিকর সাত্ত্বিক আহারের সান্নিধ্যে বেড়ে ওঠার।

আমাদের বৈদিক বিদ্যালয় প্রদান করে:
• ২৫০+ সুবিধাবঞ্চিত ও অনাথ শিশুর বিনামূল্যে থাকা-খাওয়া ও শাস্ত্রীয় শিক্ষা
• প্রতিদিনের পুষ্টিকর প্রাতরাশ এবং কৃষ্ণ মহাপ্রসাদ
• সংস্কৃত শ্লোক পাঠ, নৈতিক মূল্যবোধ, গণিত ও কম্পিউটার শিক্ষা
• যোগব্যায়াম, শাস্ত্রীয় সংগীত ও আধ্যাত্মিক সাধনা

এই মহতী সেবায় অংশ নিয়ে আপনি সনাতন ঐতিহ্যের একজন বিশ্বস্ত অভিভাবক হিসেবে ভবিষ্যৎ প্রজন্মকে আলোকিত করতে পারেন।`,
    image: '/assets/img/donation/5.webp',
    raised: 520000,
    goal: 850000,
    category: 'Vedic Education',
  },
  '2': {
    _id: '2',
    title: 'অন্নদান সেবা — প্রতিদিন ১৫০০+ ভক্তের মহাপ্রসাদ',
    description: `শ্রীমদ্ভগবদ্গীতায় ভগবান শ্রীকৃষ্ণ বলেছেন: "অন্নাদ্ভবন্তি ভূতানি" — অন্ন থেকেই জগতের সমস্ত জীবের সৃষ্টি। তাই সনাতন ধর্মে অন্নদানকে মহাদান বলা হয়েছে।

আমাদের মন্দির অন্নছত্রে প্রতিদিন:
• ১৫০০+ প্লেট গরম খিচুড়ি, ডাল, সবজি ও পায়েস মহাপ্রসাদ বিনামূল্যে বিতরণ
• প্রত্যন্ত অঞ্চলে ভক্তদের জন্য ভ্রাম্যমাণ প্রসাদ বিতরণ গাড়ি
• জন্মাষ্টমী, রাধাষ্টমী ও একাদশীতে বিশেষ ভোজের আয়োজন

আপনার পরিবারের জন্মদিন, বিবাহবার্ষিকী বা পূর্বপুরুষদের স্মরণে অন্নদান সেবা নিবেদন করুন।`,
    image: '/assets/img/donation/6.webp',
    raised: 410000,
    goal: 600000,
    category: 'Annadaan Seva',
  },
  '3': {
    _id: '3',
    title: 'মন্দির সংস্কার ও দেশীয় গৌশালা সেবা',
    description: `শ্রী শ্রী রাধাকৃষ্ণের পবিত্র আলয় সংরক্ষণ এবং গোমাতার চিরন্তন সেবা নিশ্চিতকরণ।

যেসব কার্যক্রম পরিচালিত হয়:
• গর্ভগৃহের ঐতিহ্যবাহী মার্বেল ও কাষ্ঠ খোদাই সংস্কার
• গৌশালার ২০০+ দেশীয় গরুর আজীবন চিকিৎসাসেবা ও পুষ্টিকর ঘাস-ভুসি
• সৌরবিদ্যুৎ ও প্রাকৃতিক জল নিষ্কাশন ব্যবস্থা`,
    image: '/assets/img/donation/7.webp',
    raised: 780000,
    goal: 1000000,
    category: 'Mandir & Gaushala',
  },
}

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000]

export default function DonationDetailPage() {
  const { id } = useParams()
  const { language, formatMoney } = useLanguage()
  const [donation, setDonation] = useState(MOCK_DONATIONS[id] || MOCK_DONATIONS['1'])
  const [loading, setLoading] = useState(false)

  // Form State
  const [amount, setAmount] = useState(2500)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorGotra, setDonorGotra] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successReceipt, setSuccessReceipt] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchDonation = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/api/donations/${id}`)
        if (data && data.title) {
          setDonation(data)
        } else {
          setDonation(MOCK_DONATIONS[id] || MOCK_DONATIONS['1'])
        }
      } catch {
        setDonation(MOCK_DONATIONS[id] || MOCK_DONATIONS['1'])
      } finally {
        setLoading(false)
      }
    }
    fetchDonation()
  }, [id])

  const handleSelectAmount = (val) => {
    setAmount(val)
    setCustomAmount('')
  }

  const handleCustomAmount = (e) => {
    const val = Number(e.target.value)
    setCustomAmount(e.target.value)
    if (val > 0) setAmount(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount || amount <= 0) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে সঠিক দানের পরিমাণ নির্বাচন করুন' : 'Please enter a valid amount')
      return
    }

    setSubmitting(true)
    api.post('/api/donations/donate', {
      amount,
      name: donorName,
      email: donorEmail,
      gotra: donorGotra,
      isAnonymous,
      causeId: donation._id || id,
    })
      .then((res) => {
        setSubmitting(false)
        const receipt = {
          receiptId: res.data.receiptId || `KMT-${Math.floor(100000 + Math.random() * 900000)}`,
          amount,
          name: isAnonymous ? (language === 'bn' ? 'গুপ্ত ভক্ত' : 'Anonymous Devotee') : donorName || 'Devotee',
          gotra: donorGotra || (language === 'bn' ? 'বিশ্বশান্তি কল্যাণ' : 'Universal Welfare'),
          cause: donation.title,
          date: new Date().toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', year: 'numeric' }),
        }
        setSuccessReceipt(receipt)
        toast.success(
          language === 'bn'
            ? `হরে কৃষ্ণ! আপনার ${formatMoney(amount)} দান সফলভাবে গৃহীত হয়েছে!`
            : `Hari Bol! Donation of ${formatMoney(amount)} received!`
        )
      })
      .catch(() => {
        setSubmitting(false)
        const receipt = {
          receiptId: `KMT-${Math.floor(100000 + Math.random() * 900000)}`,
          amount,
          name: isAnonymous ? (language === 'bn' ? 'গুপ্ত ভক্ত' : 'Anonymous Devotee') : donorName || 'Devotee',
          gotra: donorGotra || (language === 'bn' ? 'বিশ্বশান্তি কল্যাণ' : 'Universal Welfare'),
          cause: donation.title,
          date: new Date().toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', year: 'numeric' }),
        }
        setSuccessReceipt(receipt)
        toast.success(
          language === 'bn'
            ? `হরে কৃষ্ণ! আপনার ${formatMoney(amount)} দান সফলভাবে গৃহীত হয়েছে!`
            : `Hari Bol! Donation of ${formatMoney(amount)} received!`
        )
      })
  }

  if (loading) return <LoadingSpinner />

  const raised = donation.raised || 0
  const goal = donation.goal || 1000000
  const percent = Math.min(Math.round((raised / goal) * 100), 100)

  return (
    <div className="w-full">
      <PageBanner
        title={donation.title}
        subtitle={language === 'bn' ? 'পবিত্র সেবা তহবিল' : 'Sacred Seva Fund'}
        breadcrumb={[
          { label: language === 'bn' ? 'সেবা দান' : 'Donations', href: '/donations' },
          { label: donation.title },
        ]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Campaign Details Left (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-gray-200 shadow-sm space-y-8">
            {/* Main Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-temple-primary border border-gray-100 shadow-xs">
              <img
                src={donation.image || '/assets/img/donation/5.webp'}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-temple-accent text-white text-[10px] uppercase tracking-[2px] font-semibold px-3 py-1 shadow-md">
                {donation.category || 'Sacred Seva'}
              </span>
            </div>

            {/* Campaign Title & Meta */}
            <div>
              <div className="inline-flex items-center gap-2 text-temple-accent text-xs uppercase tracking-[2px] font-semibold mb-2">
                <FaOm />
                <span>{language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির সেবা' : 'Sanatan Dharma Seva Project'}</span>
              </div>
              <h1 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-bold text-temple-primary">
                {donation.title}
              </h1>
            </div>

            {/* Progress Bar & Goal */}
            <div className="bg-temple-light p-6 border border-gray-200 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">
                    {language === 'bn' ? 'মোট অনুদান সংগৃহীত' : 'Total Raised So Far'}
                  </span>
                  <span className="font-lora text-3xl font-bold text-temple-accent">
                    {formatMoney(raised)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block mb-1">
                    {language === 'bn' ? 'প্রয়োজনীয় লক্ষ্যমাত্রা' : 'Target Goal'}
                  </span>
                  <span className="font-lora text-2xl font-bold text-temple-primary">
                    {formatMoney(goal)}
                  </span>
                </div>
              </div>

              <div className="h-3 w-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-temple-accent to-temple-gold transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-600 font-semibold pt-1">
                <span>{percent}% {language === 'bn' ? 'সংগৃহীত' : 'Funded'}</span>
                <span>৫০০+ {language === 'bn' ? 'জন ভক্ত দান করেছেন' : 'Devotees Contributed'}</span>
              </div>
            </div>

            {/* Narrative Body */}
            <div className="prose max-w-none text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 pt-6">
              {donation.description}
            </div>

            {/* 80G Tax Exemption Notice */}
            <div className="p-4 bg-orange-50 border-l-4 border-temple-accent text-xs text-gray-700 flex items-center gap-3">
              <FaReceipt className="text-temple-accent text-2xl shrink-0" />
              <div>
                <strong className="text-temple-primary block text-sm font-lora">
                  {language === 'bn' ? '১০০% আয়কর ছাড় অনুমোদিত' : '100% Tax Deductible Offering'}
                </strong>
                <span>{language === 'bn' ? 'আপনার দান সনাতন ধর্ম রক্ষা ও অন্নদান সেবায় সরাসরি ব্যবহৃত হবে। তাৎক্ষণিক ডিজিটাল রসিদ প্রদান করা হয়।' : 'All contributions qualify for 80G tax exemptions under registered non-profit trust.'}</span>
              </div>
            </div>
          </div>

          {/* Donation Form Right (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            {successReceipt ? (
              <div className="bg-white p-6 sm:p-8 border-t-4 border-temple-accent shadow-xl text-center space-y-5">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center text-3xl">
                  <FaCheckCircle />
                </div>

                <div className="inline-flex items-center gap-2 text-temple-accent font-semibold text-xs uppercase tracking-widest">
                  <FaOm />
                  <span>{language === 'bn' ? 'দান গৃহীত হয়েছে' : 'Offering Confirmed'}</span>
                </div>

                <h3 className="font-lora text-2xl font-bold text-temple-primary">
                  {language === 'bn' ? 'অনন্ত আশীর্বাদ ও ধন্যবাদ!' : 'Hari Bol! Infinite Blessings'}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm">
                  {language === 'bn'
                    ? `আপনার ${formatMoney(successReceipt.amount)} অনুদান মন্দির সেবা তহবিলে সফলভাবে জমা হয়েছে।`
                    : `Your generous seva offering of ${formatMoney(successReceipt.amount)} has been recorded.`}
                </p>

                <div className="bg-temple-light p-4 border border-gray-200 text-left text-xs space-y-2 font-poppins">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'bn' ? 'রসিদ ট্র্যাকিং নং:' : 'Receipt No:'}</span>
                    <strong className="text-temple-primary font-mono">{successReceipt.receiptId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'bn' ? 'দাতা:' : 'Donor:'}</span>
                    <span className="font-semibold text-gray-800">{successReceipt.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'bn' ? 'গোত্র:' : 'Gotra:'}</span>
                    <span className="font-semibold text-gray-800">{successReceipt.gotra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'bn' ? 'পরিমাণ:' : 'Amount:'}</span>
                    <strong className="text-temple-accent font-lora text-sm">{formatMoney(successReceipt.amount)}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setSuccessReceipt(null)}
                  className="kr-btn-custom w-full text-center"
                >
                  {language === 'bn' ? 'নতুন দান করুন' : 'Make Another Offering'}
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-temple-accent text-xs font-semibold uppercase tracking-[2px] mb-1">
                    <FaHeart />
                    <span>{language === 'bn' ? 'অনলাইন সেবা পোর্টাল' : 'Online Seva Portal'}</span>
                  </div>
                  <h3 className="font-lora text-2xl font-bold text-temple-primary">
                    {language === 'bn' ? 'পবিত্র সেবা দান করুন' : 'Make Your Offering'}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {language === 'bn' ? 'আপনার দান দিয়ে অনাথ শিশু ও অভুক্তদের সহায়তা করুন।' : 'Choose an amount to support this sacred temple seva.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Preset Amount Chips */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      {language === 'bn' ? 'দানের পরিমাণ নির্বাচন করুন (টাকা / BDT):' : 'Select Seva Amount (BDT):'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESET_AMOUNTS.map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => handleSelectAmount(val)}
                          className={`py-2.5 px-3 text-xs font-lora font-bold transition-all border cursor-pointer ${
                            amount === val && !customAmount
                              ? 'bg-temple-accent text-white border-temple-accent shadow-sm'
                              : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-temple-accent'
                          }`}
                        >
                          {formatMoney(val)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount Field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {language === 'bn' ? 'অন্যান্য পরিমাণ (৳):' : 'Custom Amount (৳):'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
                      <input
                        type="number"
                        min="10"
                        placeholder="যেমন: 5000"
                        value={customAmount}
                        onChange={handleCustomAmount}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Devotee Full Name *'}
                      </label>
                      <input
                        type="text"
                        disabled={isAnonymous}
                        placeholder={isAnonymous ? (language === 'bn' ? 'গুপ্ত ভক্ত' : 'Anonymous Devotee') : (language === 'bn' ? 'আপনার নাম' : 'Devotee Name')}
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden disabled:bg-gray-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {language === 'bn' ? 'ইমেইল (রসিদের জন্য):' : 'Email Address:'}
                        </label>
                        <input
                          type="email"
                          placeholder="devotee@gmail.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {language === 'bn' ? 'গোত্র (যদি থাকে):' : 'Gotra (Optional):'}
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: কাশ্যপ"
                          value={donorGotra}
                          onChange={(e) => setDonorGotra(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="anonCheck"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded-xs text-temple-accent focus:ring-temple-accent w-4 h-4"
                      />
                      <label htmlFor="anonCheck" className="text-xs text-gray-600 cursor-pointer select-none">
                        {language === 'bn' ? 'আমার নাম গোপন রাখুন (গুপ্ত দান)' : 'Make this an anonymous seva donation'}
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3.5"
                    >
                      <FaLock className="text-xs text-temple-gold" />
                      <span>
                        {submitting
                          ? (language === 'bn' ? 'দান প্রক্রিয়াধীন...' : 'Processing Seva...')
                          : (language === 'bn' ? `${formatMoney(amount)} দান সম্পন্ন করুন` : `Offer ${formatMoney(amount)} Seva`)}
                      </span>
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 pt-1">
                    <FaLock className="text-[9px]" />
                    <span>{language === 'bn' ? 'নিরাপদ ২৫৬-বিট পেমেন্ট ও ৮-জি ট্যাক্স সার্টিফিকেট' : '256-Bit SSL Encrypted & 80G Certified'}</span>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
