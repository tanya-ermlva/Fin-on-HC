interface BasicLayoutProps {
  children: React.ReactNode;
}

export function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
} 