import React from "react";
import {
  FileUploader,
  FileUploaderLabel,
  FileUploaderHelpText,
  FileUploaderDropzone,
  FileUploaderDropzoneText,
  FileUploaderItem,
  FileUploaderItemsList,
  FileUploaderItemTitle,
  FileUploaderItemDescription,
  FileUploaderErrorText,
} from "@twilio-paste/core/file-uploader";
import type { FileUploaderFieldProps } from "./types";

// FileUploaderLabel forwards its props to Paste's Label (which supports `optional`),
// but its published type doesn't declare that pass-through.
const OptionalFileUploaderLabel = FileUploaderLabel as React.ComponentType<
  React.ComponentProps<typeof FileUploaderLabel> & { optional?: boolean }
>;

export const FileUploaderField = React.forwardRef<
  HTMLInputElement,
  FileUploaderFieldProps
>(
  (
    {
      id,
      name,
      label,
      helpText,
      errorText,
      labelOptional,
      required,
      disabled,
      acceptedMimeTypes = [],
      dropzoneText = "Browse files or drag them here",
      onInputChange,
      files,
      onRemove,
      ...rest
    },
    ref,
  ) => (
    <FileUploader id={id} name={name} disabled={disabled} required={required}>
      <OptionalFileUploaderLabel optional={labelOptional}>
        {label}
      </OptionalFileUploaderLabel>
      {helpText && <FileUploaderHelpText>{helpText}</FileUploaderHelpText>}
      <FileUploaderDropzone
        ref={ref}
        acceptedMimeTypes={acceptedMimeTypes}
        onInputChange={onInputChange}
        aria-invalid={!!errorText}
        {...rest}
      >
        <FileUploaderDropzoneText>{dropzoneText}</FileUploaderDropzoneText>
      </FileUploaderDropzone>
      {errorText && <FileUploaderErrorText>{errorText}</FileUploaderErrorText>}
      {files && files.length > 0 && (
        <FileUploaderItemsList>
          {files.map((file) => (
            <FileUploaderItem
              key={file.id}
              variant={file.variant ?? "default"}
              fileIcon={file.fileIcon}
              onButtonClick={() => onRemove?.(file.id)}
            >
              <FileUploaderItemTitle>{file.name}</FileUploaderItemTitle>
              {file.description && (
                <FileUploaderItemDescription>
                  {file.description}
                </FileUploaderItemDescription>
              )}
            </FileUploaderItem>
          ))}
        </FileUploaderItemsList>
      )}
    </FileUploader>
  ),
);

FileUploaderField.displayName = "FileUploaderField";
