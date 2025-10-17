import {type SchemaTypeDefinition} from 'sanity'
import destination from './schemas/destination'
import tourPackage from './schemas/tourPackage'
import siteSettings from './schemas/siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  destination,
  tourPackage,
]
