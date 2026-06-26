import React from "react";
import { DatePicker } from "@twilio-paste/core/date-picker";
import type { DatePickerProps } from "@twilio-paste/core/date-picker";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { Box } from "@twilio-paste/core/box";

export { formatReturnDate } from "@twilio-paste/core/date-picker";

export interface DatePickerFieldProps
  extends Omit<DatePickerProps, "hasError" | "element" | "id"> {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
  labelOptional?: boolean;
}

export const DatePickerField = React.forwardRef<
  HTMLInputElement,
  DatePickerFieldProps
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
        <DatePicker
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

DatePickerField.displayName = "DatePickerField";
