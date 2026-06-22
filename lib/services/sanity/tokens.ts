import 'server-only';

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;

if (!sanityReadToken) {
  console.log('Missing SANITY_API_READ_TOKEN');
}
