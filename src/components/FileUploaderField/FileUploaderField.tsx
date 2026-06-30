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

export interface FileUploaderFieldFile {
  id: string;
  name: string;
  description?: string;
  variant?: "default" | "error" | "loading";
  fileIcon?: React.ReactNode;
}

export interface FileUploaderFieldProps {
  name: string;
  label: string;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  acceptedMimeTypes?: string[];
  dropzoneText?: string;
  multiple?: boolean;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  files?: FileUploaderFieldFile[];
  onRemove?: (id: string) => void;
}

export const FileUploaderField = ({
  name,
  label,
  helpText,
  errorText,
  required,
  disabled,
  acceptedMimeTypes = [],
  dropzoneText = "Browse files or drag them here",
  multiple,
  onInputChange,
  files,
  onRemove,
}: FileUploaderFieldProps) => (
  <FileUploader name={name} disabled={disabled} required={required}>
    <FileUploaderLabel>{label}</FileUploaderLabel>
    {helpText && <FileUploaderHelpText>{helpText}</FileUploaderHelpText>}
    <FileUploaderDropzone
      acceptedMimeTypes={acceptedMimeTypes}
      multiple={multiple}
      onInputChange={onInputChange}
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
              <FileUploaderItemDescription>{file.description}</FileUploaderItemDescription>
            )}
          </FileUploaderItem>
        ))}
      </FileUploaderItemsList>
    )}
  </FileUploader>
);

FileUploaderField.displayName = "FileUploaderField";
