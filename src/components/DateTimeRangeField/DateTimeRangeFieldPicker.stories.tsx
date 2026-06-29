import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "storybook/test";
import { DateTimeRangePickerField } from "./DateTimeRangeFieldPicker";

const meta: Meta<typeof DateTimeRangePickerField> = {
  title: "Components/DateTimeRangeFieldPicker",
  component: DateTimeRangePickerField,
  tags: ["autodocs"],
  args: {
    startDateId: "start-date",
    startTimeId: "start-time",
    endDateId: "end-date",
    endTimeId: "end-time",
  },
};
export default meta;

type Story = StoryObj<typeof DateTimeRangePickerField>;

export const Default: Story = {};

export const WithValues: Story = {
  args: {
    startDateValue: "2025-06-01",
    startTimeValue: "09:00",
    endDateValue: "2025-06-15",
    endTimeValue: "17:00",
  },
};

export const WithErrors: Story = {
  args: {
    startDateErrorText: "Start date is required.",
    startTimeErrorText: "Start time is required.",
    endDateErrorText: "End date is required.",
    endTimeErrorText: "End time is required.",
  },
};

export const WithHelpText: Story = {
  args: {
    helpText: "Select the start and end date-time for your booking.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    startDateValue: "2025-06-01",
    startTimeValue: "09:00",
    endDateValue: "2025-06-15",
    endTimeValue: "17:00",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const FillDateTimeRange: Story = {
  name: "Interaction: fill datetime range",
  render: (args) => {
    const [startDateValue, setStartDateValue] = React.useState("");
    const [startTimeValue, setStartTimeValue] = React.useState("");
    const [endDateValue, setEndDateValue] = React.useState("");
    const [endTimeValue, setEndTimeValue] = React.useState("");
    return (
      <DateTimeRangePickerField
        {...args}
        startDateValue={startDateValue}
        startTimeValue={startTimeValue}
        endDateValue={endDateValue}
        endTimeValue={endTimeValue}
        onStartDateChange={(e) => setStartDateValue(e.target.value)}
        onStartTimeChange={(e) => setStartTimeValue(e.target.value)}
        onEndDateChange={(e) => setEndDateValue(e.target.value)}
        onEndTimeChange={(e) => setEndTimeValue(e.target.value)}
      />
    );
  },
  args: {
    startDateId: "interaction-start-date",
    startTimeId: "interaction-start-time",
    endDateId: "interaction-end-date",
    endTimeId: "interaction-end-time",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.fill(canvas.getByLabelText(/start date/i), "2025-06-01");
    await userEvent.fill(canvas.getByLabelText(/start time/i), "09:00");
    await userEvent.fill(canvas.getByLabelText(/end date/i), "2025-06-15");
    await userEvent.fill(canvas.getByLabelText(/end time/i), "17:00");
    await expect(canvas.getByLabelText(/start date/i)).toHaveValue("2025-06-01");
    await expect(canvas.getByLabelText(/start time/i)).toHaveValue("09:00");
    await expect(canvas.getByLabelText(/end date/i)).toHaveValue("2025-06-15");
    await expect(canvas.getByLabelText(/end time/i)).toHaveValue("17:00");
  },
};
