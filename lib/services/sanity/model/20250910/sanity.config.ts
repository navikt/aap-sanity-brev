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

const defaultLanguage = 'nb';

export const supportedLanguages = [
  { id: 'nb', title: 'Norsk bokmål' },
  { id: 'nn', title: 'Norsk nynorsk' },
  { id: 'en', title: 'English' },
];

const gammelBrevmodell = ['brevtype', 'innhold', 'tekstbolk'];

const byggParagrafBlokker = (structureBuilder: StructureBuilder): ListItemBuilder[] => {
  return paragrafOptions.map((opt) =>
    structureBuilder
      .listItem()
      .icon(ParagraphIcon)
      .title(opt.title)
      .id(opt.value)
      .child(
        structureBuilder
          .documentList()
          .title(opt.title)
          .filter(`_type == 'delmal' && paragraf == "${opt.value}"`)
          .menuItems(structureBuilder.documentTypeList('delmal').getMenuItems())
      )
  );
};

export default defineConfig({
  name: 'default',
  title: 'sanity-playground',

  projectId: '',
  dataset: 'production',

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
            // @ts-ignore (TODO fix denne)
            ...s.documentTypeListItems().filter((item) => !gammelBrevmodell.includes(item.getId())),
            s.divider().title('Gammel modell'),
            // @ts-ignore (TODO fix denne)
            ...s.documentTypeListItems().filter((item) => gammelBrevmodell.includes(item.getId())),
          ]),
    }),
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
