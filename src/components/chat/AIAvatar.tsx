import { Avatar, AvatarFallback } from "../ui/avatar"

export function AIAvatar() {
  return (
    <Avatar className="overflow-hidden bg-gradient-to-br from-violet-500 via-emerald-400 via-yellow-400 to-orange-500">
      <AvatarFallback className="bg-transparent" />
    </Avatar>
  )
} 