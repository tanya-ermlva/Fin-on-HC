import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'
import { AppContainer } from '../components/layout/AppContainer'

export function RootLayout() {
  const location = useLocation()
  const isChat = location.pathname === '/messages'

  return (
    <AppContainer>
      {!isChat && <Header />}
      <main className="flex-1 overflow-hidden bg-transparent">
        <Outlet />
      </main>
      {!isChat && <BottomNav />}
    </AppContainer>
  )
} 