import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ProductCard from '../components/ProductCard'
import QuickViewModal from '../components/QuickViewModal'
import LoadingSpinner from '../components/LoadingSpinner'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { FaFilter, FaOm } from 'react-icons/fa'

const CATEGORIES_DATA = [
  { key: 'All', bn: 'সকল সামগ্রী', en: 'All Items' },
  { key: 'Idols & Murtis', bn: 'বিগ্রহ ও মূর্তি', en: 'Idols & Murtis' },
  { key: 'Vedic Books', bn: 'ধর্মগ্রন্থ ও গীতা', en: 'Vedic Books' },
  { key: 'Dhoop & Incense', bn: 'ধূপ ও সুগন্ধি', en: 'Dhoop & Incense' },
  { key: 'Puja Samagri', bn: 'পূজা সামগ্রী ও থালি', en: 'Puja Samagri' },
  { key: 'Japa Malas', bn: 'তুলসী ও জপমালা', en: 'Japa Malas' },
  { key: 'Devotional Attire', bn: 'পবিত্র বস্ত্র ও উত্তরীয়', en: 'Devotional Attire' },
  { key: 'Sacred Prasad', bn: 'প্রসাদী খাদ্য ও পেঁড়া', en: 'Sacred Prasad' },
]

const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'শ্রী শ্রী রাধাকৃষ্ণ অষ্টধাতু বিগ্রহ (হস্তনির্মিত)',
    price: 3500,
    originalPrice: 4500,
    image: '/assets/img/products/new/1.webp',
    rating: 5,
    numReviews: 48,
    category: 'Idols & Murtis',
    description: '৯ ইঞ্চি খাঁটি অষ্টধাতু শ্রী শ্রী রাধাকৃষ্ণ বিগ্রহ, মথুরায় নির্মিত ও মন্দির গর্ভগৃহে পূজিত।',
  },
  {
    _id: '2',
    name: 'শ্রীমদ্ভগবদ্গীতা যথাযথ (হার্ডবাউন্ড সংস্করণ)',
    price: 450,
    originalPrice: 600,
    image: '/assets/img/blog/2.webp',
    rating: 5,
    numReviews: 112,
    category: 'Vedic Books',
    description: 'মূল সংস্কৃত শ্লোক, অন্বয়, বঙ্গানুবাদ এবং তাৎপর্য সহ সম্পূর্ণ শ্রীমদ্ভগবদ্গীতা।',
  },
  {
    _id: '3',
    name: 'প্রাকৃতিক বৃন্দাবন চন্দন ধূপ ও শঙ্ক (৩ প্যাকেট)',
    price: 250,
    originalPrice: 350,
    image: '/assets/img/puja/4.webp',
    rating: 4.8,
    numReviews: 64,
    category: 'Dhoop & Incense',
    description: 'খাঁটি চন্দন কাঠের গুঁড়া ও ভেষজ উপাদানে হাতে তৈরি সুগন্ধি ধূপকাঠি।',
  },
  {
    _id: '4',
    name: 'রূপার প্রলেপযুক্ত পঞ্চপ্রদীপ মহা আরতি থালি সেট',
    price: 1850,
    originalPrice: 2200,
    image: '/assets/img/puja/1.webp',
    rating: 4.9,
    numReviews: 36,
    category: 'Puja Samagri',
    description: 'মঙ্গল আরতি, পঞ্চপাত্র ও প্রদীপ সমন্বিত খোদাই করা পিতল ও রূপার থালি।',
  },
  {
    _id: '5',
    name: 'আসল ১০৮+১ তুলসী জপমালা ও রেশমি ঝুলি',
    price: 350,
    originalPrice: 500,
    image: '/assets/img/puja/3.webp',
    rating: 5,
    numReviews: 89,
    category: 'Japa Malas',
    description: 'খাঁটি তুলসী কাষ্ঠের তৈরি মহাপ্রভুর পবিত্র মহামন্ত্র জপের মালা।',
  },
  {
    _id: '6',
    name: 'পূজার জন্য খাঁটি সিল্কের পীতাম্বরী ধুতি ও উত্তরীয়',
    price: 1200,
    originalPrice: 1600,
    image: '/assets/img/banner/s1.webp',
    rating: 4.7,
    numReviews: 28,
    category: 'Devotional Attire',
    description: 'পূজা ও যজ্ঞের জন্য শুভ হলুদ জরির পাড়যুক্ত সিল্কের পীতাম্বরী ধুতি।',
  },
  {
    _id: '7',
    name: 'শ্রী জগন্নাথ, বলদেব ও সুভদ্রা কাষ্ঠ বিগ্রহ সেট',
    price: 2200,
    originalPrice: 2800,
    image: '/assets/img/puja/5.webp',
    rating: 5,
    numReviews: 42,
    category: 'Idols & Murtis',
    description: 'পুরীর ঐতিহ্যবাহী নিম কাষ্ঠের হস্তনির্মিত ত্রিমূর্তি দেববিগ্রহ।',
  },
  {
    _id: '8',
    name: 'মথুরার পেঁড়া ও ভোগ নিবেদিত প্রসাদ বক্স (৫০০ গ্রাম)',
    price: 480,
    originalPrice: 600,
    image: '/assets/img/puja/6.webp',
    rating: 4.9,
    numReviews: 95,
    category: 'Sacred Prasad',
    description: 'খাঁটি গরুর ঘিয়ে তৈরি ও ভগবান শ্রীকৃষ্ণের শ্রীপাদপদ্মে নিবেদিত পেঁড়া।',
  },
]

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const { language, formatMoney } = useLanguage()

  const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState(5000)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/api/products')
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products)
        } else if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(MOCK_PRODUCTS)
        }
      } catch {
        setProducts(MOCK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products
    .filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchPrice = (p.price || 0) <= priceRange
      return matchCat && matchSearch && matchPrice
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5)
      return 0
    })

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'মন্দির ভাণ্ডার ও পূজা সামগ্রী' : 'Temple Store & Samagri'}
        subtitle={searchQuery ? `${language === 'bn' ? 'অনুসন্ধান ফলাফল:' : 'Search results for:'} "${searchQuery}"` : (language === 'bn' ? 'পবিত্র বিগ্রহ ও গ্রন্থ' : 'Consecrated Offerings')}
        breadcrumb={[{ label: language === 'bn' ? 'স্টোর' : 'Store' }]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar: Count & Sort */}
          <div className="bg-white border border-gray-200 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-xs text-gray-500">
                {language === 'bn' ? 'মোট সামগ্রী পাওয়া গেছে:' : 'Showing'}{' '}
                <strong className="text-temple-primary font-bold">{filteredProducts.length}</strong> {language === 'bn' ? 'টি' : 'items'}
              </span>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1 text-xs font-semibold text-temple-accent border border-temple-accent/40 px-3 py-1.5"
              >
                <FaFilter className="text-[10px]" />
                <span>{language === 'bn' ? 'ফিল্টার' : 'Filters'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label className="text-xs font-semibold text-gray-700">
                {language === 'bn' ? 'সাজান:' : 'Sort By:'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden bg-white"
              >
                <option value="newest">{language === 'bn' ? 'নতুন ও জনপ্রিয়' : 'Featured / Newest'}</option>
                <option value="price_asc">{language === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
                <option value="price_desc">{language === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
                <option value="rating">{language === 'bn' ? 'সর্বোচ্চ রেটিংপ্রাপ্ত' : 'Top Customer Rated'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Filters Left (3 cols) */}
            <aside
              className={`lg:col-span-3 space-y-6 ${
                mobileFilterOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              {/* Category Filter */}
              <div className="bg-white border border-gray-200 p-6 shadow-xs space-y-4">
                <h3 className="font-lora text-lg font-bold text-temple-primary border-b border-gray-100 pb-2">
                  {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
                </h3>
                <div className="space-y-1.5">
                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.key
                          ? 'bg-temple-primary text-temple-gold font-bold shadow-xs'
                          : 'text-gray-600 hover:bg-orange-50 hover:text-temple-accent'
                      }`}
                    >
                      <span>{language === 'bn' ? cat.bn : cat.en}</span>
                      <span className="text-[10px] opacity-60">&rsaquo;</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter in BDT */}
              <div className="bg-white border border-gray-200 p-6 shadow-xs space-y-4">
                <h3 className="font-lora text-lg font-bold text-temple-primary border-b border-gray-100 pb-2">
                  {language === 'bn' ? 'সর্বোচ্চ বাজেট (টাকা)' : 'Filter by Price (BDT)'}
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-temple-accent"
                  />
                  <div className="flex justify-between text-xs text-gray-500 font-semibold">
                    <span>৳ ১০০</span>
                    <span className="text-temple-accent font-bold font-lora text-sm">{formatMoney(priceRange)}</span>
                  </div>
                </div>
              </div>

              {/* Devotee Assistance Banner */}
              <div className="bg-temple-primary text-white p-6 border-l-4 border-temple-gold space-y-3">
                <div className="flex items-center gap-2 text-temple-gold text-xs font-bold uppercase tracking-wider">
                  <FaOm />
                  <span>{language === 'bn' ? 'বিশেষ সেবা' : 'Temple Assistance'}</span>
                </div>
                <h4 className="font-lora font-bold text-base">
                  {language === 'bn' ? 'কাস্টম বিগ্রহ বা পূজা বুকিং?' : 'Custom Deity Orders?'}
                </h4>
                <p className="text-white/75 text-xs leading-relaxed">
                  {language === 'bn' ? 'আপনার গৃহমন্দিরের জন্য বিশেষ আকারের বিগ্রহের জন্য যোগাযোগ করুন।' : 'Contact our temple sevaks for customized murtis or bulk puja orders.'}
                </p>
                <a href="tel:+8801700000000" className="inline-block text-xs font-bold text-temple-gold hover:underline">
                  +৮৮০ ১৭০০-০০০০০০
                </a>
              </div>
            </aside>

            {/* Products Grid Right (9 cols) */}
            <main className="lg:col-span-9">
              {loading ? (
                <LoadingSpinner />
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white border border-gray-200 p-12 text-center space-y-4">
                  <FaOm className="text-4xl text-gray-300 mx-auto" />
                  <h3 className="font-lora text-xl font-bold text-temple-primary">
                    {language === 'bn' ? 'কোনো সামগ্রী পাওয়া যায়নি' : 'No Sanctified Products Found'}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {language === 'bn' ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন।' : 'Try adjusting your category or price filters.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All')
                      setPriceRange(5000)
                    }}
                    className="kr-btn-custom inline-block text-xs"
                  >
                    {language === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}
