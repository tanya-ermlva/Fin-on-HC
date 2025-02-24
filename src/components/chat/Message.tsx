import { Message as MessageType } from "../../types/chat"
import { cn } from "../../lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"

interface MessageProps {
  message: MessageType;
  isNew?: boolean;
}

export function Message({ message }: MessageProps) {
  const isAI = message.role === 'assistant'
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  return (
    <div className={cn(
      "flex gap-3",
      isAI ? "flex-row" : "flex-row-reverse"
    )}>
      <div className="flex flex-col gap-0.5">
        <TooltipProvider>
          <Tooltip delayDuration={800}>
            <TooltipTrigger asChild>
              <div className={cn(
                "rounded-2xl px-4 py-2 max-w-[80%]",
                isAI 
                  ? "bg-gray-100" 
                  : "bg-primary text-white ml-auto"
              )}>
                {message.content}
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side={isAI ? "right" : "left"}
              align="center"
              sideOffset={12}
              className="text-xs text-gray-300"
            >
              {formatTime(message.timestamp)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isAI && (
          <span className="text-xs text-gray-300 ml-1">Fin</span>
        )}
      </div>
    </div>
  )
}
