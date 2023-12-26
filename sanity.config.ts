import { AuthConfig, defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';

import { schemaTypes } from './schemas';
import { locate } from './locate';

const SANITY_PREVIEW_URL = 'http://localhost:3000';

const auth: AuthConfig = {
  redirectOnSingle: true,
  providers: () => [
    {
      name: 'saml',
      title: 'NAV SSO',
      url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
      logo: '/static/navlogo.svg',
    },
  ],
  loginMethod: 'dual',
};

export default defineConfig({
  name: 'default',
  title: 'aap-kelvin-brev',

  projectId: '948n95rd',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    presentationTool({
      previewUrl: SANITY_PREVIEW_URL,
      locate: locate,
    }),
  ],

  auth: auth,
  schema: {
    types: schemaTypes,
  },
  document: {
    unstable_comments: {
      enabled: true, // Comments enabled
    },
  },
});
