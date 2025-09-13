import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { ChatBubble } from "./ui/chat-bubble";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import promptsData from "../data/prompts.json";

export function ChatArea() {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [prompt, setPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Load dummy prompts ---
  useEffect(() => {
    setSavedPrompts(promptsData.templates || []);
  }, []);

  // --- Auto scroll to bottom ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // --- Handlers ---
  const handleSend = () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user" as const, text: prompt };
    setMessages([...messages, userMessage]);
    setPrompt("");
    setPopoverOpen(false);

    setTimeout(() => {
      const aiMessage = {
        role: "ai" as const,
        text: "This is a dummy AI response for: " + prompt,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = (filename: string, data: unknown) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url); // cleanup
  };

  const handleInputChange = (value: string) => {
    setPrompt(value);

    if (value.length > 0) {
      const matches = savedPrompts.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPrompts(matches);
      setPopoverOpen(matches.length > 0);
    } else {
      setPopoverOpen(false);
    }
  };

  const handleSelectPrompt = (template: string) => {
    setPrompt(template);
    setPopoverOpen(false);
  };

  // --- Render ---
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background min-w-0">
      {/* Scrollable messages */}
      <ScrollArea
        className="flex-1 min-h-0 p-4 md:p-6"
        ref={scrollRef}
        aria-label="Chat messages"
      >
        <div className="space-y-4 flex flex-col" role="list">
          {messages.length === 0 ? (
            <div
              className="flex-1 flex items-center justify-center text-muted-foreground"
              tabIndex={0}
              aria-label="Welcome message"
            >
              👋 Welcome! Start by typing your first prompt below.
            </div>
          ) : (
            messages.map((msg, idx) => (
              <ChatBubble
                key={idx}
                role={msg.role}
                text={msg.text}
                onCopy={() => handleCopy(msg.text)}
                onDownload={() =>
                  handleDownload(`message-${idx}.json`, { response: msg.text })
                }
                // tabIndex={0}
                aria-label={`${msg.role === "user" ? "User" : "AI"} message: ${msg.text}`}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input Bar */}
      <div className="flex-shrink-0 border-t border-border p-4">
        <div className="flex items-end gap-2">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="relative flex-1">
                <Textarea
                  placeholder="Type your prompt..."
                  value={prompt}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full resize-none pr-12 focus-visible:ring-2 focus-visible:ring-blue-500"
                  rows={1}
                  aria-label="Chat input"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="top"
              className="max-h-48 overflow-y-auto w-[var(--radix-popover-trigger-width)]"
              aria-label="Prompt suggestions"
            >
              {filteredPrompts.length > 0 ? (
                <div className="space-y-1">
                  {filteredPrompts.map((template, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left focus-visible:ring-2 focus-visible:ring-blue-500"
                      onClick={() => handleSelectPrompt(template)}
                      tabIndex={0}
                      aria-label={`Insert prompt: ${template}`}
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No matches</p>
              )}
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Send message"
          >
            <Send className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
