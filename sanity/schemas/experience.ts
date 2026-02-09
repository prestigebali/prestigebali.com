import { defineType, defineField } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (for cards)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "blockContent",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title (Google title)",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description (Google snippet)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
