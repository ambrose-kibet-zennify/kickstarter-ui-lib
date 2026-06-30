import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { List } from "./List";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

describe("List", () => {
  describe("renders correctly", () => {
    it("renders a <ul> for type='ul'", () => {
      const { container } = renderWithTheme(
        <List type="ul" items={[{ text: "Item" }]} />,
      );
      expect(container.querySelector("ul")).toBeInTheDocument();
    });

    it("renders an <ol> for type='ol'", () => {
      const { container } = renderWithTheme(
        <List type="ol" items={[{ text: "Item" }]} />,
      );
      expect(container.querySelector("ol")).toBeInTheDocument();
    });

    it("renders all item texts", () => {
      renderWithTheme(
        <List
          type="ul"
          items={[{ text: "Alpha" }, { text: "Beta" }, { text: "Gamma" }]}
        />,
      );
      expect(screen.getByText("Alpha")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
      expect(screen.getByText("Gamma")).toBeInTheDocument();
    });

    it("renders the correct number of list items", () => {
      renderWithTheme(
        <List
          type="ol"
          items={[{ text: "One" }, { text: "Two" }, { text: "Three" }]}
        />,
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });
  });

  describe("nested rendering", () => {
    it("renders nested subList items", () => {
      renderWithTheme(
        <List
          type="ul"
          items={[
            {
              text: "Parent",
              subList: { type: "ol", items: [{ text: "Child" }] },
            },
          ]}
        />,
      );
      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("renders a nested ol inside a ul parent", () => {
      const { container } = renderWithTheme(
        <List
          type="ul"
          items={[
            {
              text: "Parent",
              subList: { type: "ol", items: [{ text: "Child" }] },
            },
          ]}
        />,
      );
      expect(container.querySelector("ul")).toBeInTheDocument();
      expect(container.querySelector("ol")).toBeInTheDocument();
    });

    it("renders three-level deep nesting", () => {
      renderWithTheme(
        <List
          type="ul"
          items={[
            {
              text: "Level 1",
              subList: {
                type: "ol",
                items: [
                  {
                    text: "Level 2",
                    subList: {
                      type: "ul",
                      items: [{ text: "Level 3" }],
                    },
                  },
                ],
              },
            },
          ]}
        />,
      );
      expect(screen.getByText("Level 1")).toBeInTheDocument();
      expect(screen.getByText("Level 2")).toBeInTheDocument();
      expect(screen.getByText("Level 3")).toBeInTheDocument();
    });
  });
});
