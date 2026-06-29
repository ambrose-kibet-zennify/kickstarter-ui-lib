import React from "react";
import { Select, Option, OptionGroup } from "@twilio-paste/core/select";
import type { OptionProps, OptionGroupProps } from "@twilio-paste/core/select";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { Box } from "@twilio-paste/core/box";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface SelectOption extends Omit<
  OptionProps,
  "children" | "element"
> {
  label: string;
}

export interface SelectOptionGroup extends Omit<
  OptionGroupProps,
  "children" | "element"
> {
  options: SelectOption[];
}

export interface SelectFieldProps extends Omit<
  HTMLPasteProps<"select">,
  "children"
> {
  id: string;
  label: string;
  options: Array<SelectOption | SelectOptionGroup>;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  value?: string | string[];
  disabled?: boolean;
  labelOptional?: boolean;
  insertBefore?: React.ReactNode;
  insertAfter?: React.ReactNode;
  variant?: "default" | "inverse";
}

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(
  (
    {
      id,
      label,
      options,
      helpText,
      errorText,
      labelOptional,
      insertBefore,
      insertAfter,
      variant,
      required,
      disabled,
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
        <Select
          ref={ref}
          id={id}
          hasError={!!errorText}
          aria-describedby={descriptionId}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
          disabled={disabled}
          required={required}
          variant={variant}
          {...rest}
        >
          {options.map((item) => {
            if ("options" in item) {
              const { options: groupOptions, ...groupRest } = item;
              return (
                <OptionGroup key={groupRest.label} {...groupRest}>
                  {groupOptions.map(({ label: optLabel, ...optRest }) => (
                    <Option key={optRest.value} {...optRest}>
                      {optLabel}
                    </Option>
                  ))}
                </OptionGroup>
              );
            }
            const { label: optLabel, ...optRest } = item;
            return (
              <Option key={optRest.value} {...optRest}>
                {optLabel}
              </Option>
            );
          })}
        </Select>
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

SelectField.displayName = "SelectField";
