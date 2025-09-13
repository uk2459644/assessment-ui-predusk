import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "file"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    type: "text",
    placeholder: "Invalid input",
    "aria-invalid": "true",
  },
};
