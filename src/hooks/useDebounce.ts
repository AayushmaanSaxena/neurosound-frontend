import { useState, useEffect } from 'react'

// ─────────────────────────────────────────
// useDebounce hook
// Takes a value and a delay in milliseconds
// Returns the value only after the delay has passed
// without the value changing
//
// Example:
// const debouncedSearch = useDebounce(searchTerm, 300)
// debouncedSearch only updates 300ms after user stops typing
// ─────────────────────────────────────────
const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        // Set a timer to update the debounced value after delay
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Cleanup — if value changes before delay passes
        // cancel the previous timer and start fresh
        return () => clearTimeout(timer)

    }, [value, delay])

    return debouncedValue
}

export default useDebounce