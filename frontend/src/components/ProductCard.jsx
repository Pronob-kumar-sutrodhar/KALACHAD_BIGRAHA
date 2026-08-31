import { Link } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaEye, FaStar } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { language, formatMoney } = useLanguage()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    toast.success(
      language === 'bn'
        ? `${product.name} ঝুড়িতে যুক্ত হয়েছে!`
        : `${product.name} added to cart!`
    )
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toast.success(
      language === 'bn'
        ? `${product.name} পছন্দের তালিকায় সংরক্ষিত!`
        : `Added ${product.name} to wishlist!`
    )
  }

  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-slate-50">
        <Link to={`/shop/${product._id || product.id}`}>
          <img
            src={product.image || '/assets/img/products/new/1.webp'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-temple-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover action bar */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 bg-temple-primary hover:bg-temple-accent text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title={language === 'bn' ? 'ঝুড়িতে যুক্ত করুন' : 'Add to Cart'}
          >
            <FaShoppingCart className="text-xs" />
          </button>
          <button
            onClick={handleWishlist}
            className="w-9 h-9 bg-temple-primary hover:bg-temple-accent text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title={language === 'bn' ? 'পছন্দের তালিকায় রাখুন' : 'Add to Wishlist'}
          >
            <FaHeart className="text-xs" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (onQuickView) onQuickView(product)
            }}
            className="w-9 h-9 bg-temple-primary hover:bg-temple-accent text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title={language === 'bn' ? 'একনজরে দেখুন' : 'Quick View'}
          >
            <FaEye className="text-xs" />
          </button>
        </div>

        {/* Category tag */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-temple-accent text-white text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-0.5 shadow-xs">
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.floor(product.rating || 5) ? 'text-amber-400' : 'text-gray-200'} />
            ))}
            <span className="text-gray-400 text-[11px] ml-1 font-poppins">({product.numReviews || 12})</span>
          </div>

          <h3 className="font-lora font-bold text-temple-primary text-base line-clamp-1 group-hover:text-temple-accent transition-colors">
            <Link to={`/shop/${product._id || product.id}`}>{product.name}</Link>
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="font-lora font-bold text-temple-accent text-lg">
            {formatMoney(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-temple-primary hover:bg-temple-accent text-white font-lora text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'যুক্ত করুন' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
