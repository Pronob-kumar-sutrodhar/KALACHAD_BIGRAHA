import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaUsers,
  FaMapMarkerAlt, FaClock, FaTimes
} from 'react-icons/fa'

const EVENT_CATEGORIES = [
  'Grand Festival',
  'Devotional Festival',
  'Annakut Puja',
  'Deepotsav',
  'Gita Seminar',
  'Rath Yatra',
]

export default function AdminEventsPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('events') // 'events' | 'rsvps'
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Grand Festival',
    date: '2026-08-26T00:00:00.000Z',
    time: 'সকাল ১০:০০ – মধ্যরাত ১২:৩০',
    location: 'মূল গর্ভগৃহ ও মন্দির প্রাঙ্গণ',
    priest: 'পণ্ডিত রাকেশ কুমার পাণ্ডে ও দল',
    image: '/assets/img/banner/s1.webp',
    description: '',
  })

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/events')
      const items = res.data.events || res.data || []
      setEvents(Array.isArray(items) ? items : [])
    } catch {
      toast.error('Failed to load festivals')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      title: '',
      category: 'Grand Festival',
      date: new Date().toISOString(),
      time: 'সকাল ১০:০০ – দুপুর ০১:০০',
      location: 'মূল গর্ভগৃহ ও মন্দির প্রাঙ্গণ',
      priest: 'পণ্ডিত রাকেশ কুমার পাণ্ডে ও দল',
      image: '/assets/img/banner/s1.webp',
      description: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (ev) => {
    setEditingId(ev._id)
    setFormData({
      title: ev.title || '',
      category: ev.category || 'Grand Festival',
      date: ev.date || new Date().toISOString(),
      time: ev.time || '',
      location: ev.location || '',
      priest: ev.priest || '',
      image: ev.image || '/assets/img/banner/s1.webp',
      description: ev.description || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.date) {
      toast.error('Event title and date are required')
      return
    }

    try {
      if (editingId) {
        await api.put(`/api/events/${editingId}`, formData)
        toast.success('Festival schedule updated!')
      } else {
        await api.post('/api/events', formData)
        toast.success('New festival added to calendar!')
      }
      setModalOpen(false)
      fetchEvents()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving festival')
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete festival "${title}"?`)) return
    try {
      await api.delete(`/api/events/${id}`)
      toast.success('Festival removed')
      setEvents(events.filter((e) => e._id !== id))
    } catch {
      toast.error('Failed to delete festival')
    }
  }

  // Aggregate all RSVPs across events
  const allRsvps = events.flatMap((ev) =>
    (ev.rsvps || []).map((r) => ({
      ...r,
      eventTitle: ev.title,
      eventDate: ev.date,
    }))
  )

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'মন্দির বার্ষিক মহোৎসব ও তিথি' : 'Festival Calendar & Devotee RSVPs'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'মহোৎসব ও মেলা ক্যালেন্ডার পরিচালনা' : 'Manage Events & Festivals'}
          </h2>
        </div>

        {activeTab === 'events' && (
          <button
            onClick={handleOpenAdd}
            className="kr-btn-custom flex items-center gap-2 py-2.5 px-4 text-xs cursor-pointer"
          >
            <FaPlus />
            <span>{language === 'bn' ? 'নতুন উৎসব যুক্ত করুন' : 'Add New Festival'}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-2 shadow-xs">
        <button
          onClick={() => setActiveTab('events')}
          className={`font-lora text-xs sm:text-sm font-bold py-3 px-6 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'events'
              ? 'border-temple-accent text-temple-accent'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          {language === 'bn' ? `উৎসব তালিকাসমূহ (${events.length})` : `Festivals (${events.length})`}
        </button>
        <button
          onClick={() => setActiveTab('rsvps')}
          className={`font-lora text-xs sm:text-sm font-bold py-3 px-6 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'rsvps'
              ? 'border-temple-accent text-temple-accent'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          {language === 'bn' ? `ভক্তদের নিবন্ধন (RSVP: ${allRsvps.length})` : `Devotee RSVPs (${allRsvps.length})`}
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : activeTab === 'events' ? (
        /* Tab 1: Events List */
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ছবি</th>
                <th className="py-3.5 px-4">উৎসবের নাম</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">তারিখ ও সময়</th>
                <th className="py-3.5 px-4">স্থান ও পূজারী</th>
                <th className="py-3.5 px-4">RSVP সংখ্যা</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    কোনো উৎসব ক্যালেন্ডার পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                events.map((ev) => (
                  <tr key={ev._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={ev.image || '/assets/img/banner/s1.webp'}
                        alt={ev.title}
                        className="w-12 h-12 object-cover border border-gray-200"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-xs truncate">
                      {ev.title}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{ev.category}</td>
                    <td className="py-3 px-4">
                      <strong className="text-gray-800 block">
                        {new Date(ev.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </strong>
                      <span className="text-[11px] text-gray-400">{ev.time}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="block">{ev.location}</span>
                      <span className="text-[11px] text-gray-400">{ev.priest}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-orange-50 text-temple-accent font-bold px-2.5 py-1 rounded-xs">
                        {ev.rsvpCount || ev.rsvps?.length || 0} জন
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(ev)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(ev._id, ev.title)}
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
        /* Tab 2: RSVPs List */
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ভক্তের নাম</th>
                <th className="py-3.5 px-4">উৎসবের নাম</th>
                <th className="py-3.5 px-4">যোগাযোগ</th>
                <th className="py-3.5 px-4">উপস্থিতি সংখ্যা</th>
                <th className="py-3.5 px-4">তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allRsvps.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">
                    কোনো ভক্তের RSVP রেকর্ড পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                allRsvps.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-800">{r.name}</td>
                    <td className="py-3 px-4 text-temple-accent font-semibold">{r.eventTitle}</td>
                    <td className="py-3 px-4">
                      <span className="block font-semibold">{r.phone || 'N/A'}</span>
                      <span className="text-[11px] text-gray-400">{r.email || ''}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      {r.attendees || 1} জন সদস্য
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-[11px]">
                      {r.date ? new Date(r.date).toLocaleDateString() : '২০২৬'}
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
              {editingId ? 'উৎসব সময়সূচী সম্পাদনা' : 'নতুন মহোৎসব যুক্ত করুন'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">উৎসবের নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    {EVENT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">তারিখ (ISO বা YYYY-MM-DD) *</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">সময়কাল *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="সকাল ১০:০০ – দুপুর ০১:০০"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">পূজারী / পরিচালক</label>
                  <input
                    type="text"
                    value={formData.priest}
                    onChange={(e) => setFormData({ ...formData, priest: e.target.value })}
                    placeholder="পণ্ডিত রাকেশ কুমার পাণ্ডে"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">স্থান *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="মূল গর্ভগৃহ ও মন্দির প্রাঙ্গণ"
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
                  placeholder="/assets/img/banner/s1.webp"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">উৎসবের বিশেষ মাহাত্ম্য ও বিবরণ</label>
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
