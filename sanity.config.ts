import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schema'
import {deskStructure} from './sanity/deskStructure'
import {projectId, dataset, apiVersion} from './src/lib/sanity-client-config'

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
