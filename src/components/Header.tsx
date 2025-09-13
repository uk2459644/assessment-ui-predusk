import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Menu, PanelLeft, PanelRight } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  isMobile: boolean;
}

export function Header({ onToggleLeftSidebar, onToggleRightSidebar, isMobile }: HeaderProps) {
  // Mock state to simulate user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="h-[60px] bg-background border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Left side - Logo and sidebar toggles */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLeftSidebar}
          className="p-2 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
          aria-label={isMobile ? "Open menu" : "Toggle left sidebar"}
          tabIndex={0}
        >
          {isMobile ? (
            <Menu className="h-4 w-4" />
          ) : (
            <PanelLeft className="h-4 w-4" />
          )}
        </Button>
        
        <h1 className="text-foreground text-lg md:text-xl">AI UI Prototype</h1>
      </div>
      
      {/* Right side - Right sidebar toggle and auth */}
      <div className="flex items-center gap-3">
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleRightSidebar}
            className="p-2 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
            aria-label="Toggle right sidebar"
            tabIndex={0}
          >
            <PanelRight className="h-4 w-4" />
          </Button>
        )}
        
        {/* Authentication Section */}
        {isLoggedIn ? (
          // Logged in user - show avatar
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 focus-visible:ring-2 focus-visible:ring-blue-500 transition-opacity duration-200"
            tabIndex={0}
            aria-label="User menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-blue-500 text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-foreground hidden sm:block">John Doe</span>
          </div>
        ) : (
          // Not logged in - show sign up button
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
            onClick={() => setIsLoggedIn(true)}
            aria-label="Sign Up"
            tabIndex={0}
          >
            Sign Up
          </Button>
        )}
      </div>
    </header>
  );
}