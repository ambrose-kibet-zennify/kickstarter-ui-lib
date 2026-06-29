import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { SwitchField } from "./SwitchField";

const meta: Meta<typeof SwitchField> = {
  title: "Components/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
  args: {
    id: "switch-field",
    label: "Enable notifications",
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof SwitchField>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const DefaultChecked: Story = {
  name: "Default checked (uncontrolled)",
  args: {
    defaultChecked: true,
  },
};

export const WithHelpText: Story = {
  args: {
    helpText: "You'll receive email and push notifications.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "You must accept the terms to continue.",
    label: "Accept terms",
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: "Accept terms",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  name: "Disabled (checked)",
  args: {
    disabled: true,
    checked: true,
  },
};

export const ToggleInteraction: Story = {
  name: "Interaction: toggle",
  args: {
    id: "interaction-switch",
    label: "Dark mode",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: /dark mode/i });
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
  },
};
