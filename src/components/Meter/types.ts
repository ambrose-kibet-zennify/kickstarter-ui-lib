import type { MeterProps as PasteMeterProps } from "@twilio-paste/core/meter";

export interface MeterProps extends Omit<
  PasteMeterProps,
  "element" | "aria-describedby" | "aria-label" | "aria-labelledby"
> {
  /**
   * The id of the Meter. Used to associate the label and help text with the Meter for accessibility.
   * @type {string}
   */
  id: string;
  label: string;
  /**
   * Optional help text to provide additional context for the Meter. Rendered visually via HelpText and synced into the Meter's accessible value text so sighted and screen reader users always get the same representation.
   * @type {string}
   */
  helpText?: string;
  /**
   * Custom value label (e.g. "5,000 of 10,000"). Rendered visually via MeterLabel and synced into the Meter's accessible value text so sighted and screen reader users always get the same representation. It falls back to an auto-computed percentage (Paste's default) when omitted.
   * @type {string}
   */
  valueLabel?: string;
}
