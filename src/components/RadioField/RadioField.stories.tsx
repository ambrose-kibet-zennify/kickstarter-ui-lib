import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { RadioField } from "./RadioField";
import type { RadioOption } from "./RadioField";

const ROLE_OPTIONS: RadioOption[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const meta: Meta<typeof RadioField> = {
  title: "Components/RadioField",
  component: RadioField,
  tags: ["autodocs"],
  args: {
    name: "role",
    label: "Role",
    options: ROLE_OPTIONS,
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof RadioField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Select the role that best describes your access level.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Please select a role to continue.",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "viewer",
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      { value: "admin", label: "Admin" },
      { value: "editor", label: "Editor", disabled: true },
      { value: "viewer", label: "Viewer" },
    ],
    helpText: "Editor is currently unavailable.",
  },
};

export const WithOptionHelpText: Story = {
  args: {
    options: [
      {
        value: "admin",
        label: "Admin",
        helpText: "Full access to all resources.",
      },
      {
        value: "editor",
        label: "Editor",
        helpText: "Can create and edit content.",
      },
      { value: "viewer", label: "Viewer", helpText: "Read-only access." },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const SelectInteraction: Story = {
  name: "Interaction: select option",
  render: (args) => {
    const [value, setValue] = React.useState("");
    return <RadioField {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: "interaction-role",
    label: "Role",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editorRadio = canvas.getByRole("radio", { name: /editor/i });
    await expect(editorRadio).not.toBeChecked();
    await userEvent.click(editorRadio);
    await expect(editorRadio).toBeChecked();
  },
};
