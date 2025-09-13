import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    children: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Click Me", variant: "default", size: "default" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
