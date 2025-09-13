import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "../components/ui/slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: { type: "number" }, defaultValue: 0 },
    max: { control: { type: "number" }, defaultValue: 100 },
    defaultValue: { control: "object" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [30],
    min: 0,
    max: 100,
  },
};

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-64">
        <Slider
          value={value}
          onValueChange={(val) => setValue(val)}
          min={0}
          max={100}
        />
        <p className="mt-2">Value: {value.join(", ")}</p>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: [40],
    orientation: "vertical",
    min: 0,
    max: 100,
  },
  render: (args) => (
    <div className="h-48">
      <Slider {...args} />
    </div>
  ),
};
