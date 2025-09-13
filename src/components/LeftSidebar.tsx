import { useEffect, useState } from "react";
import { ChevronDown, Bot, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

import modelsData from "../data/models.json";
import templatesData from "../data/templates.json";

interface LeftSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export function LeftSidebar({ collapsed, isMobile, onClose }: LeftSidebarProps) {
  const [models, setModels] = useState<typeof modelsData>([]);
  const [templates, setTemplates] = useState<typeof templatesData>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem("selectedModel") || "GPT-4";
  });

  const sidebarWidth = collapsed ? "w-16" : "w-[250px]";
  const mobileClasses = isMobile
    ? "fixed left-0 top-[60px] h-[calc(100vh-60px)] z-50 shadow-lg"
    : "";

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setModels(modelsData);
      setTemplates(templatesData);
      setLoading(false);
    }, 1200); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleSelectModel = (modelName: string) => {
    setSelectedModel(modelName);
    localStorage.setItem("selectedModel", modelName);
  };

  const handleApplyTemplate = (template: { id: string; name: string; content: string }) => {
    window.dispatchEvent(new CustomEvent("apply-template", { detail: template }));
  };

  return (
    <div
      className={`${sidebarWidth} ${mobileClasses} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
    >
      {/* Mobile close */}
      {isMobile && (
        <div className="flex justify-end p-2 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
            aria-label="Close sidebar"
            tabIndex={0}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="p-4 space-y-6 flex-1">
        {/* Models */}
        <div>
          {!collapsed && <h3 className="text-sidebar-foreground mb-3">Models</h3>}

          <Popover>
            <PopoverTrigger asChild>
              <div
                className={`border border-sidebar-border rounded ${
                  collapsed ? "p-2" : "px-3 py-2"
                } bg-background flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } cursor-pointer hover:border-sidebar-accent focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200`}
                tabIndex={0}
                aria-label="Select model"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-sidebar-foreground" />
                  {!collapsed && (
                    <span className="text-sidebar-foreground">
                      {selectedModel}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <ChevronDown className="w-4 h-4 text-sidebar-foreground" />
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-56 bg-background border border-sidebar-border p-2">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-44" />
                </div>
              ) : (
                <ul className="space-y-1">
                  {models.map((model) => (
                    <li
                      key={model.id}
                      onClick={() => handleSelectModel(model.name)}
                      className={`cursor-pointer px-3 py-2 rounded hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200 ${
                        model.name === selectedModel
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : ""
                      }`}
                      tabIndex={0}
                      aria-label={`Select model ${model.name}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>{model.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {model.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Divider */}
        {!collapsed && <hr className="border-sidebar-border" />}

        {/* Templates */}
        <div>
          {!collapsed && (
            <h3 className="text-sidebar-foreground mb-3">Templates</h3>
          )}
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          ) : (
            <div className="space-y-2">
              {templates.map((t) => (
                <Button
                  key={t.id}
                  variant="outline"
                  className={`${collapsed ? "w-12 h-12 p-0" : "w-full"} ${collapsed ? "justify-center" : "justify-start"} bg-background border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200`}
                  title={collapsed ? t.name : ""}
                  onClick={() => handleApplyTemplate(t)}
                  aria-label={`Apply template ${t.name}`}
                  tabIndex={0}
                >
                  <FileText className={`w-4 h-4 ${collapsed ? "" : "mr-2"}`} />
                  {!collapsed && t.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
