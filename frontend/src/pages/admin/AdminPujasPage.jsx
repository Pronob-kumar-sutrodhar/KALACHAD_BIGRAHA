import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaPrayingHands, FaCalendarCheck,
  FaTimes, FaCheckCircle, FaUserCheck, FaClock
} from 'react-icons/fa'

const PUJA_CATEGORIES = [
  'Daily Aarti',
  'Janmashtami',
  'Durga Puja',
  'Mahashivratri',
  'Diwali',
  'Special Yajna',
]

export default function AdminPujasPage() {
  const { language, formatMoney } = useLanguage()
  const [activeTab, setActiveTab] = useState('services') // 'services' | 'bookings'
  const [pujas, setPujas] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Puja Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Daily Aarti',
    price: '৳ ৫০১ দক্ষিণা',
    schedule: 'প্রতিদিন ভোর ০৪:১৫ – ০৫:১৫',
    image: '/assets/img/puja/1.webp',
    description: '',
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const [pujaRes, bookingRes] = await Promise.allSettled([
        api.get('/api/pujas'),
        api.get('/api/pujas/bookings'),
      ])
      if (pujaRes.status === 'fulfilled') {
        const pList = pujaRes.value.data.pujas || pujaRes.value.data || []
        setPujas(Array.isArray(pList) ? pList : [])
      }
      if (bookingRes.status === 'fulfilled') {
        setBookings(Array.isArray(bookingRes.value.data) ? bookingRes.value.data : [])
      }
    } catch {
      toast.error('Failed to load puja data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      title: '',
      category: 'Daily Aarti',
      price: '৳ ৫০১ দক্ষিণা',
      schedule: 'প্রতিদিন ভোর ০৪:১৫ – ০৫:১৫',
      image: '/assets/img/puja/1.webp',
      description: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (p) => {
    setEditingId(p._id)
    setFormData({
      title: p.title || '',
      category: p.category || 'Daily Aarti',
      price: p.price || '৳ ৫০১ দক্ষিণা',
      schedule: p.schedule || '',
      image: p.image || '/assets/img/puja/1.webp',
      description: p.description || '',
    })
    setModalOpen(true)
  }

  const handleSubmitPuja = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.price) {
      toast.error('Puja title and dakshina are required')
      return
    }

    try {
      if (editingId) {
        await api.put(`/api/pujas/${editingId}`, formData)
        toast.success('Puja offering updated!')
      } else {
        await api.post('/api/pujas', formData)
        toast.success('New puja offering created!')
      }
      setModalOpen(false)
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving puja')
    }
  }

  const handleDeletePuja = async (id, title) => {
    if (!window.confirm(`Delete puja offering "${title}"?`)) return
    try {
      await api.delete(`/api/pujas/${id}`)
      toast.success('Puja removed')
      setPujas(pujas.filter((p) => p._id !== id))
    } catch {
      toast.error('Failed to delete puja')
    }
  }

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await api.put(`/api/pujas/bookings/${id}`, { status })
      toast.success(`Booking status updated to ${status}`)
      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status } : b))
      )
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this devotee booking?')) return
    try {
      await api.delete(`/api/pujas/bookings/${id}`)
      toast.success('Booking deleted')
      setBookings(bookings.filter((b) => b._id !== id))
    } catch {
      toast.error('Failed to delete booking')
    }
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'বৈদিক পূজা ও অর্চনা সেবা' : 'Sacred Archana & Sankalp'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'পূজা তালিকা ও ভক্তদের সংকল্প বুকিং' : 'Manage Pujas & Bookings'}
          </h2>
        </div>

        {activeTab === 'services' && (
          <button
            onClick={handleOpenAdd}
            className="kr-btn-custom flex items-center gap-2 py-2.5 px-4 text-xs cursor-pointer"
          >
            <FaPlus />
            <span>{language === 'bn' ? 'নতুন পূজা সেবা যোগ করুন' : 'Add Puja Offering'}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-2 shadow-xs">
        <button
          onClick={() => setActiveTab('services')}
          className={`font-lora text-xs sm:text-sm font-bold py-3 px-6 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'services'
              ? 'border-temple-accent text-temple-accent'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          {language === 'bn' ? `পূজা সেবাসমূহ (${pujas.length})` : `Puja Services (${pujas.length})`}
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`font-lora text-xs sm:text-sm font-bold py-3 px-6 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'bookings'
              ? 'border-temple-accent text-temple-accent'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          {language === 'bn' ? `ভক্তদের সংকল্প বুকিং (${bookings.length})` : `Devotee Bookings (${bookings.length})`}
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : activeTab === 'services' ? (
        /* Tab 1: Puja Services List */
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ছবি</th>
                <th className="py-3.5 px-4">পূজার নাম</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">দক্ষিণা</th>
                <th className="py-3.5 px-4">সময়সূচী</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pujas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    কোনো পূজা সেবা পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                pujas.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={p.image || '/assets/img/puja/1.webp'}
                        alt={p.title}
                        className="w-12 h-12 object-cover border border-gray-200"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-xs truncate">
                      {p.title}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{p.category}</td>
                    <td className="py-3 px-4 font-lora font-bold text-temple-accent text-sm">
                      {p.price}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{p.schedule}</td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeletePuja(p._id, p.title)}
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
      ) : (
        /* Tab 2: Devotee Bookings List */
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">বুকিং আইডি</th>
                <th className="py-3.5 px-4">ভক্তের নাম ও গোত্র</th>
                <th className="py-3.5 px-4">পূজার নাম</th>
                <th className="py-3.5 px-4">তারিখ ও সময়</th>
                <th className="py-3.5 px-4">যোগাযোগ</th>
                <th className="py-3.5 px-4">অবস্থা (Status)</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    কোনো সংকল্প বুকিং জমা পড়েনি
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-temple-accent">
                      {b.bookingRef || b._id.substring(0, 8)}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-gray-800 block text-sm">{b.devoteeName}</strong>
                      <span className="text-[11px] text-gray-400">
                        গোত্র: {b.gotra || 'কশ্যপ'} &bull; নক্ষত্র: {b.nakshatra || 'রোহিণী'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{b.pujaTitle}</td>
                    <td className="py-3 px-4">
                      <span className="block font-semibold text-gray-800">{b.date}</span>
                      <span className="text-[11px] text-gray-500">{b.timeSlot}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="block font-semibold">{b.phone}</span>
                      <span className="text-[11px] text-gray-400">{b.email || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={b.status || 'Confirmed'}
                        onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                        className={`px-2 py-1 text-[11px] font-semibold rounded-xs border ${
                          b.status === 'Completed'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : b.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                        <option value="Completed">Completed (সম্পন্ন)</option>
                        <option value="Cancelled">Cancelled (বাতিল)</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteBooking(b._id)}
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

      {/* ── Add / Edit Puja Modal ── */}
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
              {editingId ? 'পূজা সেবা সম্পাদনা' : 'নতুন পূজা সেবা যুক্ত করুন'}
            </h3>

            <form onSubmit={handleSubmitPuja} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">পূজার নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: শ্রী শ্রী রাধাকৃষ্ণ নিত্য মঙ্গল আরতি"
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
                    {PUJA_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">দক্ষিণা টেক্সট *</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="৳ ৫০১ দক্ষিণা"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent font-bold text-temple-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">সময়সূচী *</label>
                <input
                  type="text"
                  required
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="প্রতিদিন ভোর ০৪:১৫ – ০৫:১৫"
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
                  placeholder="/assets/img/puja/1.webp"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">পূজার মাহাত্ম্য ও সুফল</label>
                <textarea
                  rows="3"
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
