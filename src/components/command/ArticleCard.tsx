import { CommandItem } from "../ui/command"
import { BookOpen } from "lucide-react"

interface ArticleCardProps {
  title: string
  path: string
  isSelected: boolean
  onSelect: (path: string) => void
}

const articlePreviews: Record<string, string> = {
  'getting-started': 'Use the price calculator to find outbound minute prices for all locations. Learn about recording minutes, Messenger calls, and mobile inbound pricing. Get started with our comprehensive pricing guide.',
  
  'account-settings': 'This article provides a complete overview of our new pricing plans and features. Learn how to manage your subscription, understand billing cycles, and optimize your account settings for better cost management.',
  
  'troubleshooting': 'Find solutions for common integration issues, pricing calculations, and feature activation problems. Includes a detailed breakdown of pricing components and troubleshooting steps for various scenarios.'
}

export function ArticleCard({ title, path, isSelected, onSelect }: ArticleCardProps) {
  return (
    <CommandItem
      value={path}
      onSelect={() => onSelect(path)}
      className={`
        mx-4 my-2 rounded-lg h-[120px]
        data-[highlighted]:bg-transparent
        [&[data-highlighted]]:bg-transparent
        
        
        ${isSelected
          ? 'border-1 border-gray-200 bg-neutral-100'
          : 'border-gray-200 hover:border-gray-900'
        }
      `}
    >
      <div className={`
        flex-1 px-4 flex items-start gap-6 rounded-md h-full
      `}>
        <div className="flex items-center h-full">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1 text-base py-4">
          <div className="font-bold truncate">{title}</div>
          <div className="text-muted-foreground line-clamp-2">
            {articlePreviews[path]}
          </div>
        </div>
      </div>
    </CommandItem>
  )
} 