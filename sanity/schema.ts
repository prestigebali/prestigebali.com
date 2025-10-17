import {type SchemaTypeDefinition} from 'sanity'
import destination from './schemas/destination'
import tourPackage from './schemas/tourPackage'
import siteSettings from './schemas/siteSettings'
import promotion from './schemas/promotion'
import heroSettings from './schemas/heroSettings'
import experience from './schemas/experience'
import booking from './schemas/booking'
import review from './schemas/review'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  heroSettings,
  destination,
  tourPackage,
  promotion,
  experience,
  booking,
  review,
]
