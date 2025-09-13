import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Settings, Thermometer, Hash, Palette, X } from "lucide-react";
import { Button } from "./ui/button";

interface RightSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function RightSidebar({ collapsed, isMobile, onClose, isDarkMode, onToggleTheme }: RightSidebarProps) {
  const sidebarWidth = collapsed ? "w-16" : "w-[250px]";
  const mobileClasses = isMobile ? "fixed right-0 top-[60px] h-[calc(100vh-60px)] z-50 shadow-lg" : "";
  
  return (
    <div className={`${sidebarWidth} ${mobileClasses} bg-sidebar border-l border-sidebar-border transition-all duration-300 flex flex-col`}>
      {/* Mobile close button */}
      {isMobile && (
        <div className="flex justify-start p-2 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="p-4 space-y-6 flex-1">
        {/* Parameters Section */}
        <div>
          <div className={`flex items-center gap-2 mb-4 ${collapsed ? 'justify-center' : ''}`}>
            <Settings className="w-4 h-4 text-sidebar-foreground" />
            {!collapsed && <h3 className="text-sidebar-foreground">Parameters</h3>}
          </div>
          
          {collapsed ? (
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-2 rounded border border-sidebar-border bg-background" title="Temperature">
                <Thermometer className="w-4 h-4 text-sidebar-foreground" />
              </div>
              <div className="p-2 rounded border border-sidebar-border bg-background" title="Max Tokens">
                <Hash className="w-4 h-4 text-sidebar-foreground" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-sidebar-foreground" />
                  <label className="text-sm text-sidebar-foreground">Temperature</label>
                </div>
                <Slider
                  defaultValue={[0.7]}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-sidebar-foreground" />
                  <label className="text-sm text-sidebar-foreground">Max Tokens</label>
                </div>
                <Slider
                  defaultValue={[2048]}
                  max={4096}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Divider */}
        {!collapsed && <hr className="border-sidebar-border" />}
        
        {/* Theme Section */}
        <div>
          <div className={`flex items-center gap-2 mb-4 ${collapsed ? 'justify-center' : ''}`}>
            <Palette className="w-4 h-4 text-sidebar-foreground" />
            {!collapsed && <h3 className="text-sidebar-foreground">Theme</h3>}
          </div>
          
          {collapsed ? (
            <div className="flex justify-center">
              <div className="p-2 rounded border border-sidebar-border bg-background" title="Light/Dark Theme">
                <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground">Light/Dark</span>
              <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}