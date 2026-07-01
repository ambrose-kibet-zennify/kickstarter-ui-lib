import type { Meta, StoryObj } from "@storybook/react";
import { Meter } from "./Meter";

const meta: Meta<typeof Meter> = {
  title: "Components/Meter",
  component: Meter,
  tags: ["autodocs"],
  args: {
    id: "data-usage",
    label: "Data usage",
    value: 50,
  },
};
export default meta;

type Story = StoryObj<typeof Meter>;

export const Default: Story = {};

export const WithValueLabel: Story = {
  args: {
    value: 5000,
    minValue: 0,
    maxValue: 10000,
    minLabel: "0",
    maxLabel: "10,000",
    valueLabel: "5,000 of 10,000",
  },
};

export const WithHelpText: Story = {
  args: {
    helpText: "Resets on the 1st of each month.",
  },
};

export const NonDefaultScale: Story = {
  name: "Non 0-100 scale with min/max labels",
  args: {
    value: 1259,
    minValue: 0,
    maxValue: 1500,
    minLabel: "$0",
    maxLabel: "$1,500",
    valueLabel: "$1,259 of $1,500",
    label: "Balance",
    helpText: "Complete balance due at the end of the billing cycle.",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};
