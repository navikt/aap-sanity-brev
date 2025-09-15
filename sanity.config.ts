import { createAuthStore, defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { ListItemBuilder, StructureBuilder, structureTool } from 'sanity/structure';
import { dataset, projectId } from 'lib/services/sanity/env';
import { locate } from 'lib/services/sanity/presentation/locate';

import { schemaTypes } from './schemas';
import { documentInternationalization } from '@sanity/document-internationalization';
import { supportedLanguages } from 'lib/services/sanity/model/localization/languages';
import { paragrafOptions } from './lib/services/sanity/model/20250910/paragrafOptions';

const byggParagrafBlokker = (structureBuilder: StructureBuilder): ListItemBuilder[] => {
  return paragrafOptions.map((opt) =>
    structureBuilder
      .listItem()
      .title(opt.title)
      .id(opt.value)
      .child(
        structureBuilder
          .documentList()
          .title(opt.title)
          .filter(`_type == 'delmal' && paragraf == "${opt.value}"`)
          .menuItems(structureBuilder.documentTypeList('delmal').getMenuItems()),
      ),
  )
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (s) =>
        s
          .list()
          .title('Innhold')
          .items([
            s.divider().title('Delmaler pr paragraf'),
            ...byggParagrafBlokker(s),
            s.divider().title('Andre tekster'),
            ...s.documentTypeListItems(),
          ]),
    }),
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
