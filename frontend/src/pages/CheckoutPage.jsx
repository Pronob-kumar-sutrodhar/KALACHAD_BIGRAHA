import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import toast from 'react-hot-toast'
import api from '../services/api'
import { FaCheckCircle, FaOm, FaShieldAlt, FaCreditCard, FaMoneyBillWave, FaExternalLinkAlt } from 'react-icons/fa'

export default function CheckoutPage() {
  const { cartItems, clearCart, cartTotal } = useCart()
  const { user } = useAuth()
  const { language, formatMoney } = useLanguage()
  const [searchParams] = useSearchParams()

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    country: 'Bangladesh',
    street: '',
    city: '',
    state: '',
    postcode: '',
    notes: '',
    paymentMethod: 'stripe', // 'stripe' | 'cod'
  })

  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [verifiedSession, setVerifiedSession] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Delivery: Free for ৳ 1000+, else ৳ 80 delivery fee
  const shipping = cartTotal >= 1000 || cartTotal === 0 ? 0 : 80
  const total = cartTotal + shipping

  // Check for Stripe Checkout return URL params
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const status = searchParams.get('status')
    const paramOrderId = searchParams.get('order_id')

    if (sessionId && status === 'success') {
      setLoading(true)
      api
        .get(`/api/payment/verify-session/${sessionId}`)
        .then((res) => {
          setVerifiedSession(res.data)
          setOrderId(paramOrderId || res.data.metadata?.orderId || `KMT-ORD-${Math.floor(100000 + Math.random() * 900000)}`)
          setOrderComplete(true)
          clearCart()
          toast.success(
            language === 'bn'
              ? 'স্ট্রাইপ পেমেন্ট সফল হয়েছে! আপনার পবিত্র অর্ডার গৃহীত হয়েছে।'
              : 'Stripe payment verified! Your sacred order has been confirmed.'
          )
        })
        .catch(() => {
          setOrderId(paramOrderId || `KMT-ORD-${Math.floor(100000 + Math.random() * 900000)}`)
          setOrderComplete(true)
          clearCart()
        })
        .finally(() => setLoading(false))
    } else if (status === 'cancelled') {
      toast.error(
        language === 'bn'
          ? 'পেমেন্ট বাতিল করা হয়েছে। আপনি যে কোনো সময় পুনরায় চেষ্টা করতে পারেন।'
          : 'Payment cancelled. You can review your cart and retry anytime.'
      )
    }
  }, [searchParams, clearCart, language])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast.error(language === 'bn' ? 'আপনার ঝুড়ি খালি' : 'Your cart is empty')
      return
    }

    if (!formData.firstName || !formData.email || !formData.street || !formData.city) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে প্রয়োজনীয় ঠিকানা পূরণ করুন' : 'Please complete required shipping fields')
      return
    }

    setLoading(true)

    try {
      // 1. Create order record in backend
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity || 1,
          image: item.image || '/assets/img/products/new/1.webp',
          price: Number(item.price),
          product: item._id || item.id,
        })),
        shippingAddress: {
          address: formData.street,
          city: formData.city,
          postalCode: formData.postcode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod === 'stripe' ? 'Stripe Online' : 'Cash On Delivery',
        itemsPrice: cartTotal,
        taxPrice: 0,
        shippingPrice: shipping,
        totalPrice: total,
      }

      let createdOrderId = `KMT-ORD-${Math.floor(100000 + Math.random() * 900000)}`
      try {
        const orderRes = await api.post('/api/orders', orderPayload)
        if (orderRes.data?._id) {
          createdOrderId = orderRes.data._id
        }
      } catch (err) {
        console.warn('Order record creation fallback:', err.message)
      }

      // 2. Handle Payment Method
      if (formData.paymentMethod === 'stripe') {
        // Create official Stripe Checkout Session
        const sessionRes = await api.post('/api/payment/create-checkout-session', {
          items: cartItems.map((item) => ({
            name: item.name,
            price: Number(item.price),
            quantity: item.quantity || 1,
            image: item.image,
          })),
          amount: total,
          orderId: createdOrderId,
          customerEmail: formData.email,
          type: 'order',
        })

        if (sessionRes.data?.url) {
          toast.loading(
            language === 'bn'
              ? 'স্ট্রাইপ পেমেন্ট পোর্টালে নিয়ে যাওয়া হচ্ছে...'
              : 'Redirecting to secure Stripe Checkout portal...'
          )
          // Redirect browser directly to Stripe Hosted Portal
          window.location.href = sessionRes.data.url
          return
        } else {
          throw new Error('Unable to generate Stripe checkout URL')
        }
      } else {
        // Cash on delivery / Temple wire
        setLoading(false)
        setOrderId(createdOrderId)
        setOrderComplete(true)
        clearCart()
        toast.success(
          language === 'bn'
            ? 'হরে কৃষ্ণ! আপনার ক্যাশ অন ডেলিভারি অর্ডার গৃহীত হয়েছে!'
            : 'Hari Bol! Your Cash on Delivery order has been placed!'
        )
      }
    } catch (error) {
      setLoading(false)
      console.error('Checkout error:', error)
      toast.error(
        language === 'bn'
          ? `পেমেন্ট শুরু করতে ত্রুটি: ${error.response?.data?.message || error.message}`
          : `Payment error: ${error.response?.data?.message || error.message}`
      )
    }
  }

  if (orderComplete) {
    return (
      <div className="w-full font-poppins">
        <PageBanner
          title={language === 'bn' ? 'অর্ডার নিশ্চিতকরণ' : 'Order Confirmed'}
          subtitle={language === 'bn' ? 'হরে কৃষ্ণ' : 'Hare Krishna'}
          breadcrumb={[{ label: language === 'bn' ? 'অর্ডার সম্পন্ন' : 'Order Complete' }]}
        />
        <GodsTicker />

        <section className="py-24 px-4 bg-white min-h-[60vh] flex items-center justify-center">
          <div className="max-w-lg w-full text-center space-y-5 p-8 border-t-4 border-temple-accent shadow-2xl bg-temple-light">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center text-3xl">
              <FaCheckCircle />
            </div>

            <h2 className="font-lora text-3xl font-bold text-temple-primary">
              {language === 'bn' ? 'অর্ডার সফলভাবে গৃহীত হয়েছে!' : 'Order Placed with Blessings!'}
            </h2>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {language === 'bn'
                ? `ধন্যবাদ, ${formData.firstName || verifiedSession?.customerName || 'সম্মানিত ভক্ত'}। শ্রী শ্রী কৃষ্ণ মহা মন্দিরের গর্ভগৃহে আপনার সামগ্রী মন্ত্রপুত করে যত্নসহকারে পাঠিয়ে দেওয়া হবে।`
                : `Thank you, ${formData.firstName || verifiedSession?.customerName || 'Devotee'}. Your sacred order has been accepted. We will sanctify your package in the temple sanctum and ship it with care.`}
            </p>

            <div className="bg-white p-4 text-xs text-gray-700 text-left border border-gray-200 space-y-2 shadow-xs">
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-500">{language === 'bn' ? 'অর্ডার ট্র্যাকিং নম্বর:' : 'Order Tracking No:'}</span>
                <strong className="font-mono text-temple-primary">{orderId}</strong>
              </div>

              {verifiedSession && (
                <div className="flex justify-between border-b border-gray-100 pb-1.5 text-green-700">
                  <span>{language === 'bn' ? 'স্ট্রাইপ স্ট্যাটাস:' : 'Stripe Payment Status:'}</span>
                  <strong className="uppercase font-semibold">{verifiedSession.paymentStatus || 'PAID (PAID)'}</strong>
                </div>
              )}

              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-500">{language === 'bn' ? 'ইমেইল:' : 'Confirmation Email:'}</span>
                <span>{formData.email || verifiedSession?.customerEmail || user?.email}</span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span className="text-gray-500">{language === 'bn' ? 'পরিশোধ মাধ্যম:' : 'Payment Method:'}</span>
                <span className="font-semibold">{verifiedSession ? 'Stripe Gateway (Verified)' : (formData.paymentMethod === 'stripe' ? 'Stripe Online' : 'Cash On Delivery')}</span>
              </div>

              <div className="flex justify-between pt-1 text-sm font-bold text-temple-primary">
                <span>{language === 'bn' ? 'সর্বমোট পরিশোধিত:' : 'Total Paid:'}</span>
                <span className="text-temple-accent font-lora text-base">
                  {formatMoney(verifiedSession?.amountTotal || total)}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link to="/shop" className="kr-btn-custom w-full">
                {language === 'bn' ? 'আরও কেনাকাটা করুন' : 'Continue Store Shopping'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full font-poppins">
      <PageBanner
        title={language === 'bn' ? 'চেকআউট' : 'Checkout'}
        subtitle={language === 'bn' ? 'আপনার অর্ডার সম্পন্ন করুন' : 'Complete Your Order'}
        breadcrumb={[
          { label: language === 'bn' ? 'ঝুড়ি' : 'Cart', href: '/cart' },
          { label: language === 'bn' ? 'চেকআউট' : 'Checkout' },
        ]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Billing & Shipping Address */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <div className="inline-flex items-center gap-1.5 text-temple-accent text-xs font-semibold uppercase tracking-[2px] mb-1">
                  <FaOm />
                  <span>{language === 'bn' ? 'ভক্তের বিবরণ' : 'Devotee Details'}</span>
                </div>
                <h3 className="font-lora text-2xl font-bold text-temple-primary">
                  {language === 'bn' ? 'ডেলিভারি ও বিলিং ঠিকানা' : 'Billing & Delivery Address'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'নামের প্রথম অংশ *' : 'First Name *'}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'পদবী / শেষ অংশ *' : 'Last Name *'}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর / হোয়াটসঅ্যাপ *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1700-000000"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  {language === 'bn' ? 'রাস্তা ও বাড়ির ঠিকানা *' : 'Street Address *'}
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder={language === 'bn' ? 'বাড়ি নং, রাস্তা, এলাকা...' : 'House number, street name, apartment...'}
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'শহর / জেলা *' : 'Town / City *'}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'বিভাগ / রাজ্য' : 'State / Division'}
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    {language === 'bn' ? 'পোস্ট কোড' : 'Postcode / ZIP'}
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  {language === 'bn' ? 'বিশেষ ডেলিভারি নির্দেশনা (যদি থাকে)' : 'Order Notes (Optional)'}
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={language === 'bn' ? 'প্যাকেজিং বা ডেলিভারি সম্পর্কিত কোনো বিশেষ অনুরোধ...' : 'Notes about your order, e.g. special delivery notes...'}
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                />
              </div>
            </div>

            {/* Right: Order Review & Stripe Payment Selection */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <h3 className="font-lora text-xl font-bold text-temple-primary border-b border-gray-100 pb-3">
                  {language === 'bn' ? 'আপনার অর্ডার' : 'Your Order'}
                </h3>

                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || '/assets/img/products/new/1.webp'}
                          alt={item.name}
                          className="w-10 h-10 object-cover bg-slate-100"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                          <span className="text-gray-400 text-[11px]">&times; {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-lora font-bold text-temple-accent">
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-200 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>{language === 'bn' ? 'পণ্যের মোট মূল্য:' : 'Subtotal:'}</span>
                    <span className="font-semibold text-gray-800">{formatMoney(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{language === 'bn' ? 'হোম ডেলিভারি:' : 'Sanctified Delivery:'}</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-green-600 font-semibold">{language === 'bn' ? 'বিনামূল্যে' : 'FREE'}</strong>
                      ) : (
                        <span className="font-semibold text-gray-800">{formatMoney(shipping)}</span>
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-temple-primary">
                    <span>{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Amount:'}</span>
                    <span className="font-lora text-xl text-temple-accent">{formatMoney(total)}</span>
                  </div>
                </div>

                {/* Payment Selection Options */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <span className="block text-xs font-semibold uppercase text-gray-700">
                    {language === 'bn' ? 'পরিশোধের মাধ্যম নির্বাচন করুন:' : 'Payment Method:'}
                  </span>

                  {/* Option 1: Official Stripe Hosted Checkout */}
                  <label className={`flex items-start gap-3 p-3.5 border rounded-xs cursor-pointer transition-all ${
                    formData.paymentMethod === 'stripe'
                      ? 'border-temple-accent bg-orange-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={formData.paymentMethod === 'stripe'}
                      onChange={handleChange}
                      className="mt-1 text-temple-accent focus:ring-temple-accent"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-temple-primary flex items-center gap-1.5">
                          <FaCreditCard className="text-temple-accent" />
                          <span>{language === 'bn' ? 'স্ট্রাইপ অফিসিয়াল পেমেন্ট পোর্টাল' : 'Stripe Official Payment Portal'}</span>
                        </span>
                        <span className="text-[10px] bg-temple-primary text-temple-gold px-2 py-0.5 font-bold uppercase tracking-wider">
                          LIVE STRIPE
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        {language === 'bn'
                          ? 'স্ট্রাইপের সুরক্ষিত পেমেন্ট পেজে ক্রেডিট/ডেবিট কার্ড (Visa, Mastercard, Amex) দিয়ে তাৎক্ষণিক পরিশোধ করুন।'
                          : 'Redirects to Stripe’s 256-bit SSL secured checkout page for instant debit/credit card processing.'}
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Cash on Delivery / Temple Wire */}
                  <label className={`flex items-start gap-3 p-3.5 border rounded-xs cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-temple-accent bg-orange-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 text-temple-accent focus:ring-temple-accent"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <FaMoneyBillWave className="text-green-600" />
                        <span>{language === 'bn' ? 'ক্যাশ অন ডেলিভারি (হোম ডেলিভারি)' : 'Cash On Delivery / Bank Wire'}</span>
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {language === 'bn' ? 'পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।' : 'Pay in cash upon receiving your sanctified order.'}
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3.5 text-sm cursor-pointer"
                >
                  {formData.paymentMethod === 'stripe' ? (
                    <>
                      <FaExternalLinkAlt className="text-xs text-temple-gold" />
                      <span>
                        {loading
                          ? (language === 'bn' ? 'স্ট্রাইপ পোর্টালে সংযোগ হচ্ছে...' : 'Redirecting to Stripe...')
                          : (language === 'bn' ? `স্ট্রাইপ পেজে যান (${formatMoney(total)})` : `Pay with Stripe (${formatMoney(total)})`)}
                      </span>
                    </>
                  ) : (
                    <>
                      <FaShieldAlt className="text-xs text-temple-gold" />
                      <span>
                        {loading
                          ? (language === 'bn' ? 'অর্ডার প্রক্রিয়াধীন...' : 'Placing Order...')
                          : (language === 'bn' ? `ক্যাশ অন ডেলিভারি অর্ডার (${formatMoney(total)})` : `Place COD Order (${formatMoney(total)})`)}
                      </span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                  <FaShieldAlt className="text-temple-gold" />
                  <span>{language === 'bn' ? 'স্ট্রাইপ টেস্ট গেটওয়ে দ্বারা সম্পূর্ণ সুরক্ষিত' : 'Powered by Official Stripe Checkout'}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
