import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "storybook/test";
import { DateRangePickerField } from "../components/DateRangePickerField";

const meta: Meta<typeof DateRangePickerField> = {
  title: "Components/DateRangePickerField",
  component: DateRangePickerField,
  tags: ["autodocs"],
  args: {
    startId: "range-start",
    endId: "range-end",
  },
};
export default meta;

type Story = StoryObj<typeof DateRangePickerField>;

export const Default: Story = {};

export const WithValues: Story = {
  args: {
    startValue: "2025-06-01",
    endValue: "2025-06-15",
  },
};

export const WithErrors: Story = {
  args: {
    startErrorText: "Start date is required.",
    endErrorText: "End date is required.",
  },
};

export const WithHelpText: Story = {
  args: {
    helpText: "Select the start and end dates for your report.",
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    startValue: "2025-06-01",
    endValue: "2025-06-15",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    startValue: "2025-06-01",
    endValue: "2025-06-15",
  },
};

export const WithMinMax: Story = {
  args: {
    min: "2025-01-01",
    max: "2025-12-31",
    helpText: "Only dates within 2025 are selectable.",
  },
};

export const RangeSelection: Story = {
  name: "Interaction: range selection",
  render: (args) => {
    const [startValue, setStartValue] = React.useState("");
    const [endValue, setEndValue] = React.useState("");
    return (
      <DateRangePickerField
        {...args}
        startValue={startValue}
        endValue={endValue}
        onStartChange={(e) => setStartValue(e.target.value)}
        onEndChange={(e) => setEndValue(e.target.value)}
      />
    );
  },
  args: {
    startId: "interaction-start",
    endId: "interaction-end",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const startInput = canvas.getByLabelText(/start date/i);
    const endInput = canvas.getByLabelText(/end date/i);

    await userEvent.fill(startInput, "2025-06-01");
    await expect(startInput).toHaveValue("2025-06-01");
    // end picker min is now wired to startValue — cannot pick before June 1
    await expect(endInput).toHaveAttribute("min", "2025-06-01");

    await userEvent.fill(endInput, "2025-06-15");
    await expect(endInput).toHaveValue("2025-06-15");
  },
};
