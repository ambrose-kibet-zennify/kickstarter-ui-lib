import React, { type ReactNode } from "react";
import { Switch } from "@twilio-paste/core/switch";
import { HelpText } from "@twilio-paste/core/help-text";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface SwitchFieldProps extends Omit<
  HTMLPasteProps<"input">,
  "children"
> {
  id?: string;
  label: NonNullable<ReactNode>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  helpText?: string;
  errorText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  i18nRequiredLabel?: string;
}

export const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(
  ({ id, label, helpText, errorText, ...rest }, ref) => {
    const resolvedHelpText = errorText ? (
      <HelpText variant="error">{errorText}</HelpText>
    ) : (
      helpText
    );

    return (
      <Switch
        ref={ref}
        id={id}
        hasError={!!errorText}
        helpText={resolvedHelpText}
        {...rest}
      >
        {label}
      </Switch>
    );
  },
);

SwitchField.displayName = "SwitchField";
