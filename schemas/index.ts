import { z } from "zod";
import { defineField, defineType } from "sanity";

export const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Project ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Dataset is required"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1, "API Version is required"),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const ImageItemSchema = z.object({
  _key: z.string(),
  alt: z.string().catch("Tattoo artwork"),
  imageUrl: z.string().url(),
  thumbUrl: z.string().url(),
  blurDataURL: z.string().optional(),
  dimensions: z
    .object({
      width: z.number(),
      height: z.number(),
      aspectRatio: z.number(),
    })
    .optional(),
});

export const PagedResultSchema = z.object({
  items: z.array(ImageItemSchema),
  totalCount: z.number().nonnegative(),
});

const portfolioType = defineType({
  name: "images",
  title: "Images",
  type: "document",
  fieldsets: [
    {
      name: "flashSection",
      title: "Flash",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "recentSection",
      title: "Recent Work",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "flash",
      title: "Flash",
      description: "Upload flash",
      type: "array",
      fieldset: "flashSection",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Image Label",
              initialValue: "Tattoo Flash Design",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "recentWork",
      title: "Recent Work",
      description: "Upload recent work",
      type: "array",
      fieldset: "recentSection",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Image Label",
              initialValue: "Recent Tattoo Work",
            },
          ],
        },
      ],

      options: {
        layout: "grid",
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "My Images",
      };
    },
  },
});

export const schemaTypes = [portfolioType];
