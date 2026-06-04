// Loading skeleton — shows grey animated placeholders
// while real content is loading
// Much better UX than a blank screen or spinner

interface SkeletonCardProps {
    count?: number
}

const SkeletonCard = () => (
    <div className="bg-ns-card rounded-md p-4 animate-pulse">
        <div className="w-full aspect-square bg-ns-hover rounded-md mb-4" />
        <div className="h-4 bg-ns-hover rounded mb-2" />
        <div className="h-3 bg-ns-hover rounded w-2/3" />
    </div>
)

const LoadingSkeleton = ({ count = 6 }: SkeletonCardProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )
}

export default LoadingSkeleton