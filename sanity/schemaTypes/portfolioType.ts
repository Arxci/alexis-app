import {defineField, defineType} from 'sanity'

export const portfolioType = defineType({
  name: 'images',
  title: 'Images',
  type: 'document',
  fieldsets: [
    {
      name: 'flashSection',
      title: 'Flash',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'recentSection',
      title: 'Recent Work',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'flash',
      title: 'Flash',
      description: 'Upload flash',
      type: 'array',
      fieldset: 'flashSection',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Image Label',
              initialValue: 'Tattoo Flash Design',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'recentWork',
      title: 'Recent Work',
      description: 'Upload recent work',
      type: 'array',
      fieldset: 'recentSection',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Image Label',
              initialValue: 'Recent Tattoo Work',
            },
          ],
        },
      ],

      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'My Images',
      }
    },
  },
})
