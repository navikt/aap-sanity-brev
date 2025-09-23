import {defineField, defineType} from 'sanity'
import {faktagrunnlag} from './faktagrunnlag'

export const tekst = defineType({
  title: 'Tekst',
  name: 'tekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      type: 'string',
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
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
})
