export const SkeletonLoader = ({ className = "", rows = 3 }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          {i === 0 && <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>}
        </div>
      ))}
    </div>
  )
}

export const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, j) => (
              <div key={j} className="flex-1">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  )
}

export const StatsCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-12 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}