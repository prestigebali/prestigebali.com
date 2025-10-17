import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './sanity-client-config';

let sanityWriteClient: SanityClient | null = null;

export function getSanityWriteClient(): SanityClient | null {
  if (sanityWriteClient) {
    return sanityWriteClient;
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    console.warn(
      'SANITY_API_WRITE_TOKEN is not set. Write operations will not be available.'
    );
    return null;
  }

  sanityWriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token,
  });

  return sanityWriteClient;
}
