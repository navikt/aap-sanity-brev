import { defineField } from 'sanity';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';
import { tabell } from 'lib/services/sanity/model/20250910/tabell';

export const blockEditor = defineField({
  name: 'blockEditor',
  type: 'array',
  of: [
    {
      type: 'reference',
      title: 'Tabell',
      name: 'tabell',
      to: [tabell],
    },
    {
      type: 'block',
      of: [
        {
          type: 'reference',
          title: 'Referanse til faktagrunnlag',
          name: 'faktagrunnlag',
          to: [Faktagrunnlag],
        },
      ],
    },
  ],
});
