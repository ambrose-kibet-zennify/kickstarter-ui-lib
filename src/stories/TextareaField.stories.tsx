import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from 'storybook/test';
import { TextareaField } from '../components/textarea';

const meta: Meta<typeof TextareaField> = {
  title: 'Components/TextareaField',
  component: TextareaField,
  tags: ['autodocs'],
  args: {
    id: 'textarea-field',
    label: 'Label',
    placeholder: 'Enter text…',
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: 'This is some helpful context.',
  },
};

export const WithError: Story = {
  args: {
    errorText: 'This field is required.',
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
    value: 'Cannot edit this',
    placeholder: undefined,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'Read-only value',
    placeholder: undefined,
  },
};

export const WithVerticalResize: Story = {
  args: {
    resize: 'vertical',
    helpText: 'Drag the bottom-right corner to resize.',
  },
};

export const AutoGrow: Story = {
  args: {
    minRows: 2,
    maxRows: 8,
    helpText: 'Grows automatically up to 8 rows as you type.',
    placeholder: 'Start typing to see auto-grow…',
  },
};

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    helpText: 'Used on dark backgrounds within a light theme.',
  },
  parameters: {
    pasteTheme: 'default',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a2e', padding: '2rem', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const TypeInteraction: Story = {
  name: 'Interaction: typing',
  args: {
    id: 'interaction-textarea',
    label: 'Notes',
    placeholder: 'Type here…',
    minRows: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', { name: /notes/i });
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Line one{enter}Line two');
    await expect(textarea).toHaveValue('Line one\nLine two');
  },
};
