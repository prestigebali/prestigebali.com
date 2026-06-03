import {type SchemaTypeDefinition} from 'sanity'
import destination from './schemas/destination'
import tourCategory from './schemas/tourCategory'
import tourPackage from './schemas/tourPackage'
import siteSettings from './schemas/siteSettings'
import promotion from './schemas/promotion'
import heroSettings from './schemas/heroSettings'
import experience from './schemas/experience'
import booking from './schemas/booking'
import review from './schemas/review'
import paymentSettings from './schemas/paymentSettings'
import blockContent from './schemas/blockContent'
import aboutPage from './schemas/aboutPage'
import wellnessService from './schemas/wellnessService'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  paymentSettings,
  heroSettings,
  aboutPage,
  destination,
  tourCategory,
  tourPackage,
  promotion,
  experience,
  booking,
  review,
  blockContent,
  wellnessService,
]
