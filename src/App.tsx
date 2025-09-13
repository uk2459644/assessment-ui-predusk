import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { ChatArea } from "./components/ChatArea";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleLeftSidebar = () => {
    if (isMobile) {
      setLeftSidebarOpen(!leftSidebarOpen);
    } else {
      if (leftSidebarOpen && !leftSidebarCollapsed) {
        setLeftSidebarCollapsed(true);
      } else if (leftSidebarOpen && leftSidebarCollapsed) {
        setLeftSidebarOpen(false);
      } else {
        setLeftSidebarOpen(true);
        setLeftSidebarCollapsed(false);
      }
    }
  };

  const toggleRightSidebar = () => {
    if (isMobile) {
      setRightSidebarOpen(!rightSidebarOpen);
    } else {
      if (rightSidebarOpen && !rightSidebarCollapsed) {
        setRightSidebarCollapsed(true);
      } else if (rightSidebarOpen && rightSidebarCollapsed) {
        setRightSidebarOpen(false);
      } else {
        setRightSidebarOpen(true);
        setRightSidebarCollapsed(false);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background" role="application" aria-label="AI Chat Application">
      {/* Header */}
      <Header
        onToggleLeftSidebar={toggleLeftSidebar}
        onToggleRightSidebar={toggleRightSidebar}
        isMobile={isMobile}
      />

      {/* Main content area */}
      <div className="flex-1 flex relative" role="main" aria-label="Main content">
        {/* Left Sidebar */}
        {leftSidebarOpen && (
          <LeftSidebar
            collapsed={leftSidebarCollapsed}
            isMobile={isMobile}
            onClose={() => setLeftSidebarOpen(false)}
          />
        )}

        {/* Chat Area */}
        <ChatArea />

        {/* Right Sidebar */}
        {rightSidebarOpen && (
          <RightSidebar
            collapsed={rightSidebarCollapsed}
            isMobile={isMobile}
            onClose={() => setRightSidebarOpen(false)}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        )}

        {/* Mobile overlay */}
        {isMobile && (leftSidebarOpen || rightSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              setLeftSidebarOpen(false);
              setRightSidebarOpen(false);
            }}
            role="presentation"
            aria-label="Sidebar overlay"
            tabIndex={0}
          />
        )}
      </div>
    </div>
  );
}
