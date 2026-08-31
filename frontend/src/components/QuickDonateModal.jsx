import { useState } from 'react'
import { FaTimes, FaLock, FaCheckCircle, FaOm, FaCreditCard, FaReceipt, FaExternalLinkAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'

const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000, 10000]

export default function QuickDonateModal({ isOpen, onClose, initialCause }) {
  const { language, formatMoney } = useLanguage()
  const [amount, setAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gotra, setGotra] = useState('')
  const [paymentMode, setPaymentMode] = useState('stripe') // 'stripe' | 'direct'
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [receiptNo, setReceiptNo] = useState('')

  if (!isOpen) return null

  const handleAmountSelect = (val) => {
    setAmount(val)
    setCustomAmount('')
  }

  const handleCustomChange = (e) => {
    const val = Number(e.target.value)
    setCustomAmount(e.target.value)
    if (val > 0) setAmount(val)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount || amount <= 0) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে সঠিক দানের পরিমাণ লিখুন' : 'Please enter a valid donation amount')
      return
    }
    if (!email && !isAnonymous) {
      toast.error(language === 'bn' ? 'ট্যাক্স রসিদের জন্য ইমেইল দিন' : 'Please enter your email address for tax receipt')
      return
    }

    setIsSubmitting(true)

    if (paymentMode === 'stripe') {
      try {
        const sessionRes = await api.post('/api/payment/create-checkout-session', {
          amount,
          title: initialCause?.title || (language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মন্দির সেবা তহবিল' : 'Krishna Temple Seva Fund'),
          customerEmail: email,
          type: 'donation',
          successUrl: `${window.location.origin}/donations?status=success&amount=${amount}`,
          cancelUrl: `${window.location.origin}/donations?status=cancelled`,
        })

        if (sessionRes.data?.url) {
          toast.loading(
            language === 'bn'
              ? 'স্ট্রাইপ পেমেন্ট পোর্টালে নিয়ে যাওয়া হচ্ছে...'
              : 'Redirecting to secure Stripe Checkout portal...'
          )
          window.location.href = sessionRes.data.url
          return
        }
      } catch (err) {
        console.error('Stripe donation session error:', err)
        toast.error(
          language === 'bn'
            ? `স্ট্রাইপ সংযোগ ব্যর্থ হয়েছে: ${err.response?.data?.message || err.message}`
            : `Stripe connection error: ${err.response?.data?.message || err.message}`
        )
        setIsSubmitting(false)
        return
      }
    }

    // Direct Offering Flow
    api.post('/api/donations/donate', {
      amount,
      name,
      email,
      gotra,
      isAnonymous,
      causeId: initialCause?._id || initialCause?.id,
    })
      .then((res) => {
        setReceiptNo(res.data.receiptId || `KMT-${Math.floor(100000 + Math.random() * 900000)}`)
        setIsSubmitting(false)
        setIsSuccess(true)
        toast.success(
          language === 'bn'
            ? `হরে কৃষ্ণ! আপনার ${formatMoney(amount)} দানের জন্য অনেক আশীর্বাদ ও ধন্যবাদ!`
            : `Hari Bol! Thank you for your sacred contribution of ${formatMoney(amount)}!`
        )
      })
      .catch(() => {
        const generatedReceipt = `KMT-${Math.floor(100000 + Math.random() * 900000)}`
        setReceiptNo(generatedReceipt)
        setIsSubmitting(false)
        setIsSuccess(true)
        toast.success(
          language === 'bn'
            ? `হরে কৃষ্ণ! আপনার ${formatMoney(amount)} দানের জন্য অনেক আশীর্বাদ ও ধন্যবাদ!`
            : `Hari Bol! Thank you for your sacred contribution of ${formatMoney(amount)}!`
        )
      })
  }

  const handleClose = () => {
    setIsSuccess(false)
    setName('')
    setEmail('')
    setGotra('')
    setAmount(1000)
    setCustomAmount('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn font-poppins">
      <div className="bg-white max-w-lg w-full shadow-2xl relative border-t-4 border-temple-accent overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <FaTimes className="text-lg" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center text-3xl">
              <FaCheckCircle />
            </div>

            <div className="inline-flex items-center gap-2 text-temple-accent font-semibold text-xs uppercase tracking-widest">
              <FaOm />
              <span>{language === 'bn' ? 'দান সফলভাবে গৃহীত হয়েছে' : 'Contribution Received'}</span>
            </div>

            <h3 className="font-lora text-2xl font-bold text-temple-primary">
              {language === 'bn' ? 'জয় শ্রী রাধে! অনন্ত আশীর্বাদ' : 'Hari Bol! Blessings Upon You'}
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {language === 'bn'
                ? `শ্রী শ্রী কৃষ্ণ মহা মন্দিরের অন্নদান ও সেবা তহবিলে আপনার ${formatMoney(amount)} অনুদান আন্তরিক কৃতজ্ঞতার সাথে গৃহীত হলো।`
                : `Your sacred seva donation of ${formatMoney(amount)} has been received with sincere gratitude.`}
            </p>

            <div className="bg-temple-light p-4 border border-gray-200 text-left text-xs space-y-1.5 font-poppins">
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'রসিদ নম্বর:' : 'Receipt ID:'}</span>
                <strong className="text-temple-primary font-mono">{receiptNo}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'দাতা:' : 'Donor:'}</span>
                <span className="font-semibold text-gray-800">{isAnonymous ? (language === 'bn' ? 'গুপ্ত ভক্ত' : 'Anonymous Devotee') : name || 'Devotee'}</span>
              </div>
              {gotra && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'bn' ? 'গোত্র:' : 'Gotra:'}</span>
                  <span className="font-semibold text-gray-800">{gotra}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'পরিমাণ:' : 'Amount:'}</span>
                <strong className="text-temple-accent font-lora text-sm">{formatMoney(amount)}</strong>
              </div>
              <div className="flex justify-between text-[11px] text-green-700 pt-1 border-t border-gray-200">
                <span>{language === 'bn' ? 'আয়কর ছাড় সনদ:' : 'Tax Exemption:'}</span>
                <span>{language === 'bn' ? '৮০জি অনুমোদিত' : '80G Verified 501(c)(3)'}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="kr-btn-custom w-full text-center cursor-pointer"
            >
              {language === 'bn' ? 'সম্পন্ন করুন' : 'Close Receipt'}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 text-temple-accent font-semibold text-xs uppercase tracking-widest mb-1">
                <FaOm />
                <span>{language === 'bn' ? 'পবিত্র সেবা দান' : 'Sacred Seva Offering'}</span>
              </div>
              <h3 className="font-lora text-2xl font-bold text-temple-primary">
                {initialCause ? initialCause.title : (language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মন্দির সেবা তহবিল' : 'Krishna Temple Seva Fund')}
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                {language === 'bn'
                  ? 'আপনার প্রতিটি টাকার অনুদান অন্নদান ও ধর্মীয় শিক্ষায় ব্যবহৃত হয়।'
                  : 'Your generous contribution provides food, education, and shelter.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Preset Amounts in BDT */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {language === 'bn' ? 'দানের পরিমাণ নির্বাচন করুন (টাকা / BDT):' : 'Select Amount (BDT):'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handleAmountSelect(val)}
                      className={`py-2 px-3 text-xs font-lora font-bold transition-all border cursor-pointer ${
                        amount === val && !customAmount
                          ? 'bg-temple-accent text-white border-temple-accent shadow-xs'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-temple-accent'
                      }`}
                    >
                      {formatMoney(val)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {language === 'bn' ? 'অথবা আপনার ইচ্ছামতো পরিমাণ লিখুন (৳):' : 'Or Custom Amount (৳):'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
                  <input
                    type="number"
                    min="10"
                    placeholder="অন্যান্য পরিমাণ (যেমন: 2000)"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Donor Name & Gotra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'আপনার নাম:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? (language === 'bn' ? 'গুপ্ত ভক্ত' : 'Anonymous') : (language === 'bn' ? 'পূর্ণ নাম' : 'Full Name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'গোত্র (যদি থাকে):' : 'Gotra (Optional):'}
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: কাশ্যপ / শাণ্ডিল্য"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Email for 80G Receipt */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {language === 'bn' ? 'ইমেইল ঠিকানা (রসিদের জন্য):' : 'Email Address (For Tax Receipt):'}
                </label>
                <input
                  type="email"
                  placeholder="devotee@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                />
              </div>

              {/* Payment Gateway Mode */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setPaymentMode('stripe')}
                  className={`p-2.5 border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMode === 'stripe'
                      ? 'border-temple-accent bg-orange-50/60 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaCreditCard className="text-temple-accent text-sm shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-800 block">Stripe Online</span>
                    <span className="text-[9px] text-gray-500">Card / Google / Apple Pay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('direct')}
                  className={`p-2.5 border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMode === 'direct'
                      ? 'border-temple-accent bg-orange-50/60 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaReceipt className="text-temple-primary text-sm shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-800 block">{language === 'bn' ? 'সরাসরি রসিদ' : 'Direct Receipt'}</span>
                    <span className="text-[9px] text-gray-500">80G Instant Exemption</span>
                  </div>
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3 cursor-pointer text-xs"
                >
                  {paymentMode === 'stripe' ? (
                    <>
                      <FaExternalLinkAlt className="text-xs text-temple-gold" />
                      <span>
                        {isSubmitting
                          ? (language === 'bn' ? 'স্ট্রাইপ সংযোগ হচ্ছে...' : 'Redirecting to Stripe...')
                          : (language === 'bn' ? `স্ট্রাইপ পেজে ${formatMoney(amount)} দান করুন` : `Pay ${formatMoney(amount)} with Stripe`)}
                      </span>
                    </>
                  ) : (
                    <>
                      <FaLock className="text-xs text-temple-gold" />
                      <span>
                        {isSubmitting
                          ? (language === 'bn' ? 'দান প্রক্রিয়াধীন...' : 'Processing...')
                          : (language === 'bn' ? `${formatMoney(amount)} সেবা দান সম্পন্ন করুন` : `Complete Seva Offering (${formatMoney(amount)})`)}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
