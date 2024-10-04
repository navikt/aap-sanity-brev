import { createAuthStore, defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from 'lib/services/sanity/env';
import { locate } from 'lib/services/sanity/presentation/locate';

import { schemaTypes } from './schemas';
import { documentInternationalization } from '@sanity/document-internationalization';
import { supportedLanguages } from 'lib/services/sanity/model/localization/languages';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      resolve: {
        locations: locate,
      },
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
