import { createClient, type SanityClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from './sanity-client-config';

let sanityWriteClient: SanityClient | null = null;

// This is the client used for READ-ONLY operations on the client-side
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
});


export function getSanityWriteClient(): SanityClient | null {
  if (sanityWriteClient) {
    return sanityWriteClient;
  }

  const token = process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;

  if (!token) {
    console.warn(
      'NEXT_PUBLIC_SANITY_API_WRITE_TOKEN is not set. Write operations will not be available.'
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
