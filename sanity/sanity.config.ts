import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['images'])

export default defineConfig({
  name: 'default',
  title: 'Alexis App',
  projectId: 'ghd2xkxv',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Images')
              .id('images')
              .child(S.document().schemaType('images').documentId('images')),

            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId()!)),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
