import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import LoadingSpinner from '../components/LoadingSpinner'
import GodsTicker from '../components/GodsTicker'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'
import {
  FaCalendarAlt, FaFacebookF,
  FaTwitter, FaWhatsapp, FaComment, FaOm
} from 'react-icons/fa'

const MOCK_ARTICLE = {
  _id: '1',
  title: 'শ্রীকৃষ্ণের শাশ্বত বাণী ও বিশ্বজনীন ধর্মের তাৎপর্য',
  content: `কুরুক্ষেত্রের পবিত্র রণক্ষেত্রে পাঁচ হাজার বছর পূর্বে ভগবান শ্রীকৃষ্ণ অর্জুনকে যে শাশ্বত উপদেশ প্রদান করেছিলেন, তা যুগে যুগে মানবজীবনের সমস্ত বিভ্রান্তি দূর করে পরম সত্যের সন্ধান দিয়ে আসছে।

### ১. আত্মা নিত্য, শাশ্বত ও অবিনাশী (আত্মতত্ত্ব)
শ্রীকৃষ্ণ সর্বপ্রথম অর্জুনকে স্মরণ করিয়ে দেন যে, এই জড় দেহ নশ্বর কিন্তু চৈতন্য আত্মা অবিনাশী। দেহ পরিবর্তনশীল কিন্তু আত্মা চিরন্তন।

> "ন জায়তে ম্রিয়তে বা কদাচিৎ নায় ভূত্বা ভবিতা বা ন ভূয়ঃ।
> অজো নিত্যঃ শাশ্বতোঽয়ং পুরাণো ন হন্যতে হন্যমানে শরীরে।" — শ্রীমদ্ভগবদ্গীতা ২.২০

### ২. নিষ্কাম কর্মযোগ: ফলের আকাঙ্ক্ষা বর্জন
গীতার অন্যতম শ্রেষ্ঠ স্তম্ভ হলো কর্মযোগ — ফলাকাঙ্ক্ষা বর্জন করে ভগবানের প্রীতিতে ও মানবকল্যাণে সমস্ত দায়িত্ব নিষ্ঠার সাথে সম্পাদন করা।

### ৩. ভক্তিযোগ: পরম প্রেমের সর্বশ্রেষ্ঠ পথ
ভক্তিযোগ হলো সমস্ত যোগের সার। অহংকার ত্যাগ করে শ্রী শ্রী রাধাকৃষ্ণের চরণে আত্মনিবেদনই মানবের মুক্তি আনে।

### ৪. আধুনিক জীবনে নিত্য সাধনা
- **প্রাতঃকালীন মহামন্ত্র জপ**: প্রতিদিন ব্রাহ্মমুহূর্তে হরে কৃষ্ণ মহামন্ত্র জপ।
- **প্রসাদ গ্রহণ**: শ্রীকৃষ্ণে নিবেদিত সাত্ত্বিক প্রসাদ গ্রহণ।
- **দৈনিক গীতা পাঠ**: প্রতিদিন গীতার অন্তত একটি শ্লোক অধ্যয়ন ও মনন।`,
  image: '/assets/img/blog/1.webp',
  author: 'আচার্য রাকেশ পাণ্ডে',
  authorBio: 'প্রধান পুরোহিত ও বৈদিক শাস্ত্রজ্ঞ, ৩০ বছরেরও বেশি সময় ধরে গীতা ও বেদান্ত অধ্যাপনায় নিবেদিত।',
  authorAvatar: '/assets/img/people/1.webp',
  category: 'Vedic Philosophy',
  tags: ['গীতা', 'জ্ঞান', 'কর্মযোগ', 'ভক্তি', 'বৃন্দাবন'],
  createdAt: '2026-08-15T00:00:00.000Z',
}

export default function BlogDetailPage() {
  const { id } = useParams()
  const { language } = useLanguage()
  const [blog, setBlog] = useState(MOCK_ARTICLE)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'পূজা শর্মা',
      date: '১৮ আগস্ট, ২০২৬',
      text: 'অত্যন্ত প্রাঞ্জল ও হৃদয়গ্রাহী আলোচনা। নিষ্কাম কর্মের মর্মার্থ অন্তরে পরম প্রশান্তি এনে দিলো।',
    },
    {
      id: 2,
      name: 'অমিতাভ রায়',
      date: '২০ আগস্ট, ২০২৬',
      text: 'জয় শ্রী রাধে! চমৎকার শাস্ত্রীয় বিশ্লেষণ। মন্দিরের আচার্যদের অনেক ধন্যবাদ ও প্রণাম।',
    },
  ])
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchBlog = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/api/blogs/${id}`)
        if (data && data.title) {
          setBlog(data)
        } else {
          setBlog(MOCK_ARTICLE)
        }
      } catch {
        setBlog(MOCK_ARTICLE)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentForm.name || !commentForm.comment) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে নাম ও মন্তব্য লিখুন' : 'Please enter your name and comment')
      return
    }
    const newComment = {
      id: Date.now(),
      name: commentForm.name,
      date: language === 'bn' ? 'এইমাত্র' : 'Just now',
      text: commentForm.comment,
    }
    api.post(`/api/blogs/${id}/comments`, {
      name: commentForm.name,
      email: commentForm.email,
      text: commentForm.comment,
    }).catch(() => {})

    setComments([newComment, ...comments])
    setCommentForm({ name: '', email: '', comment: '' })
    toast.success(language === 'bn' ? 'ধন্যবাদ! আপনার মন্তব্য সফলভাবে প্রকাশিত হয়েছে।' : 'Thank you! Your devotional comment has been posted.')
  }

  if (loading) return <LoadingSpinner />

  const date = blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'August 15, 2026'

  return (
    <div className="w-full">
      <PageBanner
        title={blog?.title || (language === 'bn' ? 'ধর্মকথা ও প্রবন্ধ' : 'Discourse')}
        subtitle={language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দির' : 'Sanatan Wisdom & Scripture'}
        breadcrumb={[
          { label: language === 'bn' ? 'ধর্মকথা' : 'Blog', href: '/blog' },
          { label: language === 'bn' ? 'প্রবন্ধ বিবরণ' : 'Article' },
        ]}
      />
      <GodsTicker />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-temple-light min-h-screen font-poppins">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Article Container */}
          <article className="bg-white p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8">
            {/* Header */}
            <div>
              <span className="inline-block bg-temple-accent text-white text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 mb-3">
                {blog?.category || 'Vedic Philosophy'}
              </span>

              <h1 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-bold text-temple-primary leading-tight">
                {blog?.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={blog?.authorAvatar || '/assets/img/people/1.webp'}
                    alt={blog?.author}
                    className="w-7 h-7 rounded-full object-cover border border-temple-accent"
                  />
                  <span className="font-semibold text-gray-800">{blog?.author || 'Acharya'}</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-temple-accent text-[11px]" />
                  <span>{date}</span>
                </div>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="aspect-[16/9] overflow-hidden bg-temple-primary border border-gray-100 shadow-xs">
              <img
                src={blog?.image || '/assets/img/blog/1.webp'}
                alt={blog?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Markdown/Article Content */}
            <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-poppins">
              {blog?.content}
            </div>

            {/* Tags & Social Share */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(blog?.tags || ['গীতা', 'ভক্তি', 'জ্ঞান']).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 font-medium hover:bg-temple-accent hover:text-white transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-700">{language === 'bn' ? 'শেয়ার করুন:' : 'Share:'}</span>
                <a href="#" className="p-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition-colors"><FaFacebookF /></a>
                <a href="#" className="p-2 bg-gray-100 hover:bg-sky-500 hover:text-white rounded-full transition-colors"><FaTwitter /></a>
                <a href="#" className="p-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full transition-colors"><FaWhatsapp /></a>
              </div>
            </div>

            {/* Author Profile Bio Card */}
            <div className="p-6 bg-temple-light border-l-4 border-temple-accent flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={blog?.authorAvatar || '/assets/img/people/1.webp'}
                alt={blog?.author}
                className="w-16 h-16 rounded-full object-cover border-2 border-temple-gold shadow-md shrink-0"
              />
              <div className="text-center sm:text-left space-y-1">
                <h4 className="font-lora font-bold text-temple-primary text-base">
                  {blog?.author || 'Acharya'}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {blog?.authorBio || 'Chief Priest and Vedic Scholar at Krishna Mega Temple.'}
                </p>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="bg-white p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8 font-poppins">
            <h3 className="font-lora text-2xl font-bold text-temple-primary flex items-center gap-2 border-b border-gray-100 pb-3">
              <FaComment className="text-temple-accent text-lg" />
              <span>{language === 'bn' ? `ভক্তদের মন্তব্য ও চিন্তা (${comments.length})` : `Devotee Reflections (${comments.length})`}</span>
            </h3>

            {/* Existing Comments */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="p-4 bg-temple-light border border-gray-100 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-temple-primary text-xs sm:text-sm">{c.name}</span>
                    <span className="text-[11px] text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="font-lora font-bold text-temple-primary text-lg">
                {language === 'bn' ? 'আপনার মন্তব্য প্রকাশ করুন' : 'Leave Your Reflection'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: পূজা শর্মা' : 'e.g. Devotee'}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                    placeholder="devotee@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {language === 'bn' ? 'আপনার মন্তব্য *' : 'Your Reflection *'}
                </label>
                <textarea
                  rows="4"
                  required
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                  placeholder={language === 'bn' ? 'এই প্রবন্ধ সম্পর্কে আপনার অনুভূতি বা উপলব্ধি লিখুন...' : 'Share your spiritual thoughts on this discourse...'}
                  className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="bg-temple-accent hover:bg-orange-700 text-white font-lora text-xs uppercase tracking-wider font-semibold py-3 px-6 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'মন্তব্য জমা দিন' : 'Submit Reflection'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
