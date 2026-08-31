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

const RELATED = [
  { _id: '2', name: 'শ্রীমদ্ভগবদ্গীতা যথাযথ (হার্ডবাউন্ড)', price: 450, image: '/assets/img/blog/2.webp', category: 'Vedic Books', rating: 5, numReviews: 112 },
  { _id: '3', name: 'বৃন্দাবন চন্দন সুগন্ধি ধূপ ও শঙ্ক (প্যাক ৩)', price: 250, image: '/assets/img/puja/4.webp', category: 'Dhoop & Incense', rating: 4.8, numReviews: 64 },
  { _id: '4', name: 'রূপার প্রলেপযুক্ত পঞ্চপ্রদীপ মহা আরতি থালি', price: 1850, image: '/assets/img/puja/1.webp', category: 'Puja Samagri', rating: 4.9, numReviews: 36 },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const { language, formatMoney, t } = useLanguage()
  const [product, setProduct] = useState(MOCK_PRODUCTS_MAP[id] || DEFAULT_PRODUCT)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' })

  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/api/products/${id}`)
        if (data && data.name) {
          setProduct(data)
        } else {
          setProduct(MOCK_PRODUCTS_MAP[id] || DEFAULT_PRODUCT)
        }
      } catch {
        setProduct(MOCK_PRODUCTS_MAP[id] || DEFAULT_PRODUCT)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
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

  const handleReviewSubmit = (e) => {
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
    setProduct((prev) => ({
      ...prev,
      reviews: [newRev, ...(prev.reviews || [])],
      numReviews: (prev.numReviews || 0) + 1,
    }))
    setReviewForm({ name: '', rating: 5, comment: '' })
    toast.success(language === 'bn' ? 'আপনার মতামত ও শ্রদ্ধাঞ্জলি সফলভাবে যোগ করা হয়েছে!' : 'Thank you for your blessed review!')
  }

  if (loading) return <LoadingSpinner />

  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image || '/assets/img/products/new/1.webp']

  return (
    <div className="w-full">
      <PageBanner
        title={product.name}
        subtitle={language === 'bn' ? 'পবিত্র মন্দির ভাণ্ডার' : 'Sanctified Temple Store'}
        breadcrumb={[
          { label: language === 'bn' ? 'স্টোর' : 'Store', href: '/shop' },
          { label: product.name },
        ]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Main Gallery & Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Gallery Left (5 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square overflow-hidden bg-slate-50 border border-gray-200 shadow-md">
                <img
                  src={productImages[selectedImage] || productImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.category && (
                  <span className="absolute top-4 left-4 bg-temple-accent text-white text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 shadow-md">
                    {product.category}
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
                      className={`w-20 h-20 flex-shrink-0 border-2 overflow-hidden bg-slate-50 transition-all cursor-pointer ${
                        selectedImage === idx ? 'border-temple-accent shadow-md scale-95' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions Right (7 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-temple-accent text-xs uppercase tracking-[2px] font-semibold mb-2">
                  <FaOm />
                  <span>{language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির ভাণ্ডার' : 'Sanctified Deity Item'}</span>
                </div>
                <h1 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-bold text-temple-primary leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating || 5) ? 'text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-gray-500 font-medium font-poppins">
                    ({product.numReviews || 48} {language === 'bn' ? 'ভক্তের মতামত' : 'Devotee Reviews'})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 py-3 border-y border-gray-100">
                <span className="font-lora text-3xl font-bold text-temple-accent">
                  {formatMoney(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    {formatMoney(product.originalPrice)}
                  </span>
                )}
                <span className="text-green-600 text-xs font-semibold bg-green-50 px-2.5 py-1 flex items-center gap-1">
                  <FaCheckCircle className="text-[10px]" /> {language === 'bn' ? `মজুদ আছে (${product.countInStock || 15}টি উপলব্ধ)` : `In Stock (${product.countInStock || 15} Available)`}
                </span>
              </div>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description?.slice(0, 200)}...
              </p>

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase font-semibold text-gray-700">
                    {language === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
                  </span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-800">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="bg-temple-primary hover:bg-slate-900 text-white font-lora text-xs uppercase tracking-wider font-semibold py-4 px-6 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FaShoppingCart />
                    <span>{language === 'bn' ? 'ঝুড়িতে যুক্ত করুন' : 'Add to Basket'}</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="kr-btn-custom text-center justify-center"
                  >
                    {language === 'bn' ? 'এখনই চেকআউট করুন' : 'Instant Checkout'}
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center gap-2.5">
                  <FaTruck className="text-temple-accent text-lg shrink-0" />
                  <span>{language === 'bn' ? '৳ ১,০০০+ অর্ডারে ফ্রি ডেলিভারি' : 'Free Shipping on Orders Over ৳ 1,000'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaShieldAlt className="text-temple-accent text-lg shrink-0" />
                  <span>{language === 'bn' ? 'গর্ভগৃহে পূজিত ও মন্ত্রপুত সামগ্রী' : 'Sanctified & Securely Packed with Care'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Reviews Tabs */}
          <div className="border border-gray-200 shadow-xs">
            <div className="flex border-b border-gray-200 bg-temple-light">
              <button
                onClick={() => setActiveTab('description')}
                className={`font-lora text-sm uppercase tracking-wider font-bold py-3.5 px-6 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'description'
                    ? 'border-temple-accent bg-white text-temple-primary'
                    : 'border-transparent text-gray-500 hover:text-temple-accent'
                }`}
              >
                {language === 'bn' ? 'বিস্তারিত বিবরণ' : 'Detailed Description'}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`font-lora text-sm uppercase tracking-wider font-bold py-3.5 px-6 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-temple-accent bg-white text-temple-primary'
                    : 'border-transparent text-gray-500 hover:text-temple-accent'
                }`}
              >
                {language === 'bn' ? `মতামত (${product.reviews?.length || 2})` : `Reviews (${product.reviews?.length || 2})`}
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-white">
              {activeTab === 'description' ? (
                <div className="prose max-w-none text-gray-600 text-sm leading-relaxed whitespace-pre-line font-poppins">
                  {product.description}
                </div>
              ) : (
                <div className="space-y-8 font-poppins">
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {(product.reviews || []).map((rev) => (
                      <div key={rev.id || rev._id} className="p-4 bg-temple-light border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-temple-primary text-sm">{rev.name}</span>
                            <span className="text-[11px] text-gray-400">&bull; {rev.date || 'Aug 2026'}</span>
                          </div>
                          <div className="flex text-amber-400 text-xs">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">{rev.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={handleReviewSubmit} className="space-y-4 pt-6 border-t border-gray-200 max-w-lg">
                    <h4 className="font-lora font-bold text-temple-primary text-lg">
                      {language === 'bn' ? 'আপনার মতামত লিখুন' : 'Leave a Devotional Reflection'}
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {language === 'bn' ? 'রেটিং:' : 'Rating:'}
                      </label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (৫ তারকা - পরম পবিত্র)</option>
                        <option value={4}>⭐⭐⭐⭐ (৪ তারকা - খুব ভালো)</option>
                        <option value={3}>⭐⭐⭐ (৩ তারকা - সন্তোষজনক)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {language === 'bn' ? 'আপনার মন্তব্য *' : 'Your Review *'}
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-temple-accent hover:bg-orange-700 text-white font-lora text-xs uppercase tracking-wider font-semibold py-2.5 px-6 transition-colors cursor-pointer"
                    >
                      {language === 'bn' ? 'মতামত প্রকাশ করুন' : 'Submit Review'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Related Items */}
          <div className="space-y-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-temple-accent text-xs uppercase tracking-widest font-semibold block">
                  {language === 'bn' ? 'আরও পবিত্র সামগ্রী' : 'Sacred Suggestions'}
                </span>
                <h3 className="font-lora text-2xl font-bold text-temple-primary">
                  {language === 'bn' ? 'সম্পর্কিত দেবীয় সামগ্রী' : 'Related Deity Items'}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RELATED.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
