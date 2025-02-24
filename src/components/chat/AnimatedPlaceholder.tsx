import { useState, useEffect } from 'react'

const placeholders = [
  "Ask anything...",
  "Ask for a person..."
]

export function AnimatedPlaceholder() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full flex items-center">
      <div 
        className={`text-gray-400 overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
          isVisible 
            ? 'opacity-100 animate-type-in' 
            : 'opacity-0'
        }`}
      >
        {placeholders[currentPlaceholder]}
      </div>
    </div>
  )
} 