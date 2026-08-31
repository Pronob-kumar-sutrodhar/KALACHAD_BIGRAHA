import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes, FaMinus, FaPlus, FaShoppingCart, FaStar, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'

export default function QuickViewModal({ isOpen, onClose, product }) {
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()
  const { language, formatMoney } = useLanguage()
  const navigate = useNavigate()

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addToCart(product, qty)
    toast.success(
      language === 'bn'
        ? `${qty}টি ${product.name} ঝুড়িতে যুক্ত হয়েছে!`
        : `Added ${qty}x ${product.name} to cart!`
    )
  }

  const handleBuyNow = () => {
    addToCart(product, qty)
    onClose()
    navigate('/checkout')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn font-poppins">
      <div className="bg-white max-w-2xl w-full shadow-2xl relative border-t-4 border-temple-accent overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-5 sm:p-8 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-slate-50 border border-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.image || '/assets/img/products/new/1.webp'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4 font-poppins">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-temple-accent bg-orange-50 px-2 py-0.5 border border-temple-accent/20">
                {product.category || (language === 'bn' ? 'পূজা সামগ্রী' : 'Puja Samagri')}
              </span>

              <h3 className="font-lora text-xl font-bold text-temple-primary mt-2">
                {product.name}
              </h3>

              {/* Price & Rating */}
              <div className="flex items-center gap-3 my-2">
                <span className="font-lora text-2xl font-bold text-temple-accent">
                  {formatMoney(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    {formatMoney(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating || 5) ? 'text-amber-400' : 'text-gray-200'} />
                ))}
                <span className="text-gray-400 text-xs ml-1 font-poppins">
                  ({product.numReviews || 24} {language === 'bn' ? 'মতামত' : 'Reviews'})
                </span>
              </div>

              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                {product.description ||
                  (language === 'bn'
                    ? 'শ্রী শ্রী কৃষ্ণ মহা মন্দিরে পূজিত ও মন্ত্রপুত পবিত্র বিগ্রহ ও ধর্মীয় সামগ্রী।'
                    : 'Authentic temple sanctified spiritual items, books, and murtis direct from Krishna Mega Temple Stores.')}
              </p>
            </div>

            {/* Qty & Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase text-gray-600">
                  {language === 'bn' ? 'পরিমাণ:' : 'Qty:'}
                </span>
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    <FaMinus className="text-[10px]" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-800">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    <FaPlus className="text-[10px]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="bg-temple-primary hover:bg-slate-900 text-white font-lora text-xs uppercase tracking-wider font-semibold py-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FaShoppingCart className="text-xs" />
                  <span>{language === 'bn' ? 'ঝুড়িতে যোগ করুন' : 'Add To Cart'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-temple-accent hover:bg-orange-700 text-white font-lora text-xs uppercase tracking-wider font-semibold py-3 transition-colors cursor-pointer text-center"
                >
                  {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2">
                <span>{language === 'bn' ? 'শেয়ার করুন:' : 'Share Item:'}</span>
                <div className="flex items-center gap-2">
                  <a href="#" className="hover:text-temple-accent"><FaFacebookF /></a>
                  <a href="#" className="hover:text-temple-accent"><FaTwitter /></a>
                  <a href="#" className="hover:text-temple-accent"><FaLinkedinIn /></a>
                  <a href="#" className="hover:text-temple-accent"><FaYoutube /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
