import React from "react";
import { Stack } from "@twilio-paste/core/stack";
import { DatePickerField } from "./DatePickerField";

export interface DateRangePickerFieldProps {
  orientation?: "horizontal" | "vertical";
  startId: string;
  endId: string;
  startLabel?: string;
  endLabel?: string;
  startValue?: string;
  endValue?: string;
  onStartChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEndChange?: React.ChangeEventHandler<HTMLInputElement>;
  startErrorText?: string;
  endErrorText?: string;
  helpText?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
}

export const DateRangePickerField = ({
  orientation = "vertical",
  startId,
  endId,
  startLabel = "Start date",
  endLabel = "End date",
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  startErrorText,
  endErrorText,
  helpText,
  min,
  max,
  required,
  disabled,
}: DateRangePickerFieldProps) => (
  <Stack orientation={orientation} spacing="space70">
    <DatePickerField
      id={startId}
      label={startLabel}
      value={startValue}
      onChange={onStartChange}
      errorText={startErrorText}
      min={min}
      max={endValue || max}
      disabled={disabled}
      required={required}
    />
    <DatePickerField
      id={endId}
      label={endLabel}
      value={endValue}
      onChange={onEndChange}
      errorText={endErrorText}
      helpText={helpText}
      min={startValue || min}
      max={max}
      disabled={disabled}
      required={required}
    />
  </Stack>
);

DateRangePickerField.displayName = "DateRangePickerField";
