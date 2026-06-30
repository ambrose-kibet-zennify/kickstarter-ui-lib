import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { EditableCodeBlockField } from "./EditableCodeBlockField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  label: "Script",
  defaultLanguage: "typescript",
};

describe("EditableCodeBlockField", () => {
  describe("renders correctly", () => {
    it("renders the label heading text", () => {
      renderWithTheme(<EditableCodeBlockField {...defaultProps} />);
      expect(screen.getByText("Script")).toBeInTheDocument();
    });

    it("renders the editor loading state without crash", () => {
      renderWithTheme(<EditableCodeBlockField {...defaultProps} />);
      expect(screen.getByText("Loading code...")).toBeInTheDocument();
    });

    it("accepts a custom i18nLoadingLabel", () => {
      renderWithTheme(
        <EditableCodeBlockField {...defaultProps} i18nLoadingLabel="Loading editor…" />,
      );
      expect(screen.getByText("Loading editor…")).toBeInTheDocument();
    });
  });

  describe("help / error text", () => {
    it("renders helpText in the DOM", () => {
      renderWithTheme(
        <EditableCodeBlockField {...defaultProps} helpText="Write valid TypeScript." />,
      );
      expect(screen.getByText("Write valid TypeScript.")).toBeInTheDocument();
    });

    it("renders errorText in the DOM", () => {
      renderWithTheme(
        <EditableCodeBlockField {...defaultProps} errorText="Syntax error on line 3." />,
      );
      expect(screen.getByText("Syntax error on line 3.")).toBeInTheDocument();
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <EditableCodeBlockField
          {...defaultProps}
          helpText="Write valid TypeScript."
          errorText="Syntax error on line 3."
        />,
      );
      expect(screen.getByText("Syntax error on line 3.")).toBeInTheDocument();
      expect(screen.queryByText("Write valid TypeScript.")).not.toBeInTheDocument();
    });
  });
});
