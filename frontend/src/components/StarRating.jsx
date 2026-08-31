import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function StarRating({ value = 0, size = 'text-sm' }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />)
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />)
    }
  }
  return <div className={`flex items-center gap-0.5 ${size}`}>{stars}</div>
}
