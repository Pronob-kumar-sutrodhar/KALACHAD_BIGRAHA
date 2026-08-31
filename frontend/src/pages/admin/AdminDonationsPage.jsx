import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaHeart, FaUsers,
  FaFileInvoiceDollar, FaTimes, FaCheckCircle
} from 'react-icons/fa'

const DONATION_CATEGORIES = [
  'Annadaan Seva',
  'Temple Construction',
  'Gaushala Seva',
  'Vedic Education',
  'Grand Festivals',
  'Sadhu Seva',
]

export default function AdminDonationsPage() {
  const { language, formatMoney } = useLanguage()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Annadaan Seva',
    goal: '100000',
    raised: '0',
    image: '/assets/img/donations/1.webp',
    description: '',
  })

  // Donors inspection modal
  const [donorModalOpen, setDonorModalOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)

  const fetchDonations = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/donations')
      const items = res.data.donations || res.data || []
      setDonations(Array.isArray(items) ? items : [])
    } catch {
      toast.error('Failed to load donation campaigns')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      title: '',
      category: 'Annadaan Seva',
      goal: '100000',
      raised: '0',
      image: '/assets/img/donations/1.webp',
      description: '',
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (d) => {
    setEditingId(d._id)
    setFormData({
      title: d.title || '',
      category: d.category || 'Annadaan Seva',
      goal: d.goal || '100000',
      raised: d.raised || '0',
      image: d.image || '/assets/img/donations/1.webp',
      description: d.description || '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.goal) {
      toast.error('Campaign title and goal amount are required')
      return
    }

    const payload = {
      ...formData,
      goal: Number(formData.goal),
      raised: Number(formData.raised) || 0,
    }

    try {
      if (editingId) {
        await api.put(`/api/donations/${editingId}`, payload)
        toast.success('Campaign updated successfully!')
      } else {
        await api.post('/api/donations', payload)
        toast.success('New seva campaign launched!')
      }
      setModalOpen(false)
      fetchDonations()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving campaign')
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete campaign "${title}"?`)) return
    try {
      await api.delete(`/api/donations/${id}`)
      toast.success('Campaign removed')
      setDonations(donations.filter((d) => d._id !== id))
    } catch {
      toast.error('Failed to delete campaign')
    }
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'শ্রী শ্রী কৃষ্ণ সেবা প্রকল্পসমূহ' : 'Seva Funds & Campaigns'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'মন্দির অনুদান ও অন্নদান তহবিল' : 'Manage Donation Campaigns'}
          </h2>
        </div>

        <button
          onClick={handleOpenAdd}
          className="kr-btn-custom flex items-center gap-2 py-2.5 px-4 text-xs cursor-pointer"
        >
          <FaPlus />
          <span>{language === 'bn' ? 'নতুন সেবা প্রকল্প যোগ করুন' : 'Launch New Campaign'}</span>
        </button>
      </div>

      {/* Campaigns Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-gray-200">
            <thead className="bg-temple-light font-lora text-temple-primary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ছবি</th>
                <th className="py-3.5 px-4">সেবা তহবিলের নাম</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">সংগৃহীত / লক্ষ্যমাত্রা (BDT)</th>
                <th className="py-3.5 px-4">অগ্রগতি</th>
                <th className="py-3.5 px-4">দাতা</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    {language === 'bn' ? 'কোনো অনুদান ক্যাম্পেইন পাওয়া যায়নি' : 'No donation campaigns found'}
                  </td>
                </tr>
              ) : (
                donations.map((d) => {
                  const pct = Math.min(100, Math.round(((d.raised || 0) / (d.goal || 1)) * 100))
                  return (
                    <tr key={d._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <img
                          src={d.image || '/assets/img/donations/1.webp'}
                          alt={d.title}
                          className="w-12 h-12 object-cover border border-gray-200"
                        />
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800 max-w-xs truncate">
                        {d.title}
                      </td>
                      <td className="py-3 px-4 text-gray-500">{d.category}</td>
                      <td className="py-3 px-4">
                        <span className="font-lora font-bold text-temple-accent block">
                          {formatMoney(d.raised || 0)}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          লক্ষ্য: {formatMoney(d.goal || 0)}
                        </span>
                      </td>
                      <td className="py-3 px-4 w-32">
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                          <div className="bg-temple-accent h-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono font-bold">{pct}% সংগৃহীত</span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedDonation(d)
                            setDonorModalOpen(true)
                          }}
                          className="flex items-center gap-1.5 bg-temple-light hover:bg-orange-100 text-temple-accent px-2.5 py-1 rounded-xs font-semibold cursor-pointer"
                        >
                          <FaUsers className="text-xs" />
                          <span>{d.donorsCount || d.donors?.length || 0} জন দাতা</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(d)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(d._id, d.title)}
                          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                })
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
              {editingId ? 'সেবা প্রকল্প সম্পাদনা' : 'নতুন সেবা তহবিল যুক্ত করুন'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">ক্যাম্পেইনের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: ১০০০ ভক্তের নিত্য অন্নদান সেবা তহবিল"
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
                  {DONATION_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">লক্ষ্যমাত্রা (BDT ৳) *</label>
                  <input
                    type="number"
                    min="1000"
                    required
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent font-bold text-temple-accent"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">সংগৃহীত পরিমাণ (BDT ৳)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.raised}
                    onChange={(e) => setFormData({ ...formData, raised: e.target.value })}
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
                  placeholder="/assets/img/donations/1.webp"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-hidden focus:border-temple-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">সেবা মাহাত্ম্য ও বিবরণ</label>
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

      {/* ── Donors Inspection Modal ── */}
      {donorModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white max-w-2xl w-full p-6 shadow-2xl border-t-4 border-temple-gold relative max-h-[85vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setDonorModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>

            <div>
              <span className="text-xs text-temple-accent font-semibold uppercase tracking-wider block">
                {selectedDonation.category}
              </span>
              <h3 className="font-lora text-xl font-bold text-temple-primary">
                {selectedDonation.title} — দাতা ও অনুদান তালিকা
              </h3>
            </div>

            <div className="divide-y divide-gray-100 border border-gray-200 text-xs">
              {(!selectedDonation.donors || selectedDonation.donors.length === 0) ? (
                <div className="p-6 text-center text-gray-400">
                  এখনও এই তহবিলে কোনো অনলাইন অনুদান রেকর্ড জমা পড়েনি।
                </div>
              ) : (
                selectedDonation.donors.map((donor, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <strong className="font-bold text-gray-800 block text-sm">{donor.name}</strong>
                      <span className="text-gray-400 text-[11px]">
                        গোত্র: {donor.gotra || 'সাধারণ'} &bull; রসিদ: {donor.receiptId || 'KMT-DIRECT'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-lora font-bold text-temple-accent text-sm block">
                        {formatMoney(donor.amount)}
                      </span>
                      <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5">
                        80G ছাড়প্রাপ্ত
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
