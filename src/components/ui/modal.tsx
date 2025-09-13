import * as React from "react";
import { X } from "lucide-react";
import { cn } from "./utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, title, children, className }: ModalProps) {
  if (!open) return null;

  // Close modal if user clicks backdrop (outside content)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg bg-background p-6 shadow-lg",
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
}
