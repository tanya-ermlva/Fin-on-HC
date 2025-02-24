// Defines the structure of a message
export interface Message {
  id: string;          // Unique identifier for each message
  role: 'user' | 'assistant';  // Who sent the message
  content: string;     // The message text
  timestamp: Date;     // When the message was sent
}

// Defines the props for chat components
export interface ChatProps {
  messages: Message[];  // Array of messages
  onSendMessage: (content: string) => void;  // Function to send new message
  isLoading?: boolean;  // Loading state for API calls
} 