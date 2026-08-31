import { Link } from 'react-router-dom'
import { FaHeart, FaHandsHelping } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

export default function DonationCard({ donation, onQuickDonate }) {
  const { language, formatMoney } = useLanguage()
  const raised = donation.raised || 0
  const goal = donation.goal || 100000
  const percent = Math.min(Math.round((raised / goal) * 100), 100)

  const getCategoryLabel = (cat) => {
    if (language !== 'bn') return cat || 'Sacred Seva'
    const map = {
      'Vedic Education': 'বৈদিক বিদ্যালয়',
      'Annadaan Seva': 'অন্নদান সেবা',
      'Mandir & Gaushala': 'মন্দির ও গৌশালা',
      'Scripture Seva': 'শাস্ত্র বিতরণ',
      'Sevak Welfare': 'সেবক কল্যাণ',
      'Pilgrim Seva': 'তীর্থযাত্রী সেবা',
      'Sacred Seva': 'পবিত্র সেবা',
    }
    return map[cat] || cat || 'পবিত্র সেবা'
  }

  return (
    <div className="group bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden font-poppins">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-56 bg-temple-primary">
        <img
          src={donation.image || '/assets/img/donation/5.webp'}
          alt={donation.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Category tag */}
        <div className="absolute top-4 left-4 bg-temple-accent text-white text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 shadow-md">
          {getCategoryLabel(donation.category)}
        </div>

        {/* Percentage badge */}
        <div className="absolute bottom-3 right-4 bg-temple-primary/90 text-temple-gold text-xs font-bold px-2.5 py-1 border border-temple-gold/30">
          {percent}% {language === 'bn' ? 'সংগৃহীত' : 'Funded'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-lora font-bold text-temple-primary text-xl mb-2 line-clamp-1 group-hover:text-temple-accent transition-colors">
            <Link to={`/donations/${donation._id}`}>{donation.title}</Link>
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6">
            {donation.description}
          </p>
        </div>

        {/* Progress Bar & Amounts */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-600">
                {language === 'bn' ? 'জমা:' : 'Raised:'}{' '}
                <strong className="text-temple-accent font-lora text-sm">{formatMoney(raised)}</strong>
              </span>
              <span className="text-gray-500">
                {language === 'bn' ? 'লক্ষ্য:' : 'Goal:'}{' '}
                <strong className="text-temple-primary font-lora text-sm">{formatMoney(goal)}</strong>
              </span>
            </div>

            <div className="h-2 w-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-temple-accent to-temple-gold transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onQuickDonate && onQuickDonate(donation)}
              className="bg-temple-accent hover:bg-temple-primary text-white font-lora text-xs uppercase tracking-wider font-semibold py-3 px-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FaHeart className="text-[10px]" />
              <span>{language === 'bn' ? 'দান করুন' : 'Donate Now'}</span>
            </button>
            <Link
              to={`/donations/${donation._id}`}
              className="border border-temple-primary/30 hover:border-temple-primary text-temple-primary font-lora text-xs uppercase tracking-wider font-semibold py-3 px-2 flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <FaHandsHelping className="text-xs" />
              <span>{language === 'bn' ? 'বিবরণ' : 'Details'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
