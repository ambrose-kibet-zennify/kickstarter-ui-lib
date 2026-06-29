import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { Text } from "@twilio-paste/core/text";
import { TextareaField } from "./TextAreaField";

const meta: Meta<typeof TextareaField> = {
  title: "Components/TextAreaField",
  component: TextareaField,
  tags: ["autodocs"],
  args: {
    id: "textarea-field",
    label: "Label",
    placeholder: "Enter text…",
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "This is some helpful context.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "This field is required.",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Optional: Story = {
  args: {
    labelOptional: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Cannot edit this",
    placeholder: undefined,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "Read-only value",
    placeholder: undefined,
  },
};

export const WithVerticalResize: Story = {
  args: {
    resize: "vertical",
    helpText: "Drag the bottom-right corner to resize.",
  },
};

export const AutoGrow: Story = {
  args: {
    minRows: 2,
    maxRows: 8,
    helpText: "Grows automatically up to 8 rows as you type.",
    placeholder: "Start typing to see auto-grow…",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    helpText: "Used on dark backgrounds within a light theme.",
  },
  parameters: {
    pasteTheme: "default",
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "#1a1a2e", padding: "2rem", borderRadius: 8 }}
      >
        <Story />
      </div>
    ),
  ],
};

export const TypeInteraction: Story = {
  name: "Interaction: typing",
  args: {
    id: "interaction-textarea",
    label: "Notes",
    placeholder: "Type here…",
    minRows: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: /notes/i });
    await userEvent.click(textarea);
    await userEvent.type(textarea, "Line one{enter}Line two");
    await expect(textarea).toHaveValue("Line one\nLine two");
  },
};

export const ReadOnlyInverse: Story = {
  name: "Read-only (inverse)",
  args: {
    readOnly: true,
    value: "Read-only value",
    placeholder: undefined,
    variant: "inverse",
  },
  parameters: {
    pasteTheme: "default",
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "#1a1a2e", padding: "2rem", borderRadius: 8 }}
      >
        <Story />
      </div>
    ),
  ],
};

export const WithPrefix: Story = {
  render: (args) => (
    <TextareaField
      {...args}
      insertBefore={
        <Text as="span" color="colorTextWeak" fontSize="fontSize30">
          //
        </Text>
      }
    />
  ),
  args: {
    id: "code-textarea",
    label: "Code snippet",
    placeholder: "Paste your code here…",
  },
};

export const WithSuffix: Story = {
  render: (args) => (
    <TextareaField
      {...args}
      insertAfter={
        <Text as="span" color="colorTextWeak" fontSize="fontSize30">
          chars
        </Text>
      }
    />
  ),
  args: {
    id: "notes-suffix-textarea",
    label: "Notes",
    placeholder: "Enter notes…",
    helpText: "Character count shown on the right.",
  },
};

export const ErrorInverse: Story = {
  name: "Error (inverse)",
  args: {
    errorText: "This field is required.",
    variant: "inverse",
  },
  parameters: {
    pasteTheme: "default",
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "#1a1a2e", padding: "2rem", borderRadius: 8 }}
      >
        <Story />
      </div>
    ),
  ],
};
