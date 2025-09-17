import { defineField, defineType } from 'sanity';
import { valgRef } from './valgRef';
import { periodetekstRef } from './periodetekstRef';
import { betingetTekstRef } from './betingetTekst';
import { paragrafOptions } from './paragrafOptions';

export const delmal = defineType({
  title: 'Delmal',
  name: 'delmal',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'tittel',
      type: 'string',
    }),
    defineField({
      name: 'paragraf',
      title: 'Paragraf',
      type: 'string',
      options: {
        list: paragrafOptions,
      },
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'array',
      of: [
        valgRef,
        periodetekstRef,
        betingetTekstRef,
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
});
