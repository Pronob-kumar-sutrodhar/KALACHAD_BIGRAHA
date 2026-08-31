import { useState, useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import BlogCard from '../components/BlogCard'
import LoadingSpinner from '../components/LoadingSpinner'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { FaSearch, FaOm } from 'react-icons/fa'

const MOCK_BLOGS = [
  {
    _id: '1',
    title: 'শ্রী শ্রী কৃষ্ণ জন্মাষ্টমীর শাশ্বত মাহাত্ম্য ও দিব্য লীলা রহস্য',
    excerpt: 'কংসের কারাগারে মধ্যরাতে শ্রীকৃষ্ণের আবির্ভাবের গভীর তাৎপর্য, ননী চুরি এবং রাসলীলার পারমার্থিক তত্ত্ব।',
    image: '/assets/img/blog/1.webp',
    author: 'আচার্য রাকেশ পাণ্ডে',
    authorAvatar: '/assets/img/people/1.webp',
    category: 'Festivals',
    tags: ['জন্মাষ্টমী', 'ভক্তি', 'বৃন্দাবন'],
    createdAt: '2026-08-15T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'কর্ম ও ধর্মের রহস্য: শ্রীমদ্ভগবদ্গীতার মূল শিক্ষা',
    excerpt: 'ফলাকাঙ্ক্ষা বর্জন করে কীভাবে কর্তব্য কর্ম সম্পাদন করতে হয়। আধুনিক মানসিক চাপ ও উদ্বেগ থেকে মুক্তির চিরন্তন পথ।',
    image: '/assets/img/blog/2.webp',
    author: 'স্বামী য়েশ চোপড়া',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Vedic Philosophy',
    tags: ['গীতা', 'কর্মযোগ', 'জ্ঞান'],
    createdAt: '2026-08-08T00:00:00.000Z',
  },
  {
    _id: '3',
    title: 'ভোরবেলার মঙ্গল আরতি ও মহামন্ত্র জপের শক্তি',
    excerpt: 'ব্রাহ্মমুহূর্তে সূর্যোদয়ের পূর্বে ভগবৎ আরাধনায় মনঃসংযোগ ও আধ্যাত্মিক শক্তির জাগরণ ঘটে।',
    image: '/assets/img/blog/3.webp',
    author: 'পণ্ডিত মোহন দাস',
    authorAvatar: '/assets/img/people/1.webp',
    category: 'Sadhana',
    tags: ['মহামন্ত্র', 'আরতি', 'ধ্যান'],
    createdAt: '2026-07-28T00:00:00.000Z',
  },
  {
    _id: '4',
    title: 'পবিত্র অন্নদানের মহিমা: ক্ষুধাতুরকে খাদ্যদানই শ্রেষ্ঠ পূজা',
    excerpt: 'বৈদিক শাস্ত্রে অন্নকে ব্রহ্মস্বরূপ বলা হয়েছে। কীভাবে প্রসাদ বিতরণ আধ্যাত্মিক মুক্তি আনয়ন করে।',
    image: '/assets/img/donation/6.webp',
    author: 'আচার্য এম. কাপুর',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Seva & Charity',
    tags: ['অন্নদান', 'প্রসাদ', 'সেবা'],
    createdAt: '2026-07-15T00:00:00.000Z',
  },
  {
    _id: '5',
    title: 'সনাতন ধর্মে তুলসী বৃক্ষের তাৎপর্য ও নিত্য পূজা বিধি',
    excerpt: 'শ্রীমতী তুলসী দেবী ভগবান শ্রীকৃষ্ণের পরম প্রিয়া ভক্ত। কেন প্রতিটি গৃহে তুলসী সেবা কল্যাণকর।',
    image: '/assets/img/puja/4.webp',
    author: 'স্বামী য়েশ চোপড়া',
    authorAvatar: '/assets/img/people/2.webp',
    category: 'Rituals',
    tags: ['তুলসী সেবা', 'পূজা', 'প্রকৃতি'],
    createdAt: '2026-06-20T00:00:00.000Z',
  },
]

const CATEGORIES_DATA = [
  { key: 'All', bn: 'সকল প্রবন্ধ', en: 'All Articles' },
  { key: 'Vedic Philosophy', bn: 'বেদান্ত ও দর্শন', en: 'Vedic Philosophy' },
  { key: 'Festivals', bn: 'উৎসব মাহাত্ম্য', en: 'Festivals' },
  { key: 'Sadhana', bn: 'ভক্তি সাধনা', en: 'Sadhana' },
  { key: 'Seva & Charity', bn: 'সেবা ও দান', en: 'Seva & Charity' },
  { key: 'Rituals', bn: 'পূজা পদ্ধতি', en: 'Rituals' },
]

export default function BlogPage() {
  const { language } = useLanguage()
  const [blogs, setBlogs] = useState(MOCK_BLOGS)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/api/blogs')
        if (data && data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs)
        } else if (Array.isArray(data) && data.length > 0) {
          setBlogs(data)
        } else {
          setBlogs(MOCK_BLOGS)
        }
      } catch {
        setBlogs(MOCK_BLOGS)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const filtered = blogs.filter((b) => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory
    const matchSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="w-full">
      <PageBanner
        title={language === 'bn' ? 'ধর্মকথা, গীতা প্রবচন ও আধ্যাত্মিক প্রবন্ধ' : 'Katha & Vedic Discourses'}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Sanatan Wisdom & Scripture'}
        breadcrumb={[{ label: language === 'bn' ? 'ধর্মকথা' : 'Blog' }]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Blog Grid (8 cols) */}
          <main className="lg:col-span-8">
            {loading ? (
              <LoadingSpinner />
            ) : filtered.length === 0 ? (
              <div className="bg-white p-12 text-center border border-gray-200 shadow-xs">
                <FaOm className="text-4xl text-gray-300 mx-auto mb-3" />
                <h3 className="font-lora text-xl font-bold text-temple-primary">
                  {language === 'bn' ? 'কোনো ধর্মকথা পাওয়া যায়নি' : 'No Discourses Found'}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {language === 'bn' ? 'অনুগ্রহ করে অন্য শব্দ দিয়ে অনুসন্ধান করুন।' : 'Try searching for other spiritual keywords or reset category filter.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </main>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Search Box */}
            <div className="bg-white p-6 border border-gray-200 shadow-xs space-y-3">
              <h3 className="font-lora text-lg font-bold text-temple-primary border-b border-gray-100 pb-2">
                {language === 'bn' ? 'প্রবন্ধ অনুসন্ধান' : 'Search Katha'}
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'যেমন: গীতা, জন্মাষ্টমী...' : 'Search articles, Gita verses...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 border border-gray-200 shadow-xs space-y-3">
              <h3 className="font-lora text-lg font-bold text-temple-primary border-b border-gray-100 pb-2">
                {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
              </h3>
              <div className="space-y-1.5">
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategory === cat.key
                        ? 'bg-temple-primary text-temple-gold shadow-xs font-bold'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-temple-accent'
                    }`}
                  >
                    <span>{language === 'bn' ? cat.bn : cat.en}</span>
                    <span className="text-[10px]">&rsaquo;</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
