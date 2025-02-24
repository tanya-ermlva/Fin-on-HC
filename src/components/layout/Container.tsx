import { Card } from "../ui/card"

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Card className="w-full max-w-[480px] h-[calc(100vh-2rem)] relative z-10 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {children}
        </div>
      </Card>
    </div>
  )
}
