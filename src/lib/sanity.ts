import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import {projectId, dataset, apiVersion} from './sanity-client-config'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // Implement ISR by setting a revalidate time (e.g., 1 hour in production)
  // and disable it for development to always get fresh data.
  next: {
    revalidate: process.env.NODE_ENV === 'production' ? 3600 : false,
  },
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
