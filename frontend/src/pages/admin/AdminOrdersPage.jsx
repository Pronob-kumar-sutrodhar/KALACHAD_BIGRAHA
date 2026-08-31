import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  FaShoppingCart, FaCheckCircle, FaTruck, FaTrash,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock
} from 'react-icons/fa'

export default function AdminOrdersPage() {
  const { language, formatMoney } = useLanguage()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/orders')
      setOrders(Array.isArray(res.data) ? res.data : [])
    } catch {
      toast.error('Failed to load store orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleMarkPaid = async (id) => {
    try {
      await api.put(`/api/orders/${id}/pay`, { status: 'PAID' })
      toast.success('Order marked as PAID')
      setOrders(orders.map((o) => (o._id === id ? { ...o, isPaid: true, paidAt: new Date() } : o)))
    } catch {
      toast.error('Failed to update payment status')
    }
  }

  const handleMarkDelivered = async (id) => {
    try {
      await api.put(`/api/orders/${id}/deliver`)
      toast.success('Order marked as DELIVERED')
      setOrders(orders.map((o) => (o._id === id ? { ...o, isDelivered: true, deliveredAt: new Date() } : o)))
    } catch {
      toast.error('Failed to update delivery status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return
    try {
      await api.delete(`/api/orders/${id}`)
      toast.success('Order deleted')
      setOrders(orders.filter((o) => o._id !== id))
    } catch {
      toast.error('Failed to delete order')
    }
  }

  const filtered = orders.filter((o) => {
    if (filter === 'paid') return o.isPaid
    if (filter === 'pending') return !o.isPaid
    if (filter === 'delivered') return o.isDelivered
    return true
  })

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Header */}
      <div className="bg-white p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[2px] font-semibold text-temple-accent block mb-1">
            {language === 'bn' ? 'মন্দির ভাণ্ডার বিক্রয় ও শিপিং' : 'Sales & Deliveries'}
          </span>
          <h2 className="font-lora text-2xl font-bold text-temple-primary">
            {language === 'bn' ? 'অর্ডার ও শিপমেন্ট পরিচালনা' : 'Manage Store Orders'}
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'paid', 'pending', 'delivered'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer transition-colors ${
                filter === f
                  ? 'bg-temple-accent text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f === 'all'
                ? 'সকল'
                : f === 'paid'
                ? 'পরিশোধিত'
                : f === 'pending'
                ? 'অপেক্ষমাণ'
                : 'ডেলিভার্ড'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white p-8 text-center text-gray-400 border border-gray-200">
              কোনো অর্ডার পাওয়া যায়নি
            </div>
          ) : (
            filtered.map((ord) => (
              <div
                key={ord._id}
                className="bg-white border border-gray-200 shadow-xs p-5 space-y-4 hover:border-temple-accent transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[11px] text-gray-400 font-mono">অর্ডার আইডি:</span>
                    <strong className="text-sm font-mono text-temple-primary ml-1.5 font-bold">
                      {ord._id}
                    </strong>
                    <span className="text-gray-400 text-xs ml-3">&bull;</span>
                    <span className="text-xs text-gray-500 ml-3">
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : '২০২৬'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-xs ${
                      ord.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {ord.isPaid ? 'PAID (পরিশোধিত)' : 'PENDING PAYMENT'}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-xs ${
                      ord.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {ord.isDelivered ? 'DELIVERED (ডেলিভার্ড)' : 'SHIPPING PENDING'}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Items list */}
                  <div className="space-y-2 md:col-span-1 border-r border-gray-100 pr-4">
                    <span className="font-bold text-gray-700 block mb-1">অর্ডারকৃত সামগ্রী:</span>
                    {(ord.orderItems || []).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-gray-600">
                        <span className="truncate max-w-[180px]">{item.qty}x {item.name}</span>
                        <span className="font-semibold text-temple-accent">{formatMoney(item.price * (item.qty || 1))}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-sm text-temple-primary">
                      <span>মোট পরিশোধ:</span>
                      <span className="font-lora text-temple-accent font-bold">{formatMoney(ord.totalPrice)}</span>
                    </div>
                  </div>

                  {/* Customer info */}
                  <div className="space-y-1 md:col-span-1 border-r border-gray-100 pr-4">
                    <span className="font-bold text-gray-700 block mb-1">ডেলিভারি ঠিকানা:</span>
                    <p className="text-gray-800 font-semibold">{ord.shippingAddress?.fullName || ord.user?.name || 'Devotee Customer'}</p>
                    <p className="text-gray-600 flex items-center gap-1.5"><FaMapMarkerAlt className="text-temple-accent text-[10px]" /> {ord.shippingAddress?.address}, {ord.shippingAddress?.city}</p>
                    <p className="text-gray-600 flex items-center gap-1.5"><FaPhoneAlt className="text-temple-accent text-[10px]" /> {ord.shippingAddress?.phone || 'N/A'}</p>
                    <p className="text-gray-600 flex items-center gap-1.5"><FaEnvelope className="text-temple-accent text-[10px]" /> {ord.shippingAddress?.email || ord.user?.email || 'N/A'}</p>
                  </div>

                  {/* Actions column */}
                  <div className="flex flex-col justify-between gap-2 md:col-span-1">
                    <div>
                      <span className="font-bold text-gray-700 block mb-1">পেমেন্ট মেথড:</span>
                      <p className="text-gray-600">{ord.paymentMethod || 'Stripe Online'}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {!ord.isPaid && (
                        <button
                          onClick={() => handleMarkPaid(ord._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                        >
                          পরিশোধ নিশ্চিত করুন
                        </button>
                      )}
                      {!ord.isDelivered && (
                        <button
                          onClick={() => handleMarkDelivered(ord._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                        >
                          ডেলিভারি চিহ্নিত করুন
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(ord._id)}
                        className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
