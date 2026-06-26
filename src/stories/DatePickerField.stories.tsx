import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { DatePickerField } from "../components/DatePickerField";

const meta: Meta<typeof DatePickerField> = {
  title: "Components/DatePickerField",
  component: DatePickerField,
  tags: ["autodocs"],
  args: {
    id: "date-field",
    label: "Date",
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof DatePickerField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Select a date.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Please select a valid date.",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Optional: Story = {
  args: {
    labelOptional: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "2025-06-15",
  },
};

export const WithMinMax: Story = {
  args: {
    min: "2025-01-01",
    max: "2025-12-31",
    helpText: "Only dates within 2025 are selectable.",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    helpText: "Used on dark backgrounds within a light theme.",
  },
  parameters: {
    pasteTheme: "default",
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "#1a1a2e", padding: "2rem", borderRadius: 8 }}
      >
        <Story />
      </div>
    ),
  ],
};

export const PickDate: Story = {
  name: "Interaction: pick a date",
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <DatePickerField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    id: "interaction-date",
    label: "Start date",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/start date/i);
    await userEvent.fill(input, "2025-06-15");
    await expect(input).toHaveValue("2025-06-15");
  },
};
