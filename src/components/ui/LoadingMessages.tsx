import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const messages = [
  "Thinking...",
  "Looking through sources...",
  "Analyzing...",
  "Verifying...",
]

interface LoadingMessagesProps {
  isLoading: boolean
}

export function LoadingMessages({ isLoading }: LoadingMessagesProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!isLoading) {
      setMessageIndex(0)
      return
    }

    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <div className="px-4 text-sm text-muted-foreground/70 h-6 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLoading ? messageIndex : 'static'}
          initial={{ 
            opacity: 0,
            y: 5,
          }}
          animate={{ 
            opacity: 1,
            y: 0,
          }}
          exit={{ 
            opacity: 0,
            y: -5,
            position: 'absolute'
          }}
          transition={{ 
            duration: 0.2,
            ease: [0.2, 0, 0.2, 1]
          }}
          className="relative"
        >
          {isLoading ? messages[messageIndex] : "Fin AI answer"}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: "-200%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              repeatDelay: 0.5
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 