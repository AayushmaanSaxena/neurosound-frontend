interface SectionHeaderProps {
    title: string
    showAll?: boolean
    onShowAll?: () => void
}

const SectionHeader = ({ title, showAll = false, onShowAll }: SectionHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-ns-white text-xl font-bold">{title}</h2>
            {showAll && (
                <button
                    onClick={onShowAll}
                    className="text-ns-gray text-sm font-medium hover:text-ns-white transition-colors"
                >
                    Show all
                </button>
            )}
        </div>
    )
}

export default SectionHeader