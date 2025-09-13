import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "../components/ui/chat-bubble";

const meta: Meta<typeof ChatBubble> = {
  title: "UI/ChatBubble",
  component: ChatBubble,
  tags: ["autodocs"],
  argTypes: {
    role: { control: "select", options: ["user", "ai"] },
    text: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ChatBubble>;

export const UserMessage: Story = {
  args: {
    role: "user",
    text: "Hi AI! Can you help me write a blog post?",
  },
};

export const AIMessageWithActions: Story = {
  args: {
    role: "ai",
    text: "Sure! Here’s a structured response with helpful info.",
    onCopy: () => alert("Copied to clipboard"),
    onDownload: () => alert("Downloaded JSON"),
  },
};
