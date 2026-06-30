import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { EditableCodeBlockField } from "./EditableCodeBlockField";

const TS_SNIPPET = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

const meta: Meta<typeof EditableCodeBlockField> = {
  title: "Components/EditableCodeBlockField",
  component: EditableCodeBlockField,
  tags: ["autodocs"],
  args: {
    label: "Script",
    defaultLanguage: "typescript",
    defaultValue: TS_SNIPPET,
    height: "30vh",
  },
};
export default meta;

type Story = StoryObj<typeof EditableCodeBlockField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Write valid TypeScript. Errors will be highlighted inline.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Syntax error on line 3.",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    helpText: "This code is read-only.",
  },
};

export const WithInlineError: Story = {
  args: {
    inlineErrorRange: {
      startLineNumber: 1,
      startColumn: 10,
      endLineNumber: 1,
      endColumn: 15,
    },
    inlineErrorHoverMessage: { value: "Unexpected token" },
    inlineErrorIsWholeLine: false,
  },
};

export const WithComments: Story = {
  args: {
    defaultValue: `// Calculate the nth Fibonacci number
function fibonacci(n: number): number {
  // Base cases: fib(0) = 0, fib(1) = 1
  if (n <= 1) return n;

  /* Iterative approach — avoids call-stack overflow
     that a naive recursive version would hit for large n */
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`,
  },
};

export const NoLineNumbers: Story = {
  args: {
    lineNumbers: "off",
  },
};

export const TrackChanges: Story = {
  name: "Interaction: track changes",
  render: (args) => {
    const [value, setValue] = useState(TS_SNIPPET);
    return (
      <EditableCodeBlockField
        {...args}
        defaultValue={value}
        onChange={(v) => setValue(v ?? "")}
        helpText={`${value.split("\n").length} lines`}
      />
    );
  },
  play: async () => {
    await expect(
      document.querySelector(
        "[data-paste-element='EDITABLE_CODE_BLOCK_WRAPPER']",
      ),
    ).toBeInTheDocument();
  },
};
