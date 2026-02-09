import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './sanity-client-config';

// This file is now ONLY for the write client.
// The read client is in `lib/sanity.ts`.

export function getSanityWriteClient(): SanityClient {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
}
