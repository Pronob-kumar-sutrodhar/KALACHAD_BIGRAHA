import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaArrowRight, FaClock } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

export default function EventCard({ event, onRegister }) {
  const { language } = useLanguage()
  const date = event.date ? new Date(event.date) : new Date('2026-08-26')
  const day = date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { day: '2-digit' })
  const month = date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { month: 'short' }).toUpperCase()

  return (
    <div className="group bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden font-poppins">
      {/* Image */}
      <div className="relative overflow-hidden h-56 bg-temple-primary">
        <Link to={`/events/${event._id || event.id}`}>
          <img
            src={event.image || '/assets/img/banner/s1.webp'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

        {/* Date Box */}
        <div className="absolute top-4 left-4 bg-temple-accent text-white text-center px-3.5 py-2 shadow-lg border border-white/20">
          <span className="font-lora text-2xl font-bold block leading-none">{day}</span>
          <span className="text-[10px] tracking-[1.5px] uppercase font-semibold block mt-0.5">{month}</span>
        </div>

        {/* Category */}
        {event.category && (
          <span className="absolute top-4 right-4 bg-temple-primary/90 text-temple-gold text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 border border-temple-gold/30">
            {event.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <FaClock className="text-temple-accent" />
            <span>{event.time || (language === 'bn' ? 'সকাল ১০:০০ – দুপুর ০১:০০' : '10:00 AM – 01:00 PM EST')}</span>
          </div>

          <h3 className="font-lora font-bold text-temple-primary text-xl mb-2.5 line-clamp-2 group-hover:text-temple-accent transition-colors leading-snug">
            <Link to={`/events/${event._id || event.id}`}>{event.title}</Link>
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <FaMapMarkerAlt className="text-temple-accent shrink-0" />
            <span className="line-clamp-1">{event.location || (language === 'bn' ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির • মূল নাটমন্দির' : 'Sri Sri Kalachand Bigraha Central Temple • Main Sanctum')}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            to={`/events/${event._id || event.id}`}
            className="text-temple-accent font-lora text-xs uppercase font-bold tracking-wider hover:text-temple-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
          >
            <span>{language === 'bn' ? 'বিস্তারিত সময়সূচী' : 'Event Details'}</span>
            <FaArrowRight className="text-[10px]" />
          </Link>

          <button
            onClick={() => onRegister && onRegister(event)}
            className="bg-temple-primary hover:bg-temple-accent text-white font-lora text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'উপস্থিতি নিশ্চিত করুন' : 'RSVP / Register'}
          </button>
        </div>
      </div>
    </div>
  )
}
