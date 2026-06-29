import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { Text } from "@twilio-paste/core/text";
import { SelectField } from "./SelectField";
import type { SelectOption, SelectOptionGroup } from "./SelectField";

const DEFAULT_OPTIONS: Array<SelectOption | SelectOptionGroup> = [
  { value: "", label: "-- Select --" },
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
];

const meta: Meta<typeof SelectField> = {
  title: "Components/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  args: {
    id: "select-field",
    label: "Department",
    value: "",
    options: DEFAULT_OPTIONS,
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Select the department you belong to.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Please select a department.",
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
    value: "engineering",
  },
};

export const WithOptionGroups: Story = {
  args: {
    id: "country-select",
    label: "Country",
    value: "",
    helpText: "Options are grouped by region.",
    options: [
      { value: "", label: "-- Select --" },
      {
        label: "Americas",
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "mx", label: "Mexico" },
        ],
      },
      {
        label: "Europe",
        options: [
          { value: "uk", label: "United Kingdom" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
        ],
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    id: "teams-select",
    label: "Teams",
    multiple: true,
    value: ["design", "product"],
    helpText: "Hold Ctrl / Cmd to select multiple.",
    options: [
      { value: "design", label: "Design" },
      { value: "engineering", label: "Engineering" },
      { value: "product", label: "Product" },
      { value: "marketing", label: "Marketing" },
    ],
  },
};

export const WithPrefix: Story = {
  args: {
    id: "prefix-select",
    label: "Channel",
    insertBefore: (
      <Text as="span" color="colorTextWeak" fontSize="fontSize30">
        #
      </Text>
    ),
  },
};

export const WithSuffix: Story = {
  args: {
    id: "suffix-select",
    label: "Priority",
    insertAfter: (
      <Text as="span" color="colorTextWeak" fontSize="fontSize30">
        ▾
      </Text>
    ),
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

export const SelectInteraction: Story = {
  name: "Interaction: select option",
  args: {
    id: "interaction-select",
    label: "Country",
    defaultValue: "",
    options: [
      { value: "", label: "-- Select --" },
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /country/i });
    await userEvent.selectOptions(select, "us");
    await expect(select).toHaveValue("us");
  },
};
