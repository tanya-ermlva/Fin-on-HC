import { Link, useLocation } from 'react-router-dom'
import { Home, MessageSquare, HelpCircle, Newspaper } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MessageSquare, label: 'Chat', path: '/messages' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
  { icon: Newspaper, label: 'News', path: '/news' }
]

export function BottomNav() {
  const location = useLocation()
  
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-20">
      <div className="flex justify-around items-center h-14 bg-white/90 backdrop-blur-sm border-t border-gray-100/30">
        {navItems.map(({ icon: Icon, path }) => (
          <Link 
            key={path}
            to={path}
            className={`p-2 ${
              location.pathname === path 
                ? 'text-primary' 
                : 'text-gray-500'
            }`}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </nav>
  )
} 