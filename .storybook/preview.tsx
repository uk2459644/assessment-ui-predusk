import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/styles/globals.css"; // Tailwind entry file
import { ThemeProvider } from "../src/context/ThemeContext";

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
};
