import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft, FaArrowRight, FaOm } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const { language, formatMoney, t } = useLanguage()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const navigate = useNavigate()

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === 'KRISHNA10' || coupon.trim().toUpperCase() === 'SEVA10') {
      setDiscount(cartTotal * 0.1)
      toast.success(
        language === 'bn'
          ? '১০% ভক্ত আশির্বাদ কুপন ডিসকাউন্ট সফলভাবে প্রয়োগ করা হয়েছে!'
          : '10% Devotee Blessing Coupon Applied!'
      )
    } else {
      toast.error(
        language === 'bn'
          ? 'সঠিক কুপন কোড দিন। যেমন: "KRISHNA10"'
          : 'Invalid coupon code. Try "KRISHNA10"'
      )
    }
  }

  // Delivery: Free for ৳ 1000+, else ৳ 80 delivery fee
  const shipping = cartTotal >= 1000 || cartTotal === 0 ? 0 : 80
  const finalTotal = Math.max(0, cartTotal - discount + shipping)

  if (cartItems.length === 0) {
    return (
      <div className="w-full">
        <PageBanner
          title={language === 'bn' ? 'শপিং ঝুড়ি' : 'Shopping Basket'}
          subtitle={language === 'bn' ? 'আপনার নির্বাচিত সামগ্রী' : 'Your Temple Cart'}
          breadcrumb={[{ label: language === 'bn' ? 'ঝুড়ি' : 'Cart' }]}
        />
        <GodsTicker />
        <section className="py-24 px-4 text-center bg-white min-h-[50vh] flex flex-col items-center justify-center font-poppins">
          <div className="w-20 h-20 bg-orange-50 text-temple-accent flex items-center justify-center text-3xl mb-4 border border-temple-accent/20">
            <FaShoppingBag />
          </div>
          <h2 className="font-lora text-2xl sm:text-3xl font-bold text-temple-primary mb-2">
            {language === 'bn' ? 'আপনার ভক্তি ঝুড়ি বর্তমানে খালি' : 'Your Devotional Basket is Empty'}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mb-6 max-w-md">
            {language === 'bn'
              ? 'মন্দির ভাণ্ডার থেকে পবিত্র বিগ্রহ, শ্রীমদ্ভগবদ্গীতা, সুগন্ধি ধূপ ও পূজা সামগ্রী নির্বাচন করুন।'
              : 'Explore our sanctified temple store for deities, Bhagavad Gita scriptures, organic incense, and puja samagri.'}
          </p>
          <Link to="/shop" className="kr-btn-custom">
            {language === 'bn' ? 'মন্দির ভাণ্ডারে যান' : 'Explore Temple Store'}
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'শপিং ঝুড়ি' : 'Shopping Basket'}
        subtitle={language === 'bn' ? 'আপনার নির্বাচিত সামগ্রী' : 'Your Temple Cart'}
        breadcrumb={[{ label: language === 'bn' ? 'ঝুড়ি' : 'Cart' }]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table Left */}
          <div className="lg:col-span-8 bg-white border border-gray-200 shadow-sm">
            <div className="hidden sm:grid grid-cols-12 bg-temple-primary text-white text-xs font-bold uppercase tracking-wider p-4">
              <div className="col-span-6">{language === 'bn' ? 'পবিত্র সামগ্রী' : 'Sanctified Item'}</div>
              <div className="col-span-2 text-center">{language === 'bn' ? 'মূল্য' : 'Price'}</div>
              <div className="col-span-2 text-center">{language === 'bn' ? 'পরিমাণ' : 'Quantity'}</div>
              <div className="col-span-2 text-right">{language === 'bn' ? 'মোট মূল্য' : 'Subtotal'}</div>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 sm:gap-2"
                >
                  {/* Item Image & Title */}
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <button
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="text-gray-400 hover:text-red-500 text-xs p-1"
                      title={language === 'bn' ? 'মুছে ফেলুন' : 'Remove item'}
                    >
                      <FaTrash />
                    </button>
                    <img
                      src={item.image || '/assets/img/products/new/1.webp'}
                      alt={item.name}
                      className="w-16 h-16 object-cover bg-slate-100 border border-gray-200"
                    />
                    <div>
                      <h4 className="font-lora font-bold text-temple-primary text-sm hover:text-temple-accent">
                        <Link to={`/shop/${item._id || item.id}`}>{item.name}</Link>
                      </h4>
                      <span className="text-[11px] text-gray-500 block">
                        {item.category || (language === 'bn' ? 'পূজা সামগ্রী' : 'Puja Samagri')}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center text-xs font-semibold text-gray-700">
                    {formatMoney(item.price)}
                  </div>

                  {/* Quantity Counter */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                      >
                        <FaMinus className="text-[9px]" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                      >
                        <FaPlus className="text-[9px]" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 text-right font-lora font-bold text-temple-accent text-sm sm:text-base">
                    {formatMoney(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions & Coupon */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'কুপন কোড (যেমন: KRISHNA10)' : 'Coupon code (e.g. KRISHNA10)'}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden uppercase w-full sm:w-56 bg-white"
                />
                <button
                  type="submit"
                  className="bg-temple-primary hover:bg-slate-900 text-white font-lora text-xs uppercase tracking-wider font-semibold px-4 py-2 transition-colors shrink-0"
                >
                  {language === 'bn' ? 'প্রয়োগ করুন' : 'Apply Coupon'}
                </button>
              </form>

              <Link
                to="/shop"
                className="text-xs font-semibold text-temple-accent hover:underline flex items-center gap-1"
              >
                <FaArrowLeft className="text-[10px]" />
                <span>{language === 'bn' ? 'আরও সামগ্রী দেখুন' : 'Continue Shopping'}</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary Right */}
          <div className="lg:col-span-4 bg-white border border-gray-200 shadow-sm p-6 space-y-6">
            <h3 className="font-lora text-xl font-bold text-temple-primary border-b border-gray-100 pb-3">
              {language === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>{language === 'bn' ? 'পণ্যের মোট মূল্য:' : 'Subtotal:'}</span>
                <span className="font-semibold text-gray-800">{formatMoney(cartTotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{language === 'bn' ? '১০% ভক্তি ডিসকাউন্ট:' : '10% Devotee Discount:'}</span>
                  <span className="font-semibold">-{formatMoney(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>{language === 'bn' ? 'হোম ডেলিভারি চার্জ:' : 'Sanctified Delivery:'}</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="text-green-600 font-semibold">{language === 'bn' ? 'বিনামূল্যে (Free)' : 'FREE'}</strong>
                  ) : (
                    <span className="font-semibold text-gray-800">{formatMoney(shipping)}</span>
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-[11px] text-gray-400">
                  {language === 'bn' ? '৳ ১,০০০ বা ততোধিক টাকার অর্ডারে ডেলিভারি ফ্রি!' : 'Free delivery on orders over ৳ 1,000!'}
                </p>
              )}

              <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-bold text-temple-primary">
                <span>{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Amount:'}</span>
                <span className="font-lora text-xl text-temple-accent">{formatMoney(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3.5"
            >
              <span>{language === 'bn' ? 'চেকআউট সম্পন্ন করুন' : 'Proceed to Checkout'}</span>
              <FaArrowRight className="text-xs" />
            </button>

            <div className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5 pt-1">
              <FaOm className="text-temple-gold" />
              <span>{language === 'bn' ? 'পবিত্র প্রসাদ প্যাকেজিং ও দ্রুত হোম ডেলিভারি' : 'Consecrated items packed with sacred care'}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
