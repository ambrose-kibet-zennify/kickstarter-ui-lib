import { RadioGroup, Radio } from "@twilio-paste/core/radio-group";
import type { RadioGroupProps, RadioProps } from "@twilio-paste/core/radio-group";

export interface RadioOption extends Omit<
  RadioProps,
  "id" | "name" | "checked" | "hasError" | "children"
> {
  value: string;
  label: NonNullable<React.ReactNode>;
}

export interface RadioFieldProps extends Omit<
  RadioGroupProps,
  "legend" | "children"
> {
  label: string | NonNullable<React.ReactNode>;
  options: RadioOption[];
}

export const RadioField = ({
  name,
  label,
  options,
  ...rest
}: RadioFieldProps) => (
  <RadioGroup name={name} legend={label} {...rest}>
    {options.map(({ label: optionLabel, value, ...optionRest }) => (
      <Radio key={value} id={`${name}-${value}`} value={value} {...optionRest}>
        {optionLabel}
      </Radio>
    ))}
  </RadioGroup>
);

RadioField.displayName = "RadioField";
