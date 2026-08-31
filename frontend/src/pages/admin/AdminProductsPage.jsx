import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaBoxOpen,
  FaCheckCircle, FaTimesCircle, FaImage, FaTimes
} from 'react-icons/fa'

const CATEGORIES = [
  'All',
  'Idols & Murtis',
  'Vedic Books',
  'Dhoop & Incense',
  'Puja Samagri',
  'Japa Malas',
  'Devotional Attire',
  'Sacred Prasad',
]

export default function AdminProductsPage() {
  const { language, formatMoney } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Puja Samagri',
    price: '',
    originalPrice: '',
    countInStock: '15',
    image: '/assets/img/products/new/1.webp',
    description: '',
  })

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/products')
      const items = res.data.products || res.data || []
      setProducts(Array.isArray(items) ? items : [])
    } catch (err) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      name: '',
      category: 'Puja Samagri',
      price: '',
      originalPrice: '',
      countInStock: '15',
      image: '/assets/img/products/new/1.webp',
      description: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (p) => {
    setEditingId(p._id)
    setFormData({
      name: p.name || '',
      category: p.category || 'Puja Samagri',
      price: p.price || '',
      originalPrice: p.originalPrice || '',
      countInStock: p.countInStock !== undefined ? p.countInStock : '15',
      image: p.image || '/assets/img/products/new/1.webp',
      description: p.description || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে নাম এবং মূল্য প্রদান করুন' : 'Name and price are required')
      return
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || 0,
      countInStock: Number(formData.countInStock) || 0,
    }

    try {
      if (editingId) {
        await api.put(`/api/products/${editingId}`, payload)
        toast.success(language === 'bn' ? 'পণ্য সফলভাবে আপডেট করা হয়েছে!' : 'Product updated successfully!')
      } else {
        await api.post('/api/products', payload)
        toast.success(language === 'bn' ? 'নতুন পণ্য সফলভাবে তৈরি হয়েছে!' : 'Product created successfully!')
      }
      setModalOpen(false)
      fetchProducts()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(language === 'bn' ? `আপনি কি "${name}" মুছে ফেলতে চান?` : `Delete product "${name}"?`)) {
      return
    }

    try {
      await api.delete(`/api/products/${id}`)
      toast.success(language === 'bn' ? 'পণ্য মুছে ফেলা হয়েছে' : 'Product deleted')
      setProducts(products.filter((p) => p._id !== id))
    } catch (err) {
      toast.error('Failed to delete product')
    }
  }

  const filtered = products.filter((p) => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'মন্দির ভাণ্ডার পণ্য তালিকা' : 'Inventory & Store Catalog'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'পণ্য ও সেবা সামগ্রী পরিচালনা' : 'Manage Store Products'}
          </h2>
        </div>

        <button
          onClick={handleOpenAdd}
          className="kr-btn-custom flex items-center gap-2 py-2.5 px-4 text-xs cursor-pointer"
        >
          <FaPlus />
          <span>{language === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
            {language === 'bn' ? 'ক্যাটাগরি:' : 'Category:'}
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 text-xs bg-white focus:outline-hidden focus:border-temple-accent"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ছবি</th>
                <th className="py-3.5 px-4">পণ্যের নাম</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">মূল্য (BDT)</th>
                <th className="py-3.5 px-4">স্টক</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={p.image || '/assets/img/products/new/1.webp'}
                        alt={p.name}
                        className="w-12 h-12 object-cover border border-gray-200"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-xs truncate">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{p.category}</td>
                    <td className="py-3 px-4 font-lora font-bold text-temple-accent text-sm">
                      {formatMoney(p.price)}
                    </td>
                    <td className="py-3 px-4">
                      {(p.countInStock || 0) > 0 ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-xs">
                          <FaCheckCircle className="text-[10px]" />
                          {p.countInStock} টি স্টকে
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded-xs">
                          <FaTimesCircle className="text-[10px]" />
                          স্টক শেষ
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
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
          <div className="bg-white max-w-lg w-full p-6 shadow-2xl border-t-4 border-temple-accent relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>

            <h3 className="font-lora text-xl font-bold text-temple-primary mb-4">
              {editingId
                ? language === 'bn'
                  ? 'পণ্য সম্পাদনা করুন'
                  : 'Edit Product'
                : language === 'bn'
                ? 'নতুন পণ্য যুক্ত করুন'
                : 'Add New Product'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">পণ্যের নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-hidden focus:border-temple-accent"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">স্টক পরিমাণ *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.countInStock}
                    onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">বিক্রয় মূল্য (BDT ৳) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent font-bold text-temple-accent"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">মূল দাম / অফার পূর্বমূল্য (BDT ৳)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ছবির URL / পাথ *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/img/products/new/1.webp"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">পণ্যের পবিত্র বিবরণ ও মাহাত্ম্য</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
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
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
