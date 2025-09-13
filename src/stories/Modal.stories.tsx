import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../components/ui/modal";
import { Bot, ChevronDown } from "lucide-react";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const ModelSelector: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-6">
        {/* Trigger Button */}
        <div
          className="border px-3 py-2 rounded bg-background flex items-center justify-between cursor-pointer hover:border-sidebar-accent"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span>GPT-4</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Modal */}
        <Modal open={open} onOpenChange={setOpen} title="Select Model">
          <ul className="space-y-2">
            <li className="cursor-pointer hover:bg-muted p-2 rounded">GPT-4</li>
            <li className="cursor-pointer hover:bg-muted p-2 rounded">GPT-3.5</li>
            <li className="cursor-pointer hover:bg-muted p-2 rounded">Claude</li>
            <li className="cursor-pointer hover:bg-muted p-2 rounded">Llama 2</li>
          </ul>
        </Modal>
      </div>
    );
  },
};
