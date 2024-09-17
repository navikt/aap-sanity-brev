import { createAuthStore, defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from 'lib/services/sanity/env';

import { schemaTypes } from './schemas';
import { documentInternationalization } from '@sanity/document-internationalization';

export const supportedLanguages = [
  { id: 'nb', title: 'Norsk bokmål' },
  { id: 'nn', title: 'Norsk nynorsk' },
  { id: 'en', title: 'English' },
];

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ['innhold'],
      languageField: 'language',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
  auth: createAuthStore({
    projectId,
    dataset,
    mode: 'append',
    redirectOnSingle: true,
    providers: [
      {
        name: 'saml',
        title: 'NAV SSO',
        url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
      },
    ],
  }),
});
