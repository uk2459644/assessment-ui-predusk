import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import promptsData from "../data/prompts.json";

export function PromptEditor() {
  const [prompt, setPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dummy JSON prompts
  useEffect(() => {
    try {
      setSavedPrompts(promptsData.templates || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load templates");
      setLoading(false);
    }
  }, []);

  const handleSave = () => {
    if (prompt.trim()) {
      setSavedPrompts([...savedPrompts, prompt]);
      setPrompt("");
    }
  };

  const handleLoad = (template: string) => {
    setPrompt(template);
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading templates...</p>;
  if (error) return <p className="text-sm text-destructive">{error}</p>;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-sidebar-foreground">
        Prompt Editor
      </label>

      {/* Controlled Textarea */}
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your custom prompt..."
      />

      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} className="bg-blue-500 text-white">
          Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPrompt("")}
        >
          Clear
        </Button>
      </div>

      {savedPrompts.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Saved Templates:</p>
          <div className="space-y-1">
            {savedPrompts.map((template, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start"
                onClick={() => handleLoad(template)}
              >
                {template.slice(0, 40)}...
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
