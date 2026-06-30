import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "storybook/test";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { Text } from "@twilio-paste/core/text";
import { KeyboardKeys, useKeyCombination, useKeyCombinations } from "./KeyboardKeys";

const meta: Meta<typeof KeyboardKeys> = {
  title: "Components/KeyboardKeys",
  component: KeyboardKeys,
  tags: ["autodocs"],
  args: {
    keys: ["Command", "K"],
  },
};
export default meta;

type Story = StoryObj<typeof KeyboardKeys>;

export const Default: Story = {};

export const MultiKey: Story = {
  args: {
    keys: ["Ctrl", "Shift", "S"],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
  },
  decorators: [
    (Story) => (
      <Box backgroundColor="colorBackgroundBodyInverse" padding="space60">
        <Story />
      </Box>
    ),
  ],
};

export const WithPressStyles: Story = {
  name: "With press styles (useKeyCombination)",
  render: (args) => {
    const { activeKeys, enablePressStyles } = useKeyCombination({
      keys: ["Meta", "k"],
      onCombinationPress: () => {},
      enablePressStyles: true,
    });
    return (
      <KeyboardKeys
        {...args}
        keys={["Command", "K"]}
        activeKeys={activeKeys}
        enablePressStyles={enablePressStyles}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const keys = canvas.getAllByRole("term");
    await expect(keys).toHaveLength(2);
    await userEvent.keyboard("{Meta>}k{/Meta}");
  },
};

export const ShortcutReference: Story = {
  name: "Shortcut reference (useKeyCombinations)",
  render: (args) => {
    const [lastAction, setLastAction] = useState<string | null>(null);
    const { activeKeys } = useKeyCombinations({
      combinations: [
        { keys: ["Meta", "k"], onCombinationPress: () => setLastAction("Open search") },
        { keys: ["Meta", "s"], onCombinationPress: () => setLastAction("Save") },
        { keys: ["Meta", "z"], onCombinationPress: () => setLastAction("Undo") },
      ],
    });

    const shortcuts = [
      { label: "Open search", keys: ["Command", "K"] },
      { label: "Save", keys: ["Command", "S"] },
      { label: "Undo", keys: ["Command", "Z"] },
    ];

    return (
      <Box maxWidth="size40">
        <Stack orientation="vertical" spacing="space40">
          {shortcuts.map(({ label, keys }) => (
            <Box
              key={label}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text as="span" fontSize="fontSize30">
                {label}
              </Text>
              <KeyboardKeys {...args} keys={keys} activeKeys={activeKeys} />
            </Box>
          ))}
          {lastAction && (
            <Text as="p" fontSize="fontSize20" color="colorTextWeak">
              Last triggered: {lastAction}
            </Text>
          )}
        </Stack>
      </Box>
    );
  },
};
