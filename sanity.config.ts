import { createAuthStore, defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { dataset, projectId } from 'lib/services/sanity/env';
import { locate } from 'lib/services/sanity/presentation/locate';

import { schemaTypes } from './schemas';
import { documentInternationalization } from '@sanity/document-internationalization';
import { defaultLanguage, supportedLanguages } from 'lib/services/sanity/model/localization/languages';
import { studioStructure } from 'lib/services/sanity/model/20250910/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { teksteditor } from 'lib/services/sanity/model/20250910/teksteditor';
import { blockEditor } from 'lib/services/sanity/model/20250910/blockEditor';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    studioStructure(),
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
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [defaultLanguage],
      fieldTypes: ['string'],
    }),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [defaultLanguage],
      fieldTypes: [teksteditor],
    }),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [defaultLanguage],
      fieldTypes: [blockEditor],
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
