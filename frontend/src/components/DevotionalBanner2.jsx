import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaOm, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const SLIDES_2 = [
  {
    id: 1,
    subtitleBn: 'বৈদিক আত্মজ্ঞান ও মুক্তি',
    subtitleEn: 'Wisdom Is Key',
    titleBn: 'আপনার মনকে দেহের ন্যায়\nভগবদ্ভাবে শৃঙ্খলাবদ্ধ করুন।',
    titleEn: 'Train your mind as fiercely\nas your body.',
    image: '/assets/img/banner/s3.webp',
    btnTextBn: 'মন্দির পরিচিতি',
    btnTextEn: 'About Mandir',
    link: '/about',
  },
  {
    id: 2,
    subtitleBn: 'দিব্য লীলা ও প্রেমভক্তি',
    subtitleEn: 'Divine Play & Bhakti',
    titleBn: 'শ্রীকৃষ্ণের মোহন বাঁশির সুরে\nহৃদয় হোক প্রেমানন্দে উদ্বেলিত।',
    titleEn: 'Enchanting hearts with\neternal love and wisdom.',
    image: '/assets/img/banner/s2.webp',
    btnTextBn: 'উৎসব ও দর্শন',
    btnTextEn: 'Experience Darshan',
    link: '/events',
  },
]

export default function DevotionalBanner2() {
  const [current, setCurrent] = useState(0)
  const { language } = useLanguage()

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES_2.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES_2.length) % SLIDES_2.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 8000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[65vh] min-h-[480px] max-h-[640px] overflow-hidden bg-temple-dark select-none font-poppins" aria-label="Devotional Mid-page Slider">
      {SLIDES_2.map((slide, idx) => {
        const isActive = idx === current
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
              isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            {/* Background image with Ken Burns */}
            <div
              className={`absolute inset-[-4%] bg-cover bg-center bg-no-repeat transition-transform duration-1000 ${
                isActive ? 'animate-kr-zoom' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
              role="presentation"
            />
            {/* Dark gradient & vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/60 z-[1]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.6)_100%)] z-[2] pointer-events-none" />

            {/* Slide Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
              {isActive && (
                <div className="animate-kr-content space-y-5">
                  <div className="inline-flex items-center gap-3 text-temple-gold text-xs md:text-sm font-semibold tracking-[4px] uppercase bg-black/30 px-5 py-1.5 border border-temple-gold/30">
                    <FaOm className="text-xs text-temple-gold opacity-90" />
                    <span>{language === 'bn' ? slide.subtitleBn : slide.subtitleEn}</span>
                    <FaOm className="text-xs text-temple-gold opacity-90" />
                  </div>

                  <h2 className="font-lora text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight whitespace-pre-line drop-shadow-md">
                    {language === 'bn' ? slide.titleBn : slide.titleEn}
                  </h2>

                  <div className="pt-2">
                    <Link
                      to={slide.link}
                      className="kr-btn-custom shadow-xl"
                    >
                      {language === 'bn' ? slide.btnTextBn : slide.btnTextEn}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Floating Particles */}
      <div className="kr-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-temple-accent border border-white/20 text-white items-center justify-center transition-all duration-300 cursor-pointer"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-temple-accent border border-white/20 text-white items-center justify-center transition-all duration-300 cursor-pointer"
      >
        <FaChevronRight className="text-sm" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES_2.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2.5 h-2.5 transition-all duration-300 cursor-pointer ${
              i === current ? 'bg-temple-gold scale-125' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
