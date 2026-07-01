import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme } from "@twilio-paste/core/theme";
import { FileUploaderField } from "./FileUploaderField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  name: "upload",
  label: "Attachments",
};

describe("FileUploaderField", () => {
  describe("renders correctly", () => {
    it("renders the label text", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} />);
      expect(screen.getByText("Attachments")).toBeInTheDocument();
    });

    it("associates the label with the dropzone input", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} id="upload" />);
      expect(screen.getByLabelText("Attachments")).toHaveAttribute(
        "id",
        "upload",
      );
    });

    it("renders help text when provided", () => {
      renderWithTheme(
        <FileUploaderField {...defaultProps} helpText="PDF and images only." />,
      );
      expect(screen.getByText("PDF and images only.")).toBeInTheDocument();
    });

    it("renders error text when provided", () => {
      renderWithTheme(
        <FileUploaderField {...defaultProps} errorText="Upload failed." />,
      );
      expect(screen.getByText("Upload failed.")).toBeInTheDocument();
    });

    it("renders no file list when files prop is empty", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} files={[]} />);
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("sets aria-invalid on the input when errorText is provided", () => {
      renderWithTheme(
        <FileUploaderField {...defaultProps} errorText="Upload failed." />,
      );
      expect(screen.getByLabelText("Attachments")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("does not set aria-invalid when only helpText is provided", () => {
      renderWithTheme(
        <FileUploaderField {...defaultProps} helpText="PDF and images only." />,
      );
      expect(screen.getByLabelText("Attachments")).not.toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
  });

  describe("prop forwarding", () => {
    it("disables the input when disabled is true", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} disabled />);
      expect(screen.getByLabelText("Attachments")).toBeDisabled();
    });

    it("marks the input as required when required is true", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} required />);
      expect(screen.getByLabelText("Attachments")).toBeRequired();
    });

    it("forwards the multiple attribute to the input", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} multiple />);
      expect(screen.getByLabelText("Attachments")).toHaveAttribute("multiple");
    });

    it("forwards ref to the underlying HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(
        <FileUploaderField {...defaultProps} id="upload" ref={ref} />,
      );
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.id).toBe("upload");
    });
  });

  describe("file list", () => {
    const files = [
      { id: "a", name: "report.pdf", description: "2 MB" },
      { id: "b", name: "image.png" },
      { id: "c", name: "data.csv", description: "500 KB" },
    ];

    it("renders the correct number of list items", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} files={files} />);
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders each file name", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} files={files} />);
      expect(screen.getByText("report.pdf")).toBeInTheDocument();
      expect(screen.getByText("image.png")).toBeInTheDocument();
      expect(screen.getByText("data.csv")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      renderWithTheme(<FileUploaderField {...defaultProps} files={files} />);
      expect(screen.getByText("2 MB")).toBeInTheDocument();
      expect(screen.getByText("500 KB")).toBeInTheDocument();
    });

    it("calls onRemove with the correct id when a remove button is clicked", async () => {
      const onRemove = vi.fn();
      renderWithTheme(
        <FileUploaderField
          {...defaultProps}
          files={[{ id: "abc", name: "file.txt" }]}
          onRemove={onRemove}
        />,
      );
      await userEvent.click(
        screen.getByRole("button", { name: /remove file/i }),
      );
      expect(onRemove).toHaveBeenCalledWith("abc");
    });
  });
});
