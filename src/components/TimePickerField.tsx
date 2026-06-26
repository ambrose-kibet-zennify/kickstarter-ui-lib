import React from "react";
import { TimePicker } from "@twilio-paste/core/time-picker";
import type { TimePickerProps } from "@twilio-paste/core/time-picker";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { Box } from "@twilio-paste/core/box";

export { formatReturnTime } from "@twilio-paste/core/time-picker";

export interface TimePickerFieldProps
  extends Omit<TimePickerProps, "hasError" | "element" | "id"> {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
  labelOptional?: boolean;
}

export const TimePickerField = React.forwardRef<
  HTMLInputElement,
  TimePickerFieldProps
>(
  (
    { id, label, helpText, errorText, labelOptional, disabled, required, variant, ...rest },
    ref,
  ) => {
    const descriptionId = helpText || errorText ? `${id}-help` : undefined;

    return (
      <Box>
        <Label
          htmlFor={id}
          required={required}
          optional={labelOptional}
          disabled={disabled}
          variant={variant}
        >
          {label}
        </Label>
        <TimePicker
          ref={ref}
          id={id}
          hasError={!!errorText}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          disabled={disabled}
          required={required}
          variant={variant}
          {...rest}
        />
        {(helpText || errorText) && (
          <HelpText id={descriptionId} variant={errorText ? "error" : "default"}>
            {errorText ?? helpText}
          </HelpText>
        )}
      </Box>
    );
  },
);

TimePickerField.displayName = "TimePickerField";
