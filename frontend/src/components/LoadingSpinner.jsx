export default function LoadingSpinner({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10'
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className={`${sizeClass} border-4 border-temple-orange border-t-transparent rounded-full animate-spin`}
      />
    </div>
  )
}
