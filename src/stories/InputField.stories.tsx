import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { Text } from "@twilio-paste/text";
import { InputField } from "../components/input";
import type { InputBoxTypes } from "@twilio-paste/input-box";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    id: "input-field",
    label: "Label",
    placeholder: "Enter text…",
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

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

export const NumberType: Story = {
  name: "Type: number",
  args: {
    id: "age-field",
    label: "Age",
    type: "number" as InputBoxTypes,
    placeholder: "0",
  },
};

export const PasswordType: Story = {
  name: "Type: password",
  args: {
    id: "password-field",
    label: "Password",
    type: "password" as InputBoxTypes,
    placeholder: "••••••••",
  },
};

export const WithPrefix: Story = {
  render: (args) => (
    <InputField
      {...args}
      insertBefore={
        <Text as="span" color="colorTextWeak" fontSize="fontSize30">
          $
        </Text>
      }
    />
  ),
  args: {
    id: "amount-field",
    label: "Amount",
    type: "number" as InputBoxTypes,
    placeholder: "0.00",
  },
};

export const WithSuffix: Story = {
  render: (args) => (
    <InputField
      {...args}
      insertAfter={
        <Text as="span" color="colorTextWeak" fontSize="fontSize30">
          kg
        </Text>
      }
    />
  ),
  args: {
    id: "weight-field",
    label: "Weight",
    placeholder: "0",
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
    id: "interaction-input",
    label: "Search",
    placeholder: "Type here…",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /search/i });
    await userEvent.click(input);
    await userEvent.type(input, "Hello Storybook");
    await expect(input).toHaveValue("Hello Storybook");
  },
};
