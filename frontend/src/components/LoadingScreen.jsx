import React from 'react'

/**
 * LoadingScreen - Sacred Om Preloader & Loading Screen
 * Background: #FF7722 (Sacred Temple Saffron Orange)
 * Icon: White Sacred Om (ॐ) with divine aura & halo spin
 */
export default function LoadingScreen({
  fullScreen = true,
  title = 'শ্রী শ্রী কৃষ্ণ মহা মন্দির',
  subtitle = 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে',
  showBar = true,
  bgColor = '#FF7722',
  className = '',
}) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-[999999] flex items-center justify-center'
    : 'relative w-full py-16 flex items-center justify-center min-h-[320px]'

  return (
    <div
      className={`${containerClasses} ${className} select-none`}
      style={{ backgroundColor: bgColor }}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 max-w-md w-full">
        {/* Sacred Om with Divine Aura & Spinning Halo */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center mb-6">
          {/* Subtle Outer Dashed Halo */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 pointer-events-none animate-[spin_14s_linear_infinite]"
          />
          {/* Outer Ring */}
          <div
            className="absolute -inset-2 rounded-full border border-white/20 pointer-events-none"
          />

          {/* White Om Symbol with Pulsing Breath */}
          <img
            src="/assets/img/om.svg"
            alt="Sacred Om"
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.75)] animate-pulse"
          />
        </div>

        {/* Temple Name */}
        {title && (
          <h2
            className="text-white text-xl md:text-2xl font-bold tracking-wide mb-2 drop-shadow-sm font-lora"
            style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", "Lora", serif' }}
          >
            {title}
          </h2>
        )}

        {/* Subtitle / Chant */}
        {subtitle && (
          <p
            className="text-white/90 text-xs md:text-sm font-medium tracking-wider mb-6 drop-shadow-sm"
            style={{ fontFamily: '"Hind Siliguri", "Poppins", sans-serif' }}
          >
            {subtitle}
          </p>
        )}

        {/* Sacred Progress Shimmer Bar */}
        {showBar && (
          <div className="w-44 h-1 bg-white/30 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-white rounded-full shadow-[0_0_8px_#ffffff] animate-[templeProgressShimmer_1.8s_ease-in-out_infinite]" />
          </div>
        )}
      </div>
    </div>
  )
}
