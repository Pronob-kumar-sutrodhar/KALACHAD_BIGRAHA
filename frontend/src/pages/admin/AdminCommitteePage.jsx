import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaUsers, FaPhoneAlt,
  FaEnvelope, FaMapMarkerAlt, FaTimes, FaCheck,
  FaSearch, FaOm, FaArrowUp, FaArrowDown, FaUserTie
} from 'react-icons/fa'

const DESIGNATION_PRESETS = [
  { bn: 'সভাপতি', en: 'President' },
  { bn: 'সাধারণ সম্পাদক', en: 'General Secretary' },
  { bn: 'সহ-সভাপতি', en: 'Vice President' },
  { bn: 'যুগ্ম সাধারণ সম্পাদক', en: 'Joint General Secretary' },
  { bn: 'কোষাধ্যক্ষ', en: 'Treasurer' },
  { bn: 'সাংগঠনিক সম্পাদক', en: 'Organizing Secretary' },
  { bn: 'প্রধান উপদেষ্টা ও আচার্য', en: 'Chief Spiritual Advisor & Acharya' },
  { bn: 'মহিলা ও সমাজকল্যাণ সম্পাদিকা', en: 'Women & Welfare Secretary' },
  { bn: 'প্রচার ও প্রকাশনা সম্পাদক', en: 'Publicity & Media Secretary' },
  { bn: 'কার্যনির্বাহী সদস্য', en: 'Executive Member' },
]

const SAMPLE_AVATARS = [
  '/assets/img/volunteers/1.webp',
  '/assets/img/volunteers/2.webp',
  '/assets/img/volunteers/3.webp',
  '/assets/img/volunteers/4.webp',
  '/assets/img/volunteers/5.webp',
  '/assets/img/volunteers/6.webp',
  '/assets/img/people/1.webp',
  '/assets/img/people/2.webp',
]

export default function AdminCommitteePage() {
  const { language } = useLanguage()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    nameBn: '',
    nameEn: '',
    designationBn: 'কার্যনির্বাহী সদস্য',
    designationEn: 'Executive Member',
    photo: '/assets/img/volunteers/1.webp',
    phone: '',
    email: '',
    addressBn: '',
    addressEn: '',
    bioBn: '',
    bioEn: '',
    order: 1,
    isActive: true,
  })

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/committee?all=true')
      const items = res.data?.members || []
      setMembers(Array.isArray(items) ? items : [])
    } catch {
      toast.error('Failed to load committee members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      nameBn: '',
      nameEn: '',
      designationBn: 'কার্যনির্বাহী সদস্য',
      designationEn: 'Executive Member',
      photo: `/assets/img/volunteers/${(members.length % 6) + 1}.webp`,
      phone: '',
      email: '',
      addressBn: '',
      addressEn: '',
      bioBn: '',
      bioEn: '',
      order: members.length + 1,
      isActive: true,
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (member) => {
    setEditingId(member._id)
    setFormData({
      nameBn: member.nameBn || '',
      nameEn: member.nameEn || '',
      designationBn: member.designationBn || '',
      designationEn: member.designationEn || '',
      photo: member.photo || '/assets/img/volunteers/1.webp',
      phone: member.phone || '',
      email: member.email || '',
      addressBn: member.addressBn || '',
      addressEn: member.addressEn || '',
      bioBn: member.bioBn || '',
      bioEn: member.bioEn || '',
      order: member.order || 1,
      isActive: member.isActive !== false,
    })
    setModalOpen(true)
  }

  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      designationBn: preset.bn,
      designationEn: preset.en,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nameBn.trim() || !formData.nameEn.trim()) {
      toast.error(language === 'bn' ? 'বাংলা ও ইংরেজি উভয় নাম আবশ্যক' : 'Both Bengali and English names are required')
      return
    }

    if (!formData.designationBn.trim() || !formData.designationEn.trim()) {
      toast.error(language === 'bn' ? 'পদবী আবশ্যক' : 'Designation is required')
      return
    }

    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/api/committee/${editingId}`, formData)
        toast.success(language === 'bn' ? 'সদস্য তথ্য সফলভাবে আপডেট হয়েছে' : 'Member updated successfully')
      } else {
        await api.post('/api/committee', formData)
        toast.success(language === 'bn' ? 'নতুন কমিটি সদস্য যুক্ত হয়েছে' : 'New committee member added')
      }
      setModalOpen(false)
      fetchMembers()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/committee/${id}`)
      toast.success(language === 'bn' ? 'সদস্য তালিকা থেকে মুছে ফেলা হয়েছে' : 'Member removed')
      setDeleteConfirmId(null)
      fetchMembers()
    } catch {
      toast.error('Failed to delete member')
    }
  }

  const handleToggleActive = async (member) => {
    try {
      await api.put(`/api/committee/${member._id}`, {
        isActive: !member.isActive,
      })
      toast.success(
        !member.isActive
          ? (language === 'bn' ? 'সদস্য সক্রিয় করা হয়েছে' : 'Member activated')
          : (language === 'bn' ? 'সদস্য নিষ্ক্রিয় করা হয়েছে' : 'Member deactivated')
      )
      fetchMembers()
    } catch {
      toast.error('Failed to toggle status')
    }
  }

  // Filtered members
  const filteredMembers = members.filter((m) => {
    const query = searchQuery.toLowerCase()
    return (
      (m.nameBn && m.nameBn.toLowerCase().includes(query)) ||
      (m.nameEn && m.nameEn.toLowerCase().includes(query)) ||
      (m.designationBn && m.designationBn.toLowerCase().includes(query)) ||
      (m.designationEn && m.designationEn.toLowerCase().includes(query)) ||
      (m.phone && m.phone.toLowerCase().includes(query)) ||
      (m.email && m.email.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6 select-none font-poppins">
      {/* ── Page Header ── */}
      <div className="bg-white p-6 border-t-4 border-temple-accent shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-temple-accent">
            <FaUsers />
            <span>
              {language === 'bn' ? 'কমিটি ব্যবস্থাপনা' : 'EXECUTIVE COMMITTEE CMS'}
            </span>
          </div>
          <h1 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn'
              ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ মন্দির পরিচালনা কমিটি'
              : 'Mandir Executive Committee Management'}
          </h1>
          <p className="text-xs text-gray-500">
            {language === 'bn'
              ? 'কমিটির সভাপতি, সাধারণ সম্পাদক, কোষাধ্যক্ষসহ সকল সদস্যের পদবী, ছবি ও যোগাযোগ তথ্য পরিচালনা করুন।'
              : 'Add, update, or reorder committee members, positions, photos, and contact information.'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-temple-accent hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2.5 flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <FaPlus />
          <span>{language === 'bn' ? 'নতুন সদস্য যুক্ত করুন' : 'Add New Member'}</span>
        </button>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'নাম, পদবী বা ফোন নম্বর দিয়ে খুঁজুন...' : 'Search by name, position or phone...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 focus:border-temple-accent outline-none"
          />
        </div>

        <div className="text-xs text-gray-500 font-semibold">
          {language === 'bn' ? 'মোট সদস্য:' : 'Total Members:'}{' '}
          <span className="text-temple-accent font-bold font-mono">{members.length}</span>
        </div>
      </div>

      {/* ── Members Table / Grid ── */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white p-12 text-center text-gray-400 border border-gray-200">
          <FaUsers className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-sm">
            {language === 'bn' ? 'কোনো কমিটি সদস্য পাওয়া যায়নি' : 'No committee members found.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-700 font-bold border-b border-gray-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 text-center">ক্রম (Order)</th>
                <th className="py-3 px-4">ছবি (Photo)</th>
                <th className="py-3 px-4">নাম (Name)</th>
                <th className="py-3 px-4">পদবী (Position)</th>
                <th className="py-3 px-4">যোগাযোগ (Contact)</th>
                <th className="py-3 px-4 text-center">স্ট্যাটাস (Status)</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr
                  key={member._id}
                  className="hover:bg-orange-50/50 transition-colors"
                >
                  {/* Order */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-temple-primary text-temple-gold text-[10px] font-bold leading-6 text-center font-mono">
                      {member.order || 0}
                    </span>
                  </td>

                  {/* Photo */}
                  <td className="py-3 px-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-temple-gold/40 shadow-xs bg-slate-100">
                      <img
                        src={member.photo || '/assets/img/people/1.webp'}
                        alt={member.nameEn}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/assets/img/people/1.webp'
                        }}
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-temple-primary text-sm">
                      {member.nameBn}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {member.nameEn}
                    </div>
                  </td>

                  {/* Designation */}
                  <td className="py-3 px-4">
                    <span className="inline-block bg-orange-100 text-temple-accent font-bold px-2.5 py-0.5 rounded-xs text-[11px] border border-temple-accent/20">
                      {member.designationBn}
                    </span>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {member.designationEn}
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-4 space-y-1">
                    {member.phone && (
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <FaPhoneAlt className="text-[10px] text-temple-accent" />
                        <span className="font-mono">{member.phone}</span>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                        <FaEnvelope className="text-[10px] text-temple-accent" />
                        <span className="truncate max-w-[150px]">{member.email}</span>
                      </div>
                    )}
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(member)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                        member.isActive !== false
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {member.isActive !== false ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Inactive)'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Edit Member"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(member._id)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xs transition-colors cursor-pointer"
                        title="Delete Member"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal Drawer ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-t-4 border-temple-accent space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-temple-primary font-lora font-bold text-lg">
                <FaUserTie className="text-temple-accent" />
                <span>
                  {editingId
                    ? (language === 'bn' ? 'কমিটি সদস্য তথ্য পরিবর্তন' : 'Edit Committee Member')
                    : (language === 'bn' ? 'নতুন কমিটি সদস্য যুক্ত করুন' : 'Add New Committee Member')}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    নাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: শ্রী সুব্রত কুমার সূত্রধর"
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Subrata Kumar Sutradhar"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>
              </div>

              {/* Designation Quick Presets */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  দ্রুত পদবী নির্বাচন করুন (Click to apply preset):
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-gray-50 border border-gray-200">
                  {DESIGNATION_PRESETS.map((p) => (
                    <button
                      key={p.bn}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className={`text-[10px] px-2 py-1 border transition-all cursor-pointer ${
                        formData.designationBn === p.bn
                          ? 'bg-temple-accent text-white border-temple-accent font-bold'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-temple-accent'
                      }`}
                    >
                      {p.bn} ({p.en})
                    </button>
                  ))}
                </div>
              </div>

              {/* Designation Custom Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    পদবী (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সভাপতি / সাধারণ সম্পাদক"
                    value={formData.designationBn}
                    onChange={(e) => setFormData({ ...formData, designationBn: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Designation (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. President / General Secretary"
                    value={formData.designationEn}
                    onChange={(e) => setFormData({ ...formData, designationEn: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>
              </div>

              {/* Photo & Quick Sample Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">
                  ছবির লিংক / Photo URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="/assets/img/volunteers/1.webp"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="flex-1 p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shrink-0 bg-slate-100">
                    <img
                      src={formData.photo || '/assets/img/people/1.webp'}
                      alt="Preview"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/assets/img/people/1.webp'
                      }}
                    />
                  </div>
                </div>

                {/* Sample Avatar Shortcuts */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">নমুনা ছবি:</span>
                  <div className="flex gap-1.5">
                    {SAMPLE_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, photo: av })}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          formData.photo === av
                            ? 'border-temple-accent scale-110 shadow-xs'
                            : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={av} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    মোবাইল নম্বর / Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+৮৮০ ১৭০০-০০০০০০"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ইমেইল ঠিকানা / Email
                  </label>
                  <input
                    type="email"
                    placeholder="member@kalachadtemple.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ঠিকানা / এলাকা (বাংলা)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: কালীতলা রোড, কেন্দ্রীয় পাড়া"
                    value={formData.addressBn}
                    onChange={(e) => setFormData({ ...formData, addressBn: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Address / Area (English)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kalitala Road, Central Area"
                    value={formData.addressEn}
                    onChange={(e) => setFormData({ ...formData, addressEn: e.target.value })}
                    className="w-full p-2.5 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>
              </div>

              {/* Bio Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    সংক্ষিপ্ত পরিচিতি / দায়িত্ব (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="কমিটিতে অবদান ও দায়িত্ব..."
                    value={formData.bioBn}
                    onChange={(e) => setFormData({ ...formData, bioBn: e.target.value })}
                    className="w-full p-2 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Brief Bio / Responsibility (English)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contributions & role in the mandir..."
                    value={formData.bioEn}
                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                    className="w-full p-2 text-xs border border-gray-300 focus:border-temple-accent outline-none"
                  />
                </div>
              </div>

              {/* Order & Active Checkbox */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-gray-700">
                    তালিকার ক্রম (Priority Order):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-16 p-1.5 text-xs border border-gray-300 text-center font-bold"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-temple-accent accent-orange-600"
                  />
                  <span>সক্রিয় সদস্য (Active on Website)</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-temple-accent hover:bg-orange-700 text-white font-semibold text-xs shadow-md transition-colors cursor-pointer disabled:opacity-50"
                >
                  {saving
                    ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...')
                    : (language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Dialog ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-sm w-full p-6 text-center shadow-2xl border-t-4 border-red-600 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mx-auto">
              <FaTrash />
            </div>
            <h3 className="font-lora text-lg font-bold text-gray-900">
              {language === 'bn' ? 'আপনি কি নিশ্চিত?' : 'Delete Committee Member?'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'bn'
                ? 'এই সদস্যের তথ্য স্থায়ীভাবে ডাটাবেস থেকে মুছে ফেলা হবে।'
                : 'This committee member will be permanently deleted from the database.'}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
              >
                {language === 'bn' ? 'না' : 'No'}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                {language === 'bn' ? 'হ্যাঁ, মুছুন' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
