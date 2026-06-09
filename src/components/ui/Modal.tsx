import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {

    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        // Backdrop — clicking outside closes modal
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
            onClick={onClose}
        >
            {/* Modal box — stop click from reaching backdrop */}
            <div
                className="bg-ns-dark rounded-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-ns-white text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-ns-gray hover:text-ns-white transition-colors text-xl"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Modal