import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { KeyboardKeys } from "./KeyboardKeys";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

describe("KeyboardKeys", () => {
  describe("renders correctly", () => {
    it("renders the correct number of kbd elements", () => {
      const { container } = renderWithTheme(<KeyboardKeys keys={["Command", "K"]} />);
      expect(container.querySelectorAll("kbd")).toHaveLength(2);
    });

    it("renders each key label as visible text", () => {
      renderWithTheme(<KeyboardKeys keys={["Ctrl", "Shift", "S"]} />);
      expect(screen.getByText("Ctrl")).toBeInTheDocument();
      expect(screen.getByText("Shift")).toBeInTheDocument();
      expect(screen.getByText("S")).toBeInTheDocument();
    });

    it("renders a single-key shortcut without error", () => {
      renderWithTheme(<KeyboardKeys keys={["Escape"]} />);
      expect(screen.getByText("Escape")).toBeInTheDocument();
    });
  });

  describe("prop forwarding", () => {
    it("renders with disabled prop without error", () => {
      const { container } = renderWithTheme(
        <KeyboardKeys keys={["Command", "K"]} disabled />,
      );
      expect(container.querySelectorAll("kbd")).toHaveLength(2);
    });

    it("renders with variant inverse without error", () => {
      const { container } = renderWithTheme(
        <KeyboardKeys keys={["Command", "K"]} variant="inverse" />,
      );
      expect(container.querySelectorAll("kbd")).toHaveLength(2);
    });
  });
});
