import { Link } from 'react-router-dom'
import { FaOm, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

export default function BlogCard({ blog }) {
  const { language } = useLanguage()

  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : (language === 'bn' ? '১৫ আগস্ট, ২০২৬' : 'Aug 15, 2026')

  const authorAvatar = blog.authorAvatar || '/assets/img/people/1.webp'

  return (
    <article className="group bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden font-poppins">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-56 bg-temple-primary">
        <Link to={`/blog/${blog._id || blog.id}`}>
          <img
            src={blog.image || '/assets/img/blog/1.webp'}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-temple-accent text-white text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 shadow-md">
          {blog.category || (language === 'bn' ? 'বৈদিক ধর্মকথা' : 'Vedic Wisdom')}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Meta with Om & Date */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2.5">
            <span className="flex items-center gap-1.5 text-temple-accent font-medium">
              <FaOm className="text-[11px]" />
              <span>{language === 'bn' ? 'ধর্মপ্রবন্ধ' : 'Discourse'}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-[10px] text-gray-400" />
              <span>{date}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-lora font-bold text-temple-primary text-xl mb-2.5 line-clamp-2 group-hover:text-temple-accent transition-colors leading-snug">
            <Link to={`/blog/${blog._id || blog.id}`}>{blog.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {blog.excerpt || blog.content}
          </p>
        </div>

        {/* Footer with Author & Link */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={authorAvatar}
              alt={blog.author || 'Priest'}
              className="w-7 h-7 rounded-full object-cover border border-temple-accent/40"
              loading="lazy"
            />
            <span className="text-xs font-semibold text-gray-700">
              {blog.author || (language === 'bn' ? 'আচার্য রাকেশ পাণ্ডে' : 'Acharya Rakesh')}
            </span>
          </div>

          <Link
            to={`/blog/${blog._id || blog.id}`}
            className="text-temple-accent font-lora text-xs uppercase font-bold tracking-wider hover:text-temple-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read More'}</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </article>
  )
}
