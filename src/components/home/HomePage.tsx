import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatComposer } from '../chat/ChatComposer'
import { WelcomeText } from './WelcomeText'

export function HomePage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = (content: string) => {
    setIsLoading(true)
    // Navigate to chat with initial message
    navigate('/messages', { 
      state: { initialMessage: content }
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center px-8 pb-[72px]">
          <WelcomeText />
        </div>
      </div>
      <div className="absolute bottom-14 left-0 right-0">
        <ChatComposer 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          variant="default"
        />
      </div>
    </div>
  )
} 