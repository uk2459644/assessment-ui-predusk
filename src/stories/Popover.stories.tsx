import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Bot } from "lucide-react";
import React from "react";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Popover>;
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="p-10 flex justify-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Choose Model
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <ul className="space-y-2">
              <li className="cursor-pointer hover:bg-muted p-2 rounded">GPT-4</li>
              <li className="cursor-pointer hover:bg-muted p-2 rounded">GPT-3.5</li>
              <li className="cursor-pointer hover:bg-muted p-2 rounded">Claude</li>
              <li className="cursor-pointer hover:bg-muted p-2 rounded">Llama 2</li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};