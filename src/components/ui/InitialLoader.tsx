import { Loader2 } from "lucide-react"

export function InitialLoader() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <Loader2 className="h-6 w-6 text-muted-foreground/70 animate-spin" />
    </div>
  )
} 