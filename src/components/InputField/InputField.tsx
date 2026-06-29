import React from "react";
import { Input } from "@twilio-paste/core/input";
import type { InputBoxTypes } from "@twilio-paste/core/input-box";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { Box } from "@twilio-paste/core/box";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface InputFieldProps extends Omit<
  HTMLPasteProps<"input">,
  "type" | "height" | "width" | "size" | "value" | "defaultValue"
> {
  id?: string;
  label: string;
  type?: InputBoxTypes;
  value?: string | number;
  defaultValue?: string | number;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  labelOptional?: boolean;
  insertBefore?: React.ReactNode;
  insertAfter?: React.ReactNode;
  variant?: "default" | "inverse";
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      value,
      defaultValue,
      helpText,
      errorText,
      required,
      disabled,
      readOnly,
      labelOptional,
      insertBefore,
      insertAfter,
      variant,
      ...rest
    },
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
        <Input
          ref={ref}
          id={id}
          type={type}
          value={value !== undefined ? String(value) : undefined}
          defaultValue={
            defaultValue !== undefined ? String(defaultValue) : undefined
          }
          hasError={!!errorText}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          variant={variant}
          {...rest}
        />
        {(helpText || errorText) && (
          <HelpText
            id={descriptionId}
            variant={errorText ? "error" : "default"}
          >
            {errorText ?? helpText}
          </HelpText>
        )}
      </Box>
    );
  },
);

InputField.displayName = "InputField";
