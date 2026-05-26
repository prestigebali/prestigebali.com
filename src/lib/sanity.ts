import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import {projectId, dataset} from './sanity-client-config'

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  apiVersion: '2024-05-01',
  useCdn: process.env.NODE_ENV === 'production',
  next: {
    revalidate: process.env.NODE_ENV === 'production' ? 3600 : false,
  },
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
