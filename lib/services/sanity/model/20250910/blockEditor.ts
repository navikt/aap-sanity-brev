import { defineField } from 'sanity';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';

export const blockEditor = defineField({
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
          to: [Faktagrunnlag],
        },
      ],
    },
  ],
})