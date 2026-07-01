import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUploaderField } from "./FileUploaderField";
import type { FileUploaderFieldFile } from "./types";

const meta: Meta<typeof FileUploaderField> = {
  title: "Components/FileUploaderField",
  component: FileUploaderField,
  tags: ["autodocs"],
  args: {
    id: "attachments",
    name: "attachments",
    label: "Attachments",
  },
};
export default meta;

type Story = StoryObj<typeof FileUploaderField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Supported formats: PDF, JPG, PNG. Max 50 MB per file.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "File upload failed. Please try again.",
  },
};

export const Optional: Story = {
  args: {
    labelOptional: true,
  },
};

export const WithFiles: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "contract.pdf",
        description: "2.4 MB",
        variant: "default",
      },
      {
        id: "2",
        name: "logo.png",
        description: "Uploading…",
        variant: "loading",
      },
      {
        id: "3",
        name: "broken.csv",
        description: "Upload failed",
        variant: "error",
      },
    ],
  },
};

export const AcceptImages: Story = {
  args: {
    acceptedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    helpText: "Images only: JPG, PNG, GIF, WebP.",
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    helpText: "You can select multiple files at once.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    files: [
      {
        id: "1",
        name: "report.pdf",
        description: "1.1 MB",
        variant: "default",
      },
    ],
  },
};

export const Required: Story = {
  args: { required: true },
};

export const ErrorWithFiles: Story = {
  args: {
    errorText:
      "One or more files failed validation. Please review and re-upload.",
    files: [
      {
        id: "1",
        name: "contract.pdf",
        description: "2.4 MB",
        variant: "default",
      },
      {
        id: "2",
        name: "too-large.zip",
        description: "File exceeds 50 MB limit",
        variant: "error",
      },
    ],
  },
};

export const UploadInProgress: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "report.pdf",
        description: "Uploading… 45%",
        variant: "loading",
      },
      {
        id: "2",
        name: "photo.jpg",
        description: "Uploading… 12%",
        variant: "loading",
      },
      { id: "3", name: "data.csv", description: "1.1 MB", variant: "default" },
    ],
  },
};

export const WithHelpAndFiles: Story = {
  args: {
    helpText: "Supported formats: PDF, JPG, PNG. Max 50 MB per file.",
    files: [
      {
        id: "1",
        name: "invoice.pdf",
        description: "3.2 MB",
        variant: "default",
      },
      {
        id: "2",
        name: "receipt.jpg",
        description: "890 KB",
        variant: "default",
      },
    ],
  },
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

function ControlledWithValidationRender(
  args: React.ComponentProps<typeof FileUploaderField>,
) {
  const [files, setFiles] = React.useState<FileUploaderFieldFile[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const next: FileUploaderFieldFile[] = selected.map((f) => {
      const valid = ACCEPTED_IMAGE_TYPES.includes(f.type);
      return {
        id: `${f.name}-${f.size}`,
        name: f.name,
        description: valid
          ? `${(f.size / 1024).toFixed(1)} KB`
          : "Invalid file type",
        variant: valid ? "default" : "error",
      };
    });
    setFiles((prev) => [...prev, ...next]);
  };

  const handleRemove = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const hasError = files.some((f) => f.variant === "error");

  return (
    <FileUploaderField
      {...args}
      acceptedMimeTypes={ACCEPTED_IMAGE_TYPES}
      files={files}
      errorText={
        hasError
          ? "Some files are not valid images. Remove them to continue."
          : undefined
      }
      onInputChange={handleInputChange}
      onRemove={handleRemove}
    />
  );
}

export const ControlledWithValidation: Story = {
  name: "Interaction: upload with validation",
  render: (args) => <ControlledWithValidationRender {...args} />,
  args: {
    multiple: true,
    helpText: "Images only: JPG, PNG, GIF, WebP.",
  },
};

function ControlledRender(
  args: React.ComponentProps<typeof FileUploaderField>,
) {
  const [files, setFiles] = React.useState<FileUploaderFieldFile[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const next: FileUploaderFieldFile[] = selected.map((f) => ({
      id: `${f.name}-${f.size}`,
      name: f.name,
      description: `${(f.size / 1024).toFixed(1)} KB`,
      variant: "default",
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const handleRemove = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <FileUploaderField
      {...args}
      files={files}
      onInputChange={handleInputChange}
      onRemove={handleRemove}
    />
  );
}

export const Controlled: Story = {
  name: "Interaction: controlled file list",
  render: (args) => <ControlledRender {...args} />,
  args: {
    multiple: true,
    helpText: "Select files to see them listed below.",
  },
};
