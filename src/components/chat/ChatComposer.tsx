import { useState, useRef, useEffect } from "react"
import { Paperclip, Globe, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../../components/ui/textarea"   

interface ChatComposerProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  variant?: 'default' | 'chat';
}

export function ChatComposer({ onSendMessage, isLoading, variant = 'default' }: ChatComposerProps) {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isHelpActive, setIsHelpActive] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasContent = input.trim().length > 0

  // Auto-resize textarea with max composer height
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '24px' // Base height
      const scrollHeight = textarea.scrollHeight
      
      // Max textarea height = max composer height (240px) - padding - toolbar height
      const maxTextareaHeight = 240 - (16 + 16) - 48 // 240px - (p-4 + pb-4) - toolbar
      
      textarea.style.height = `${Math.min(scrollHeight, maxTextareaHeight)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        onSendMessage(input)
        setInput("")
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSendMessage(input)
    setInput("")
  }

  return (
    <div className="sticky bottom-0 z-20 relative bg-gradient-to-b from-transparent to-background">
      <div className={`relative px-4 ${variant === 'chat' ? 'pb-4' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className={`rounded-3xl bg-gray-50 transition-all border border-gray-100 ${
            isFocused ? 'ring-2 ring-gray-100 border-gray-100 bg-white' : ''
          }`}>
            {/* Textarea container with overflow */}
            <div className="p-3">
              <Textarea 
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask anything..."
                className="w-full border-none bg-transparent text-sm focus:ring-0 focus:ring-offset-0 placeholder:text-gray-400 resize-none overflow-y-auto"
                disabled={isLoading}
                autoFocus
                rows={1}
              />
            </div>
            
            {/* Fixed height toolbar */}
            <div className="flex items-center justify-between px-2 py-2 h-12">
              <div className="flex gap-1 items-center">
                <Button variant="ghost" size="icon" type="button">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                {variant === 'default' && (
                  <Button 
                    variant={isHelpActive ? "outline" : "ghost"}
                    className="flex gap-2"
                    onClick={() => setIsHelpActive(!isHelpActive)}
                    type="button"
                  >
                    <Globe className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-500">Search help center</span>
                  </Button>
                )}
              </div>
              <Button 
                variant={hasContent ? "default" : "secondary"} 
                size="icon" 
                type="submit" 
                disabled={isLoading || !hasContent}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}