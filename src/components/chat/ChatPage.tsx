import { useState } from "react"
import { Message } from "./Message"
import { ChatComposer } from "./ChatComposer"
import { Header } from "../layout/Header"
import type { Message as MessageType } from "../../types/chat"

export function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Fin, your AI assistant. I'm here to help you with any questions you might have. I can help with analysis, explanations, coding, writing, or just general discussion. What would you like to explore today?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "user-1",
      role: "user",
      content: "I need help with my recent order. The tracking number isn't working.",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: "assistant-1",
      role: "assistant",
      content: "I understand you're having trouble with your order tracking. Could you please share your order number? This will help me look up the details and provide more specific assistance.",
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: "user-2",
      role: "user",
      content: "Sure, it's #ORD-12345. I placed the order last week.",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: "assistant-2",
      role: "assistant",
      content: "Thank you for providing the order number. I can see that your order #ORD-12345 was shipped yesterday via Express Post. There might be a slight delay in the tracking system update. The tracking should be active within the next 24 hours. Would you like me to set up tracking notifications for you?",
      timestamp: new Date(Date.now() - 60000)
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
    
    // Mock AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a mock response.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <Header variant="chat" />
      <div className="flex-1 overflow-y-auto -mt-16 pt-16 -mb-[76px] pb-[76px]">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <Message 
              key={message.id} 
              message={message} 
              isNew={index === messages.length - 1 && messages.length > 1}
            />
          ))}
        </div>
      </div>
      
      <ChatComposer 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        variant="chat"
      />
    </div>
  )
}
