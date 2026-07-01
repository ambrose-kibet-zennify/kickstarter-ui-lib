import { Meter as PasteMeter, MeterLabel } from "@twilio-paste/core/meter";
import type { MeterProps as PasteMeterProps } from "@twilio-paste/core/meter";
import { HelpText } from "@twilio-paste/core/help-text";
import type { MeterProps } from "./types";
import { Box } from "@twilio-paste/core/box";

const MeterWithValueLabel = PasteMeter as React.ComponentType<
  PasteMeterProps & { valueLabel?: string }
>;

export const Meter = ({
  id,
  label,
  helpText,
  valueLabel,
  minValue = 0,
  maxValue = 100,
  minLabel,
  maxLabel,
  ...rest
}: MeterProps) => {
  const descriptionId = helpText ? `${id}-help` : undefined;

  return (
    <Box>
      <MeterLabel htmlFor={id} valueLabel={valueLabel}>
        {label}
      </MeterLabel>
      <MeterWithValueLabel
        id={id}
        minValue={minValue}
        maxValue={maxValue}
        minLabel={minLabel}
        maxLabel={maxLabel}
        valueLabel={valueLabel}
        aria-describedby={descriptionId}
        {...rest}
      />
      {helpText && <HelpText id={descriptionId}>{helpText}</HelpText>}
    </Box>
  );
};

Meter.displayName = "Meter";
