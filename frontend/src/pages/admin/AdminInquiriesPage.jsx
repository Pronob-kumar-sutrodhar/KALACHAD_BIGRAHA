import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaEnvelope, FaTrash, FaPhoneAlt, FaCalendarAlt, FaUserAlt
} from 'react-icons/fa'

export default function AdminInquiriesPage() {
  const { language } = useLanguage()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/contact')
      setInquiries(Array.isArray(res.data) ? res.data : [])
    } catch {
      toast.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await api.delete(`/api/contact/${id}`)
      toast.success('Message deleted')
      setInquiries(inquiries.filter((i) => i._id !== id))
    } catch {
      toast.error('Failed to delete inquiry')
    }
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'ভক্তদের যোগাযোগ ও বিশেষ প্রার্থনা' : 'Devotee Prayers & Hotline'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'বার্তা ও প্রার্থনা অনুরোধ পরিচালনা' : 'Manage Devotee Inquiries & Prayers'}
          </h2>
        </div>

        <span className="bg-temple-light text-temple-primary px-3 py-1.5 text-xs font-semibold rounded-xs border border-gray-200">
          মোট বার্তা: {inquiries.length} টি
        </span>
      </div>

      {/* Inquiries Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inquiries.length === 0 ? (
            <div className="md:col-span-2 bg-white p-8 text-center text-gray-400 border border-gray-200">
              কোনো বার্তা বা প্রার্থনা অনুরোধ জমা পড়েনি
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq._id}
                className="bg-white border border-gray-200 shadow-xs p-5 space-y-3 flex flex-col justify-between hover:border-temple-accent transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2.5">
                    <div>
                      <strong className="font-lora text-base font-bold text-temple-primary block">
                        {inq.name}
                      </strong>
                      <span className="text-xs text-temple-accent font-semibold">
                        {inq.subject || 'সাধারণ জিজ্ঞাসা'}
                      </span>
                    </div>

                    <span className="text-[11px] text-gray-400 whitespace-nowrap flex items-center gap-1">
                      <FaCalendarAlt className="text-[9px]" />
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : '২০২৬'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed py-2 whitespace-pre-line">
                    "{inq.message}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="space-y-0.5">
                    <span className="block">{inq.email}</span>
                    {inq.phone && <span className="block text-gray-700 font-semibold">{inq.phone}</span>}
                  </div>

                  <button
                    onClick={() => handleDelete(inq._id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer"
                    title="Delete Message"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
