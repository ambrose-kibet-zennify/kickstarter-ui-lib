import { KeyboardKey, KeyboardKeyGroup } from "@twilio-paste/core/keyboard-key";
import type { KeyboardKeysProps } from "./types";

export {
  useKeyCombination,
  useKeyCombinations,
} from "@twilio-paste/core/keyboard-key";

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
