import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn } from './env';
import { sanityReadToken } from 'lib/services/sanity/tokens';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: sanityReadToken,
  perspective: 'published',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
});
