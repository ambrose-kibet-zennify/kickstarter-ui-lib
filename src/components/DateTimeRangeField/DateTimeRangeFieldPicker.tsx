import React from "react";
import { Stack } from "@twilio-paste/core/stack";
import { DateFieldPicker } from "../DateFieldPicker/DateFieldPicker";
import { TimeFieldPicker } from "../TimeFieldPicker/TimeFieldPicker";

export interface DateTimeRangePickerFieldProps {
  startDateId: string;
  startTimeId: string;
  endDateId: string;
  endTimeId: string;
  startDateLabel?: string;
  startTimeLabel?: string;
  endDateLabel?: string;
  endTimeLabel?: string;
  startDateValue?: string;
  startTimeValue?: string;
  endDateValue?: string;
  endTimeValue?: string;
  onStartDateChange?: React.ChangeEventHandler<HTMLInputElement>;
  onStartTimeChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEndDateChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEndTimeChange?: React.ChangeEventHandler<HTMLInputElement>;
  startDateErrorText?: string;
  startTimeErrorText?: string;
  endDateErrorText?: string;
  endTimeErrorText?: string;
  helpText?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
}

export const DateTimeRangePickerField = ({
  startDateId,
  startTimeId,
  endDateId,
  endTimeId,
  startDateLabel = "Start date",
  startTimeLabel = "Start time",
  endDateLabel = "End date",
  endTimeLabel = "End time",
  startDateValue,
  startTimeValue,
  endDateValue,
  endTimeValue,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  startDateErrorText,
  startTimeErrorText,
  endDateErrorText,
  endTimeErrorText,
  helpText,
  min,
  max,
  required,
  disabled,
}: DateTimeRangePickerFieldProps) => (
  <Stack orientation="vertical" spacing="space70">
    <Stack orientation="horizontal" spacing="space70">
      <DateFieldPicker
        id={startDateId}
        label={startDateLabel}
        value={startDateValue}
        onChange={onStartDateChange}
        errorText={startDateErrorText}
        min={min}
        max={endDateValue || max}
        disabled={disabled}
        required={required}
      />
      <TimeFieldPicker
        id={startTimeId}
        label={startTimeLabel}
        value={startTimeValue}
        onChange={onStartTimeChange}
        errorText={startTimeErrorText}
        disabled={disabled}
        required={required}
      />
    </Stack>
    <Stack orientation="horizontal" spacing="space70">
      <DateFieldPicker
        id={endDateId}
        label={endDateLabel}
        value={endDateValue}
        onChange={onEndDateChange}
        errorText={endDateErrorText}
        min={startDateValue || min}
        max={max}
        disabled={disabled}
        required={required}
      />
      <TimeFieldPicker
        id={endTimeId}
        label={endTimeLabel}
        value={endTimeValue}
        onChange={onEndTimeChange}
        errorText={endTimeErrorText}
        helpText={helpText}
        disabled={disabled}
        required={required}
      />
    </Stack>
  </Stack>
);

DateTimeRangePickerField.displayName = "DateTimeRangePickerField";
