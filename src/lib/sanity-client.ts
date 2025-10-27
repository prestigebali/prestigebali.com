import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './sanity-client-config';

// This is the client used for READ-ONLY operations on the client-side
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  // Implement ISR by setting a revalidate time (e.g., 1 hour)
  // This will cache pages and re-fetch data in the background
  next: {
    revalidate: 3600 // 1 hour
  }
});


export function getSanityWriteClient(): SanityClient {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
}
