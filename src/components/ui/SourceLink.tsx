import { ChevronRight } from "lucide-react"

interface SourceLinkProps {
  title: string
  path: string
  onClick: (path: string) => void
}

export function SourceLink({ title, path, onClick }: SourceLinkProps) {
  return (
    <button
      onClick={() => onClick(path)}
      className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-neutral-100 transition-colors rounded-lg"
    >
      <span className="text-muted-foreground">{title}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  )
} 