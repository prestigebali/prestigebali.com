import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {projectId, dataset, apiVersion} from '../../sanity.config'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
