import { Menu, ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { AIAvatar } from '../chat/AIAvatar'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  variant?: 'default' | 'chat'
}

export function Header({ variant = 'default' }: HeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  if (variant === 'chat') {
    return (
      <div className="sticky top-0 z-20">
        <div className="flex items-center gap-3 px-4 py-4 rounded-t-3xl border-b border-gray-100/30 bg-white/90 backdrop-blur-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <AIAvatar />
            <span className="font-semibold">Fin</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-20 relative bg-transparent">
      <div className="relative flex items-center justify-between px-4 h-16">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="font-semibold text-lg">Fin</span>
        </div>
      </div>
    </header>
  )
} 