import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schema'
import {deskStructure} from './sanity/deskStructure'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01'

export default defineConfig({
  basePath: '/studio',
  name: 'prestige_bali_studio',
  title: 'Prestige Bali Studio',
  projectId,
  dataset,

  plugins: [
    structureTool({structure: deskStructure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],

  schema: {
    types: schemaTypes,
  },
})
