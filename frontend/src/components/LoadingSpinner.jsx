import React from 'react'
import LoadingScreen from './LoadingScreen'

export default function LoadingSpinner({
  size = 'md',
  fullScreen = false,
  withOm = true,
  title,
  subtitle,
}) {
  if (fullScreen) {
    return <LoadingScreen title={title} subtitle={subtitle} />
  }

  const containerSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }

  const omSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const cSize = containerSizes[size] || containerSizes.md
  const oSize = omSizes[size] || omSizes.md

  return (
    <div className="flex flex-col items-center justify-center py-10" role="status" aria-label="Loading">
      <div className={`relative ${cSize} flex items-center justify-center`}>
        {/* Outer Spinning Ring styled with #FF7722 */}
        <div
          className="absolute inset-0 border-3 border-[#FF7722]/30 border-t-[#FF7722] rounded-full animate-spin"
        />
        {/* Sacred Om Symbol in center with #FF7722 background */}
        {withOm && (
          <div className="w-full h-full p-2.5 flex items-center justify-center rounded-full bg-[#FF7722] shadow-sm">
            <img
              src="/assets/img/om.svg"
              alt="Om"
              className={`${oSize} object-contain animate-pulse`}
            />
          </div>
        )}
      </div>
      {title && (
        <p className="mt-3 text-xs font-semibold text-gray-600 tracking-wide uppercase">
          {title}
        </p>
      )}
    </div>
  )
}
