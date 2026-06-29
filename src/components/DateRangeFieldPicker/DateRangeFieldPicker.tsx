import React from "react";
import { Stack } from "@twilio-paste/core/stack";
import { DateFieldPicker } from "../DateFieldPicker/DateFieldPicker";

export interface DateRangeFieldPickerProps {
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

export const DateRangeFieldPicker = ({
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
}: DateRangeFieldPickerProps) => (
  <Stack orientation={orientation} spacing="space70">
    <DateFieldPicker
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
    <DateFieldPicker
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

DateRangeFieldPicker.displayName = "DateRangeFieldPicker";
