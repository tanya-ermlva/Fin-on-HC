interface AppContainerProps {
  children: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gray-50">
      <div className="w-full max-w-[480px] h-[calc(100vh-2rem)] relative z-10 overflow-hidden rounded-3xl border border-gray-100 shadow-md bg-white/95">
        <div className="relative h-full flex flex-col bg-transparent">
          {children}
        </div>
      </div>
    </div>
  )
} 