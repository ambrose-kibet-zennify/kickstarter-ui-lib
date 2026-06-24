import React from "react";
import { TextArea } from "@twilio-paste/textarea";
import { Label } from "@twilio-paste/label";
import { HelpText } from "@twilio-paste/help-text";
import { Box } from "@twilio-paste/box";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface TextareaFieldProps extends Omit<
  HTMLPasteProps<"textarea">,
  "maxRows"
> {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  labelOptional?: boolean;
  insertBefore?: React.ReactNode;
  insertAfter?: React.ReactNode;
  variant?: "default" | "inverse";
  minRows?: number;
  maxRows?: number;
  resize?: "none" | "vertical";
}

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(
  (
    {
      id,
      label,
      helpText,
      errorText,
      required,
      disabled,
      readOnly,
      labelOptional,
      insertBefore,
      insertAfter,
      variant,
      minRows,
      maxRows,
      resize,
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
        <TextArea
          ref={ref}
          id={id}
          hasError={!!errorText}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          variant={variant}
          minRows={minRows}
          maxRows={maxRows}
          resize={resize}
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

TextareaField.displayName = "TextareaField";
