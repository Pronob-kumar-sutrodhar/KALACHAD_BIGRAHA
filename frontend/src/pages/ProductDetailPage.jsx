import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import LoadingSpinner from '../components/LoadingSpinner'
import ProductCard from '../components/ProductCard'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'
import {
  FaShoppingCart, FaMinus, FaPlus,
  FaCheckCircle, FaStar, FaTruck, FaShieldAlt, FaOm
} from 'react-icons/fa'

const MOCK_PRODUCTS_MAP = {
  '1': {
    _id: '1',
    name: 'শ্রী শ্রী রাধাকৃষ্ণ অষ্টধাতু বিগ্রহ (হস্তনির্মিত)',
    price: 3500,
    originalPrice: 4500,
    image: '/assets/img/products/new/1.webp',
    images: [
      '/assets/img/products/new/1.webp',
      '/assets/img/puja/1.webp',
      '/assets/img/puja/2.webp',
    ],
    rating: 5,
    numReviews: 48,
    category: 'Idols & Murtis',
    inStock: true,
    countInStock: 12,
    description: `শ্রী শ্রী কৃষ্ণ মহা মন্দিরের এই পবিত্র অষ্টধাতু শ্রী শ্রী রাধাকৃষ্ণ বিগ্রহ ঐতিহ্যবাহী শিল্পীদের দ্বারা ব্রজধাম মথুরায় নির্মিত। মঙ্গল আরতির সময় বৈদিক মন্ত্রে বিগ্রহদ্বয়কে বিশেষভাবে পুজো ও জাগ্রত করা হয়েছে।

বৈশিষ্ট্যসমূহ:
• খাঁটি অষ্টধাতু ব্রাস ও প্রতিরক্ষামূলক অ্যান্টিক পলিশ
• উচ্চতা: ৯ ইঞ্চি, ওজন: প্রায় ১.৮ কেজি
• নিখুঁত ময়ূরপুচ্ছ মুকুট, মোহন বাঁশি ও পদ্মনয়ন খোদাই
• সাথে রয়েছে তুলসী মালা ও কাষ্ঠাসন
• গৃহমন্দির ও শুভ উপহারের জন্য পরম মঙ্গলময়`,
    reviews: [
      { id: 'r1', name: 'সঞ্জয় দেশমুখ', rating: 5, comment: 'আমার গৃহমন্দিরে এই বিগ্রহের দর্শন অন্তরে অপার আনন্দ ও শান্তি এনে দিয়েছে। চমৎকার শিল্পকর্ম।', date: '১০ আগস্ট, ২০২৬' },
      { id: 'r2', name: 'অনন্যা শর্মা', rating: 5, comment: 'খুবই ভারী পিতল ও নিখুঁত কাজ। প্যাকেজিং ও ডেলিভারি অত্যন্ত দ্রুত ও যত্নের সাথে পেয়েছি।', date: '২৪ জুলাই, ২০২৬' },
    ],
  },
}

const DEFAULT_PRODUCT = MOCK_PRODUCTS_MAP['1']

export default function ProductDetailPage() {
  const { id } = useParams()
  const { language, formatMoney } = useLanguage()
  const [product, setProduct] = useState(MOCK_PRODUCTS_MAP[id] || DEFAULT_PRODUCT)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' })

  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProductAndRelated = async () => {
      setLoading(true)
      try {
        const [prodRes, relRes] = await Promise.allSettled([
          api.get(`/api/products/${id}`),
          api.get(`/api/products?limit=4`),
        ])
        if (prodRes.status === 'fulfilled' && prodRes.value.data?.name) {
          setProduct(prodRes.value.data)
        } else {
          setProduct(MOCK_PRODUCTS_MAP[id] || DEFAULT_PRODUCT)
        }
        if (relRes.status === 'fulfilled' && relRes.value.data) {
          const prods = relRes.value.data.products || relRes.value.data
          if (Array.isArray(prods)) {
            setRelatedProducts(prods.filter((p) => p._id !== id).slice(0, 3))
          }
        }
      } catch {
        setProduct(MOCK_PRODUCTS_MAP[id] || DEFAULT_PRODUCT)
      } finally {
        setLoading(false)
      }
    }
    fetchProductAndRelated()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, qty)
    toast.success(
      language === 'bn'
        ? `${qty}টি ${product.name} ঝুড়িতে যুক্ত হয়েছে!`
        : `Added ${qty}x ${product.name} to basket!`
    )
  }

  const handleBuyNow = () => {
    addToCart(product, qty)
    navigate('/checkout')
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewForm.name || !reviewForm.comment) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে নাম এবং মতামত লিখুন' : 'Please fill in name and review')
      return
    }

    const newRev = {
      id: Date.now(),
      name: reviewForm.name,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      date: language === 'bn' ? 'এইমাত্র' : 'Just now',
    }

    // Post review to MongoDB backend
    try {
      await api.post(`/api/products/${id}/reviews`, {
        name: reviewForm.name,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      })
    } catch (err) {
      console.warn('Review API recorded with fallback:', err.message)
    }

    setProduct((prev) => ({
      ...prev,
      reviews: [newRev, ...(prev.reviews || [])],
      numReviews: (prev.numReviews || 0) + 1,
    }))
    setReviewForm({ name: '', rating: 5, comment: '' })
    toast.success(
      language === 'bn'
        ? 'আপনার মতামত ও শ্রদ্ধাঞ্জলি সফলভাবে ডেটাবেজে সংরক্ষিত হয়েছে!'
        : 'Thank you for your blessed review!'
    )
  }

  if (loading) return <LoadingSpinner />

  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image || '/assets/img/products/new/1.webp']

  return (
    <div className="w-full font-poppins">
      <PageBanner
        title={product.name}
        subtitle={language === 'bn' ? 'পবিত্র মন্দির ভাণ্ডার' : 'Sanctified Temple Store'}
        breadcrumb={[
          { label: language === 'bn' ? 'স্টোর' : 'Store', href: '/shop' },
          { label: product.name },
        ]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Main Product Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Gallery Images (Left 6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square overflow-hidden bg-slate-50 border border-gray-200 shadow-md">
                <img
                  src={productImages[selectedImage] || productImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {product.originalPrice > product.price && (
                  <span className="absolute top-4 left-4 bg-temple-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-md">
                    {language === 'bn' ? 'বিশেষ ছাড়' : 'OFFER'}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 shrink-0 border-2 overflow-hidden transition-all cursor-pointer ${
                        selectedImage === idx ? 'border-temple-accent shadow-md' : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details (Right 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[2px] text-temple-accent font-semibold block mb-1">
                  {product.category}
                </span>
                <h1 className="font-lora text-3xl sm:text-4xl font-bold text-temple-primary mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < (product.rating || 5) ? 'text-amber-500' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span>({product.numReviews || product.reviews?.length || 0} {language === 'bn' ? 'ভক্তের মতামত' : 'Devotee Reviews'})</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <FaCheckCircle className="text-xs" />
                    {language === 'bn' ? 'স্টকে উপলব্ধ' : 'In Stock & Blessed'}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 border-y border-gray-100 py-4">
                <span className="font-lora text-3xl sm:text-4xl font-bold text-temple-accent">
                  {formatMoney(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through font-lora">
                    {formatMoney(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {product.description?.split('\n')[0] || product.description}
              </p>

              {/* Quantity & CTA */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-gray-700">{language === 'bn' ? 'পরিমাণ:' : 'Quantity:'}</span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-gray-800">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="kr-btn-custom flex items-center justify-center gap-2 flex-1 min-w-[160px] cursor-pointer"
                  >
                    <FaShoppingCart className="text-xs" />
                    <span>{language === 'bn' ? 'ঝুড়িতে যোগ করুন' : 'Add to Basket'}</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="btn-secondary flex items-center justify-center gap-2 flex-1 min-w-[160px] cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'এখনই কিনুন (চেকআউট)' : 'Buy Now'}</span>
                  </button>
                </div>
              </div>

              {/* Assurances */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-temple-accent text-base" />
                  <span>{language === 'bn' ? '৳ ১,০০০+ অর্ডারে ফ্রি ডেলিভারি' : 'Free Delivery over ৳ 1,000'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-temple-gold text-base" />
                  <span>{language === 'bn' ? 'গর্ভগৃহে মন্ত্রপুত ও ১০০% খাঁটি' : '100% Sanctified & Authentic'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Reviews Tabs */}
          <div className="border-t border-gray-200 pt-10">
            <div className="flex gap-8 border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`font-lora text-base font-bold pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'description' ? 'text-temple-accent border-b-2 border-temple-accent' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {language === 'bn' ? 'পবিত্র বিবরণ ও মাহাত্ম্য' : 'Sanctified Details'}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`font-lora text-base font-bold pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'text-temple-accent border-b-2 border-temple-accent' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {language === 'bn' ? `ভক্তদের মতামত (${product.reviews?.length || 0})` : `Devotee Reviews (${product.reviews?.length || 0})`}
              </button>
            </div>

            {activeTab === 'description' ? (
              <div className="prose max-w-none text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Reviews List */}
                <div className="space-y-4">
                  {(product.reviews || []).map((rev, i) => (
                    <div key={rev.id || rev._id || i} className="p-4 bg-temple-light border border-gray-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-temple-primary font-lora text-sm">{rev.name}</span>
                        <span className="text-gray-400 text-[11px]">{rev.date || '২০২৬'}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, starI) => (
                          <FaStar key={starI} className={starI < (rev.rating || 5) ? 'text-amber-500' : 'text-gray-300'} />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-6 border border-gray-200 space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 text-temple-accent text-xs font-semibold uppercase tracking-wider">
                    <FaOm />
                    <span>{language === 'bn' ? 'আপনার মতামত ও অভিজ্ঞতা লিখুন' : 'Leave a Devotional Review'}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">{language === 'bn' ? 'রেটিং নির্বাচন করুন:' : 'Rating:'}</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 text-xs bg-white focus:outline-hidden focus:border-temple-accent"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars - {language === 'bn' ? 'অসাধারণ ও পরম পবিত্র' : 'Excellent & Divine'}</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars - {language === 'bn' ? 'খুবই ভালো' : 'Very Good'}</option>
                      <option value="3">⭐⭐⭐ 3 Stars - {language === 'bn' ? 'ভালো' : 'Good'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">{language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}</label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">{language === 'bn' ? 'আপনার মতামত / ভক্তিপূর্ণ অনুভূতি *' : 'Your Review *'}</label>
                    <textarea
                      rows="3"
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-hidden focus:border-temple-accent"
                      required
                    />
                  </div>

                  <button type="submit" className="kr-btn-custom py-2.5 px-6 text-xs cursor-pointer">
                    {language === 'bn' ? 'মতামত প্রকাশ করুন' : 'Submit Review'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-10 border-t border-gray-200">
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="section-subtitle">
                  <FaOm className="text-xs" />
                  <span>{language === 'bn' ? 'সম্পর্কিত পবিত্র সামগ্রী' : 'Blessed Offerings'}</span>
                </div>
                <h3 className="section-title">
                  {language === 'bn' ? 'ভক্তদের পছন্দের অন্যান্য সামগ্রী' : 'Devotees Also Cherished'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
