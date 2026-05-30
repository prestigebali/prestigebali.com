import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from './sanity-client-config';

// Read-only client for fetching data
export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  apiVersion: apiVersion || '2024-05-01',
  useCdn: process.env.NODE_ENV === 'production',
});

// Write client for mutations (server-side only)
export function getSanityWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  
  if (!token) {
    console.warn('SANITY_API_TOKEN is not set');
    return null;
  }

  return createClient({
    projectId: projectId || 'placeholder',
    dataset: dataset || 'production',
    apiVersion: apiVersion || '2024-05-01',
    token,
    useCdn: false,
  });
}

export default sanityClient;
