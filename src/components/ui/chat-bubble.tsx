import * as React from "react";
import { Copy, Download } from "lucide-react";
import { Button } from "./button";

interface ChatBubbleProps {
  role: "user" | "ai";
  text: string;
  onCopy?: () => void;
  onDownload?: () => void;
}

export function ChatBubble({ role, text, onCopy, onDownload }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[80%] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm
        ${isUser ? "bg-blue-500 text-white" : "bg-muted text-foreground"}`}
      >
        <p>{text}</p>

        {/* Actions only for AI messages */}
        {!isUser && (onCopy || onDownload) && (
          <div className="absolute bottom-16 left-0 flex gap-1">
            {onCopy && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCopy}
                title="Copy"
                className="h-6 w-6 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
            {onDownload && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDownload}
                title="Download JSON"
                className="h-6 w-6 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
