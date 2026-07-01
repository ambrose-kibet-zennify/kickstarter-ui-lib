import type { KeyboardKeyGroupProps } from "@twilio-paste/core/keyboard-key";

export interface KeyboardKeysProps extends Omit<
  KeyboardKeyGroupProps,
  "children"
> {
  /**
   * An array of strings representing the keys to be displayed in the keyboard key group. Each string should correspond to a key on the keyboard (e.g., "Enter", "Shift", "Control").
   * @type {string[]}
   */
  keys: string[];
}
