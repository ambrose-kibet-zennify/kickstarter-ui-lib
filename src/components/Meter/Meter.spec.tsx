import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { Meter } from "./Meter";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "data-usage",
  label: "Data usage",
};

describe("Meter", () => {
  describe("renders correctly", () => {
    it("renders the label text", () => {
      renderWithTheme(<Meter {...defaultProps} value={50} />);
      expect(screen.getByText("Data usage")).toBeInTheDocument();
    });

    it("renders a meter element with the correct id", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={50} />,
      );
      const meterEl = container.querySelector('[role~="meter"]');
      expect(meterEl).toBeInTheDocument();
      expect(meterEl).toHaveAttribute("id", "data-usage");
    });

    it("associates the label with the meter via aria-labelledby", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={50} />,
      );
      const meterEl = container.querySelector('[role~="meter"]');
      const labelledBy = meterEl?.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy as string)).toHaveTextContent(
        "Data usage",
      );
    });
  });

  describe("value representation", () => {
    it("sets aria-valuenow/min/max from value/minValue/maxValue", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={30} minValue={0} maxValue={200} />,
      );
      const meterEl = container.querySelector('[role~="meter"]');
      expect(meterEl).toHaveAttribute("aria-valuenow", "30");
      expect(meterEl).toHaveAttribute("aria-valuemin", "0");
      expect(meterEl).toHaveAttribute("aria-valuemax", "200");
    });

    it("defaults aria-valuetext to an auto-computed percentage when valueLabel is omitted", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={50} />,
      );
      const meterEl = container.querySelector('[role~="meter"]');
      expect(meterEl).toHaveAttribute("aria-valuetext", "50%");
    });

    it("syncs a custom valueLabel into both the visible text and aria-valuetext", () => {
      const { container } = renderWithTheme(
        <Meter
          {...defaultProps}
          value={5000}
          minValue={0}
          maxValue={10000}
          minLabel="0"
          maxLabel="10,000"
          valueLabel="5,000 of 10,000"
        />,
      );
      expect(screen.getByText("5,000 of 10,000")).toBeInTheDocument();
      const meterEl = container.querySelector('[role~="meter"]');
      expect(meterEl).toHaveAttribute("aria-valuetext", "5,000 of 10,000");
    });

    it("clamps aria-valuenow to the min/max range", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={9999} minValue={0} maxValue={100} />,
      );
      const meterEl = container.querySelector('[role~="meter"]');
      expect(meterEl).toHaveAttribute("aria-valuenow", "100");
    });
  });

  describe("min/max labels", () => {
    it("renders minLabel and maxLabel when provided", () => {
      renderWithTheme(
        <Meter
          {...defaultProps}
          value={50}
          minValue={0}
          maxValue={200}
          minLabel="0"
          maxLabel="200"
        />,
      );
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
    });

    it("warns in development when using a non 0-100 scale without min/max labels", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      renderWithTheme(
        <Meter {...defaultProps} value={50} minValue={0} maxValue={200} />,
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("non 0-100 scale"),
      );
      warnSpy.mockRestore();
    });

    it("does not warn when a non 0-100 scale includes min/max labels", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      renderWithTheme(
        <Meter
          {...defaultProps}
          value={50}
          minValue={0}
          maxValue={200}
          minLabel="0"
          maxLabel="200"
        />,
      );
      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("does not warn on the default 0-100 scale", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      renderWithTheme(<Meter {...defaultProps} value={50} />);
      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("help text", () => {
    it("renders help text and wires aria-describedby to it", () => {
      const { container } = renderWithTheme(
        <Meter
          {...defaultProps}
          value={50}
          helpText="Resets on the 1st of each month."
        />,
      );
      expect(
        screen.getByText("Resets on the 1st of each month."),
      ).toBeInTheDocument();
      const meterEl = container.querySelector('[role~="meter"]');
      const describedBy = meterEl?.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy as string)).toHaveTextContent(
        "Resets on the 1st of each month.",
      );
    });

    it("does not set aria-describedby when helpText is omitted", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={50} />,
      );
      const meterEl = container.querySelector('[role~="meter"]');
      expect(meterEl).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("prop forwarding", () => {
    it("forwards native/data attributes to the underlying meter", () => {
      const { container } = renderWithTheme(
        <Meter {...defaultProps} value={50} data-testid="usage-meter" />,
      );
      expect(container.querySelector('[data-testid="usage-meter"]')).toBe(
        container.querySelector('[role~="meter"]'),
      );
    });
  });
});
