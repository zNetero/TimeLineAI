import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          isUser ? "bg-glow-secondary/20 border border-glow-secondary/30" : "bg-glow-primary/20 border border-glow-primary/30"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-glow-secondary" />
        ) : (
          <Bot className="w-4 h-4 text-glow-primary" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-glow-secondary/10 border border-glow-secondary/20"
            : "glass-surface border-glow"
        }`}
      >
        <div className="prose prose-sm prose-invert max-w-none text-foreground/90 [&_strong]:text-glow-accent [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h3]:text-glow-primary [&_h3]:text-sm [&_code]:text-glow-accent [&_code]:bg-muted/50 [&_code]:px-1 [&_code]:rounded">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
