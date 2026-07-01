import type { FileUploaderDropzoneProps } from "@twilio-paste/core/file-uploader";

export interface FileUploaderFieldFile {
  /**
   * The unique identifier for the file. This is used to identify the file when removing it from the list.
   * @type {string}
   */
  id: string;
  /**
   * The name of the file. This is displayed in the file list.
   * @type {string}
   */
  name: string;
  /**
   * The description of the file. This is displayed below the file name in the file list in the error state.
   * @type {string}
   */
  description?: string;
  /**
   * The variant of the file. This is used to determine the styling of the file in the file list.
   * @type {"default" | "error" | "loading"}
   */
  variant?: "default" | "error" | "loading";
  /**
   * The icon to display for the file. This is displayed to the left of the file name in the file list.
   * @type {React.ReactNode}
   */
  fileIcon?: NonNullable<React.ReactNode>;
}

export interface FileUploaderFieldProps extends Omit<
  FileUploaderDropzoneProps,
  | "acceptedMimeTypes"
  | "element"
  | "children"
  | "onInputChange"
  | "id"
  | "disabled"
  | "required"
  | "name"
> {
  /**
   * The unique identifier for the file uploader field. This is used to associate the label with the input element.
   * @type {string}
   */
  id: string;
  /**
   * The name of the file uploader field. This is used to identify the field when submitting form data.
   * @type {string}
   */
  name: string;
  /**
   * The label for the file uploader field. This is displayed above the dropzone area.
   * @type {string}
   */
  label: string;
  /**
   * The help text for the file uploader field. This is displayed below the label and above the dropzone area.
   * @type {string}
   */
  helpText?: string;
  /**
   * The error text for the file uploader field. This is displayed below the dropzone area when there is an error.
   * @type {string}
   */
  errorText?: string;
  /**
   * whether the label should indicate that the field is optional. If true, "(optional)" will be displayed next to the label.
   * @type {boolean}
   */
  labelOptional?: boolean;

  /**
   * Whether the file uploader field is required. If true, the field will be marked as required and the user will be prompted to select a file before submitting the form.
   * @type {boolean}
   */
  required?: boolean;
  /**
   * Whether the file uploader field is disabled. If true, the field will be disabled and the user will not be able to interact with it.
   * @type {boolean}
   */
  disabled?: boolean;
  /**
   * An array of accepted MIME types for the file uploader field. This is used to restrict the types of files that can be selected.
   * @type {string[]}
   */
  acceptedMimeTypes?: string[];
  /**
   * The text to display in the dropzone area when no files have been selected. This is displayed inside the dropzone area.
   * @type {string}
   */
  dropzoneText?: string;
  /**
   * A function to be called when the file input changes.
   * @type {(event: React.ChangeEvent<HTMLInputElement>) => void}
   */
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * An array of files to be displayed in the file uploader field. Each file should have an `id`, `name`, and optional `description`, `variant`, and `fileIcon`.
   * @type {FileUploaderFieldFile[]}
   */
  files?: FileUploaderFieldFile[];
  /**
   * A function to be called when a file is removed from the file uploader field. The function will be passed the `id` of the file to be removed.
   * @type {(id: string) => void}
   */
  onRemove?: (id: string) => void;
}
