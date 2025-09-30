import { defineField } from 'sanity';
import { faktagrunnlag } from './faktagrunnlag';

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
          to: [faktagrunnlag],
        },
      ],
    },
  ],
})