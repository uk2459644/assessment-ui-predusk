import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../components/ui/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "h-4 w-40"
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-6 w-56" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  ),
};
