import { defineConfig, defineField } from 'sanity';
import { ListItemBuilder, StructureBuilder, structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { paragrafOptions } from './schemaTypes/paragrafOptions';
import { ParagraphIcon } from '@navikt/aksel-icons';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { valgRef } from './schemaTypes/valgRef';
import { periodetekstRef } from './schemaTypes/periodetekstRef';
import { betingetTekstRef } from './schemaTypes/betingetTekstRef';
import { fritekst } from './schemaTypes/fritekst';
import { faktagrunnlag } from './schemaTypes/faktagrunnlag';
import { studioStructure } from './schemaTypes/structure';

const defaultLanguage = 'nb';

export const supportedLanguages = [
  { id: 'nb', title: 'Norsk bokmål' },
  { id: 'nn', title: 'Norsk nynorsk' },
  { id: 'en', title: 'English' },
];

export default defineConfig({
  name: 'default',
  title: 'sanity-playground',

  projectId: '',
  dataset: 'production',

  plugins: [
    studioStructure(),
    visionTool(),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [defaultLanguage],
      fieldTypes: ['string'],
    }),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [defaultLanguage],
      fieldTypes: [
        defineField({
          name: 'teksteditor',
          type: 'array',
          of: [
            valgRef,
            periodetekstRef,
            betingetTekstRef,
            fritekst,
            {
              type: 'block',
              of: [
                {
                  type: 'reference',
                  title: 'Referanse til faktagrunnlag',
                  name: 'faktagrunnlag',
                  to: [{ type: 'faktagrunnlag' }],
                },
              ],
            },
          ],
        }),
      ],
    }),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [defaultLanguage],
      fieldTypes: [
        defineField({
          name: 'blockEditor',
          type: 'array',
          of: [
            {
              type: 'block',
              of: [
                {
                  type: 'reference',
                  title: 'Referanse til faktagrunnlag',
                  name: 'faktagrunnlag',
                  to: [faktagrunnlag],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
