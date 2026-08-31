import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaBookOpen, FaComment,
  FaCalendarAlt, FaTimes, FaUserAlt
} from 'react-icons/fa'

const BLOG_CATEGORIES = [
  'Vedic Philosophy',
  'Temple Heritage',
  'Devotional Stories',
  'Festivals & Tithis',
  'Scripture Study',
]

export default function AdminBlogsPage() {
  const { language } = useLanguage()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: 'আচার্য রাকেশ পাণ্ডে',
    authorBio: 'প্রধান পুরোহিত ও বৈদিক শাস্ত্রজ্ঞ',
    category: 'Vedic Philosophy',
    tags: 'গীতা, ভক্তি, জ্ঞান',
    image: '/assets/img/blog/1.webp',
    content: '',
  })

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/blogs')
      const items = res.data.blogs || res.data || []
      setBlogs(Array.isArray(items) ? items : [])
    } catch {
      toast.error('Failed to load discourses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      title: '',
      author: 'আচার্য রাকেশ পাণ্ডে',
      authorBio: 'প্রধান পুরোহিত ও বৈদিক শাস্ত্রজ্ঞ',
      category: 'Vedic Philosophy',
      tags: 'গীতা, ভক্তি, জ্ঞান',
      image: '/assets/img/blog/1.webp',
      content: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (b) => {
    setEditingId(b._id)
    setFormData({
      title: b.title || '',
      author: b.author || 'আচার্য রাকেশ পাণ্ডে',
      authorBio: b.authorBio || '',
      category: b.category || 'Vedic Philosophy',
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags || '',
      image: b.image || '/assets/img/blog/1.webp',
      content: b.content || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      toast.error('Discourse title and content are required')
      return
    }

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }

    try {
      if (editingId) {
        await api.put(`/api/blogs/${editingId}`, payload)
        toast.success('Discourse updated successfully!')
      } else {
        await api.post('/api/blogs', payload)
        toast.success('New spiritual discourse published!')
      }
      setModalOpen(false)
      fetchBlogs()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving discourse')
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete discourse "${title}"?`)) return
    try {
      await api.delete(`/api/blogs/${id}`)
      toast.success('Discourse removed')
      setBlogs(blogs.filter((b) => b._id !== id))
    } catch {
      toast.error('Failed to delete discourse')
    }
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'সনাতন শাস্ত্রীয় বাণী ও ধর্মকথা' : 'Sanatan Discourses & Katha'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'ধর্মকথা ও প্রবন্ধ পরিচালনা' : 'Manage Discourses & Articles'}
          </h2>
        </div>

        <button
          onClick={handleOpenAdd}
          className="kr-btn-custom flex items-center gap-2 py-2.5 px-4 text-xs cursor-pointer"
        >
          <FaPlus />
          <span>{language === 'bn' ? 'নতুন প্রবন্ধ লিখুন' : 'Write New Article'}</span>
        </button>
      </div>

      {/* Blogs Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ছবি</th>
                <th className="py-3.5 px-4">প্রবন্ধের শিরোনাম</th>
                <th className="py-3.5 px-4">লেখক</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">তারিখ</th>
                <th className="py-3.5 px-4">মন্তব্য</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    কোনো প্রবন্ধ পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={b.image || '/assets/img/blog/1.webp'}
                        alt={b.title}
                        className="w-12 h-12 object-cover border border-gray-200"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-xs truncate">
                      {b.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{b.author}</td>
                    <td className="py-3 px-4 text-gray-500">{b.category}</td>
                    <td className="py-3 px-4 text-gray-400 text-[11px]">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '২০২৬'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-temple-accent font-semibold bg-orange-50 px-2 py-0.5 rounded-xs">
                        <FaComment className="text-[10px]" />
                        {b.comments?.length || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id, b.title)}
                        className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white max-w-2xl w-full p-6 shadow-2xl border-t-4 border-temple-accent relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>

            <h3 className="font-lora text-xl font-bold text-temple-primary mb-4">
              {editingId ? 'প্রবন্ধ সম্পাদনা করুন' : 'নতুন আধ্যাত্মিক প্রবন্ধ প্রকাশ করুন'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">প্রবন্ধের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: শ্রীকৃষ্ণের শাশ্বত বাণী ও গীতার কর্মযোগ"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">লেখক / আচার্য *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-hidden focus:border-temple-accent"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ট্যাগসমূহ (কমা দিয়ে পৃথক)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="গীতা, ভক্তি, কর্মযোগ, বৃন্দাবন"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ছবির URL / পাথ *</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/img/blog/1.webp"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">প্রবন্ধের বিষয়বস্তু (Markdown সমর্থিত) *</label>
                <textarea
                  rows="8"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="সম্পূর্ণ প্রবন্ধের বিস্তারিত লিখুন..."
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 cursor-pointer"
                >
                  বাতিল
                </button>
                <button type="submit" className="kr-btn-custom px-6 py-2 cursor-pointer">
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
