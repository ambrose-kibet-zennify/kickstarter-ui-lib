import { KeyboardKey, KeyboardKeyGroup } from "@twilio-paste/core/keyboard-key";
import type { KeyboardKeyGroupProps } from "@twilio-paste/core/keyboard-key";

export { useKeyCombination, useKeyCombinations } from "@twilio-paste/core/keyboard-key";

export interface KeyboardKeysProps extends Omit<KeyboardKeyGroupProps, "children"> {
  keys: string[];
}

export const KeyboardKeys = ({ keys, ...rest }: KeyboardKeysProps) => (
  <KeyboardKeyGroup {...rest}>
    {keys.map((k) => (
      <KeyboardKey key={k} keyEvent={k}>
        {k}
      </KeyboardKey>
    ))}
  </KeyboardKeyGroup>
);

KeyboardKeys.displayName = "KeyboardKeys";
