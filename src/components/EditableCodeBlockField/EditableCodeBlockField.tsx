import {
  EditableCodeBlock,
  EditableCodeBlockWrapper,
  EditableCodeBlockHeader,
} from "@twilio-paste/core/editable-code-block";
import type { EditableCodeBlockProps } from "@twilio-paste/core/editable-code-block";
import { HelpText } from "@twilio-paste/core/help-text";

export interface EditableCodeBlockFieldProps extends Omit<
  EditableCodeBlockProps,
  "element" | "children"
> {
  label: string;
  labelAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  helpText?: string;
  errorText?: string;
}

export const EditableCodeBlockField = ({
  label,
  labelAs = "h3",
  helpText,
  errorText,
  ...rest
}: EditableCodeBlockFieldProps) => (
  <EditableCodeBlockWrapper>
    <EditableCodeBlockHeader as={labelAs}>{label}</EditableCodeBlockHeader>
    {(helpText || errorText) && (
      <HelpText variant={errorText ? "error" : "default"}>
        {errorText ?? helpText}
      </HelpText>
    )}
    <EditableCodeBlock {...rest} />
  </EditableCodeBlockWrapper>
);

EditableCodeBlockField.displayName = "EditableCodeBlockField";
