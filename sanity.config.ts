import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import logo from "@/app/apple-touch-icon.png";

import { schemaTypes } from "./schemas";

import { env } from "./lib/env";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["images"]);

const props = {
  "--my-white": "#e2dac5", // ~oklch(0.92 0.02 90) - Warm Beige
  "--my-black": "#363533", // ~oklch(21.6% 0.006 56) - Soft Black
  "--my-red": "#d40e14", // ~oklch(0.55 0.22 28) - Traditional Red
  "--my-gold": "#edc409", // ~oklch(0.83 0.17 93) - Gold
  "--my-green": "#297613", // ~oklch(0.50 0.15 140) - Green
};

export const theme = buildLegacyTheme({
  /* Base theme colors */
  "--black": props["--my-black"],
  "--white": props["--my-white"],

  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": props["--my-white"],
  "--component-text-color": props["--my-black"],

  /* Brand */
  "--brand-primary": props["--my-red"],

  /* Default button */
  "--default-button-color": "#666",
  "--default-button-primary-color": props["--my-red"],
  "--default-button-success-color": props["--my-green"],
  "--default-button-warning-color": props["--my-gold"],
  "--default-button-danger-color": props["--my-red"],

  /* State */
  "--state-info-color": props["--my-red"],
  "--state-success-color": props["--my-green"],
  "--state-warning-color": props["--my-gold"],
  "--state-danger-color": props["--my-red"],

  /* Navbar */
  "--main-navigation-color": props["--my-black"],
  "--main-navigation-color--inverted": props["--my-white"],

  "--focus-color": props["--my-black"],

  /* Typography - using your app's serif font */
  "--font-family-base": "var(--font-serif)",
});

export default defineConfig({
  name: "default",
  title: "AceArts",
  subtitle: "Manage images",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  theme,
  studio: { components: {} },
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Images")
              .id("images")
              .child(S.document().schemaType("images").documentId("images")),

            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
