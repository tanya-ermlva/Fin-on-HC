import { CommandItem } from "../ui/command"
import { CornerDownLeft, Sparkles } from "lucide-react"
import { Button } from "../ui/button"

interface AICardProps {
  query: string
  isGenerating: boolean
  isSelected: boolean
  onSelect: () => void
}

export function AICard({ query, isGenerating, isSelected, onSelect }: AICardProps) {
  return (
    <CommandItem
      value="ai-answer"
      onSelect={onSelect}
      className={`
        mx-4 my-4 rounded-lg h-[120px] group
        ${isSelected
          ? 'relative p-[2px] bg-gradient-to-r from-violet-300 via-orange-300 to-red-500'
          : 'relative p-[2px] hover:bg-gradient-to-r from-violet-300 via-orange-300 to-red-500'
        }
      `}
    >
      <div className={`
        px-6 flex-1 px-4 flex items-start gap-6 rounded-md h-full relative
        bg-gradient-to-r from-violet-50/100 via-orange-50/100 to-red-50/100
      `}>
        <div className="flex items-center h-full">
          <Sparkles className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col justify-center h-full flex-1">
          <div className="text-base font-bold flex items-center gap-1">
            {/* <span className="bg-black text-white px-1 py-0.5 rounded text-[10px] tracking-extra-wide">AI</span> */}
            <span className="mr-1">Ask AI:</span>
            <span className="truncate">{query}</span>
          </div>
          <div className="text-base text-muted-foreground truncate">
            {isGenerating 
              ? "Generating answer..."
              : "Let Fin AI answer your question"
            }
          </div>
        </div>
        <div className={`
          absolute right-4 top-1/2 -translate-y-1/2
          transition-opacity duration-200
          ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          <Button 
            variant="ghost" 
            size="icon"
            className={`bg-white/30 hover:bg-white/50 ${isSelected ? 'bg-orange-50 hover:bg-orange-100' : ''}`}
          >
            <CornerDownLeft className={`h-4 w-4 ${isSelected ? 'text-orange-700' : ''}`} />
          </Button>
        </div>
      </div>
    </CommandItem>
  )
} 