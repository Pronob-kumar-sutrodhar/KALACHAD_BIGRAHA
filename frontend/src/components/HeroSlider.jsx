import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaOm, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

const SLIDE_DURATION = 7000

export default function HeroSlider({ onDonateClick }) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [settings, setSettings] = useState(null)
  const { language, t } = useLanguage()

  useEffect(() => {
    api.get('/api/settings')
      .then((res) => {
        if (res.data) setSettings(res.data)
      })
      .catch(() => {})
  }, [])

  const slide1Title = language === 'bn'
    ? (settings?.heroSlide1TitleBn || 'আত্মার পরম শান্তি ও\nভক্তির পুণ্যভূমি')
    : (settings?.heroSlide1TitleEn || 'Strength lies not in the body,\nbut in the spirit.')

  const slide1Subtitle = language === 'bn'
    ? (settings?.heroSlide1SubtitleBn || 'পরম করুণাময় শ্রী শ্রী রাধাকৃষ্ণ')
    : (settings?.heroSlide1SubtitleEn || 'Krishna Embodies Divine Love')

  const slides = [
    {
      id: 1,
      subtitle: slide1Subtitle,
      title: slide1Title,
      image: '/assets/img/banner/s1.webp',
      primaryBtn: { text: language === 'bn' ? 'পূজা সংকল্প বুকিং' : 'Explore Temple', link: '/events' },
      secondaryBtn: { text: language === 'bn' ? 'অন্নদান সেবা দিন' : 'Make Donation', link: '/donations' },
    },
    {
      id: 2,
      subtitle: language === 'bn' ? 'নিত্য মঙ্গল আরতি ও বেদ পাঠ' : 'Krishna Inspires Eternal Devotion',
      title: language === 'bn' ? 'শ্রীকৃষ্ণের চরণে সমর্পণে\nপরম মোক্ষ লাভ' : 'Growth demands stepping beyond\nyour comfort zone.',
      image: '/assets/img/banner/s4.webp',
      primaryBtn: { text: language === 'bn' ? 'আসন্ন মহোৎসব' : 'Book Daily Puja', link: '/events' },
      secondaryBtn: { text: language === 'bn' ? 'মন্দির স্টোর' : 'Temple Store', link: '/shop' },
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }, [slides.length])

  const goToSlide = (idx) => {
    setCurrent(idx)
    setProgress(0)
  }

  // Progress Bar & Auto Slide
  useEffect(() => {
    const interval = 100
    const step = (interval / SLIDE_DURATION) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[620px] sm:h-[720px] lg:h-[780px] overflow-hidden bg-temple-primary select-none font-poppins">
      {/* ── Slide Backgrounds with Ken Burns ── */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Slow Scale */}
          <div
            className={`w-full h-full bg-cover bg-center ${
              idx === current ? 'animate-kr-zoom' : ''
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />

          {/* Dark Sacred Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-temple-primary/30 mix-blend-multiply" />
        </div>
      ))}

      {/* ── Floating Rising Golden Particles Overlay ── */}
      <div className="absolute inset-0 z-15 pointer-events-none kr-particles opacity-60" />

      {/* ── Foreground Slide Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          {/* Subtitle / Sanskrit Badge */}
          <div className="inline-flex items-center gap-2.5 bg-temple-accent/90 text-white text-xs sm:text-sm font-semibold tracking-[2px] uppercase px-4 py-1.5 shadow-md border border-white/20">
            <FaOm className="text-temple-gold text-sm animate-pulse" />
            <span>{slides[current].subtitle}</span>
          </div>

          {/* Large Heading */}
          <h1 className="font-lora text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] drop-shadow-lg whitespace-pre-line">
            {slides[current].title}
          </h1>

          {/* Description */}
          <p className="text-white/85 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
            {current === 0
              ? t('hero_slide1_desc')
              : t('hero_slide2_desc')}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <Link
              to={slides[current].primaryBtn.link}
              className="kr-btn-custom w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
            >
              <span>{slides[current].primaryBtn.text}</span>
            </Link>

            <Link
              to={slides[current].secondaryBtn.link}
              onClick={(e) => {
                if (slides[current].secondaryBtn.link === '/donations' && onDonateClick) {
                  e.preventDefault()
                  onDonateClick()
                }
              }}
              className="kr-btn-custom-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
            >
              <span>{slides[current].secondaryBtn.text}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Slide Progress Bar (Top of Controls) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 z-30">
        <div
          className="h-full bg-temple-accent transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Slide Counter & Controls ── */}
      <div className="absolute bottom-8 right-8 z-30 hidden sm:flex items-center gap-4 bg-temple-primary/80 backdrop-blur-xs px-5 py-3 border border-white/15 shadow-2xl">
        <span className="font-lora text-white font-bold text-lg">
          0{current + 1}
        </span>
        <span className="text-white/40 text-xs">/</span>
        <span className="text-white/60 text-xs font-semibold">
          0{slides.length}
        </span>

        <div className="flex items-center gap-2 border-l border-white/20 pl-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-temple-accent text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-temple-accent text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* ── Mobile Dot Controls ── */}
      <div className="absolute bottom-4 left-0 right-0 flex sm:hidden justify-center gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              idx === current ? 'bg-temple-accent w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
