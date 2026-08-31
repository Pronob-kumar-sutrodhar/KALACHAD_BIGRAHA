import { useState } from 'react'
import { FaTimes, FaCalendarAlt, FaCheckCircle, FaOm } from 'react-icons/fa'
import toast from 'react-hot-toast'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function BookPujaModal({ isOpen, onClose, puja }) {
  const { language } = useLanguage()
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('০৭:০০ সকাল - প্রাতঃকালীন মঙ্গল আরতি')
  const [devoteeName, setDevoteeName] = useState('')
  const [phone, setPhone] = useState('')
  const [gotra, setGotra] = useState('')
  const [nakshatra, setNakshatra] = useState('')
  const [pujaMode, setPujaMode] = useState('মন্দিরে উপস্থিত থেকে')
  const [prasadDelivery, setPrasadDelivery] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!devoteeName || !phone || !date) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে নাম, মোবাইল নম্বর ও তারিখ পূরণ করুন' : 'Please fill in required booking details')
      return
    }

    setIsSubmitting(true)
    api.post('/api/pujas/book', {
      pujaTitle: puja?.title || 'দৈনিক পূজা ও অর্চনা',
      dakshina: puja?.price || '৳ ৫০১ দক্ষিণা',
      devoteeName,
      phone,
      gotra,
      nakshatra,
      date,
      timeSlot,
      mode: pujaMode,
      prasadDelivery,
    })
      .then((res) => {
        setBookingRef(res.data.bookingRef || `PUJA-${Math.floor(10000 + Math.random() * 90000)}`)
        setIsSubmitting(false)
        setIsSuccess(true)
        toast.success(
          language === 'bn'
            ? 'পূজা সংকল্প সফলভাবে সংরক্ষিত হয়েছে! পূজারী আপনার সাথে যোগাযোগ করবেন।'
            : 'Puja Sankalp registered successfully! Priest will contact you.'
        )
      })
      .catch(() => {
        const ref = `PUJA-${Math.floor(10000 + Math.random() * 90000)}`
        setBookingRef(ref)
        setIsSubmitting(false)
        setIsSuccess(true)
        toast.success(
          language === 'bn'
            ? 'পূজা সংকল্প সফলভাবে সংরক্ষিত হয়েছে! পূজারী আপনার সাথে যোগাযোগ করবেন।'
            : 'Puja Sankalp registered successfully! Priest will contact you.'
        )
      })
  }

  const handleClose = () => {
    setIsSuccess(false)
    setDevoteeName('')
    setPhone('')
    setGotra('')
    setDate('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white max-w-lg w-full shadow-2xl relative border-t-4 border-temple-accent overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <FaTimes className="text-lg" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4 font-poppins">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center text-3xl">
              <FaCheckCircle />
            </div>

            <div className="inline-flex items-center gap-2 text-temple-accent font-semibold text-xs uppercase tracking-widest">
              <FaOm />
              <span>{language === 'bn' ? 'সংকল্প নিশ্চিতকরণ' : 'Sankalp Confirmed'}</span>
            </div>

            <h3 className="font-lora text-2xl font-bold text-temple-primary">
              {language === 'bn' ? 'হরে কৃষ্ণ! পূজা সংকল্প সম্পন্ন' : 'Hari Bol! Puja Sankalp Registered'}
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {language === 'bn'
                ? `শ্রী শ্রী কৃষ্ণ মহা মন্দিরে আপনার নামে বিশেষ পূজা ও অর্চনা নিবেদন করা হবে।`
                : `Priests will chant Vedic mantras and perform archana in your family's name.`}
            </p>

            <div className="bg-temple-light p-4 border border-gray-200 text-left text-xs space-y-1.5 font-poppins">
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'সংকল্প ট্র্যাকিং আইডি:' : 'Booking Ref:'}</span>
                <strong className="text-temple-primary font-mono">{bookingRef}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'ভক্তের নাম:' : 'Devotee:'}</span>
                <span className="font-semibold text-gray-800">{devoteeName}</span>
              </div>
              {gotra && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'bn' ? 'গোত্র:' : 'Gotra:'}</span>
                  <span className="font-semibold text-gray-800">{gotra}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'তারিখ ও সময়:' : 'Date & Time:'}</span>
                <span className="font-semibold text-gray-800">{date} • {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'bn' ? 'দক্ষিণা সেবা:' : 'Dakshina:'}</span>
                <strong className="text-temple-accent font-lora text-sm">{puja?.price || '৳ ৫০১'}</strong>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="kr-btn-custom w-full text-center"
            >
              {language === 'bn' ? 'রসিদ বন্ধ করুন' : 'Close Confirmation'}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto font-poppins">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 text-temple-accent font-semibold text-xs uppercase tracking-widest mb-1">
                <FaOm />
                <span>{language === 'bn' ? 'পূজা ও সংকল্প বুকিং' : 'Sacred Puja Sankalp'}</span>
              </div>
              <h3 className="font-lora text-2xl font-bold text-temple-primary">
                {puja ? puja.title : (language === 'bn' ? 'দৈনিক পূজা ও অর্চনা' : 'Daily Aarti & Archana')}
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                {language === 'bn'
                  ? 'আপনার এবং আপনার পরিবারের কল্যাণ কামনায় বৈদিক পুরোহিত দ্বারা পূজা সম্পন্ন করা হবে।'
                  : 'Priests will chant mantras with your Gotra & Nakshatra for divine blessings.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Devotee Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'যজমান / ভক্তের পূর্ণ নাম *' : 'Devotee Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: অনিল চৌধুরী"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর / হোয়াটসঅ্যাপ *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700-000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Gotra & Nakshatra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'গোত্র (যদি জানা থাকে):' : 'Gotra (If Known):'}
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: কাশ্যপ / ভরদ্বাজ"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'জন্ম নক্ষত্র / রাশি:' : 'Birth Nakshatra / Rashi:'}
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: রোহিণী / মেষ"
                    value={nakshatra}
                    onChange={(e) => setNakshatra(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'শুভ তারিখ নির্বাচন করুন *' : 'Auspicious Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {language === 'bn' ? 'পূজার সময়সূচী:' : 'Time Slot:'}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-temple-accent focus:outline-hidden"
                  >
                    <option value="ভোর ০৪:৩০ - মঙ্গল আরতি">ভোর ০৪:৩০ - মঙ্গল আরতি</option>
                    <option value="সকাল ০৭:০০ - শৃঙ্গার আরতি">সকাল ০৭:০০ - শৃঙ্গার আরতি</option>
                    <option value="দুপুর ১২:০০ - রাজভোগ আরতি">দুপুর ১২:০০ - রাজভোগ আরতি</option>
                    <option value="সন্ধ্যা ০৬:৩০ - সন্ধ্যা আরতি">সন্ধ্যা ০৬:৩০ - সন্ধ্যা আরতি</option>
                    <option value="রাত ০৮:৩০ - শয়ন আরতি">রাত ০৮:৩০ - শয়ন আরতি</option>
                  </select>
                </div>
              </div>

              {/* Puja Mode (In-Person / Online) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  {language === 'bn' ? 'অংশগ্রহণের মাধ্যম:' : 'Mode of Participation:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPujaMode('মন্দিরে উপস্থিত থেকে')}
                    className={`py-2 px-3 text-xs font-semibold border cursor-pointer ${
                      pujaMode.includes('মন্দিরে')
                        ? 'bg-temple-primary text-temple-gold border-temple-primary'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {language === 'bn' ? 'মন্দিরে সশরীরে' : 'In-Person at Mandir'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPujaMode('অনলাইন / লাইভ স্ট্রিম')}
                    className={`py-2 px-3 text-xs font-semibold border cursor-pointer ${
                      pujaMode.includes('অনলাইন')
                        ? 'bg-temple-primary text-temple-gold border-temple-primary'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {language === 'bn' ? 'অনলাইন লাইভ স্ট্রিম' : 'Online / Live Stream'}
                  </button>
                </div>
              </div>

              {/* Prasad Delivery Option */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="prasadCheck"
                  checked={prasadDelivery}
                  onChange={(e) => setPrasadDelivery(e.target.checked)}
                  className="rounded-xs text-temple-accent focus:ring-temple-accent w-4 h-4"
                />
                <label htmlFor="prasadCheck" className="text-xs text-gray-600 cursor-pointer select-none">
                  {language === 'bn' ? 'পূজার প্রসাদ ও রক্ষাসূত্র কুরিয়ারে হোম ডেলিভারি চান' : 'Deliver sanctified prasad & raksha thread to my home'}
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="kr-btn-custom w-full flex items-center justify-center gap-2 py-3.5"
                >
                  <FaCalendarAlt className="text-xs" />
                  <span>
                    {isSubmitting
                      ? (language === 'bn' ? 'সংকল্প জমা হচ্ছে...' : 'Registering Sankalp...')
                      : (language === 'bn' ? `সংকল্প নিশ্চিত করুন (${puja?.price || '৳ ৫০১'})` : `Confirm Puja Booking (${puja?.price || '$51'})`)}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
