import {defineField, defineType} from 'sanity'
import {valgRef} from './valgRef'
import {periodetekstRef} from './periodetekstRef'

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
      title: 'Editor',
      name: 'teksteditor',
      type: 'array',
      of: [
        valgRef,
        periodetekstRef,
        {
          type: 'block',
          of: [
            {
              type: 'reference',
              title: 'Referanse til faktagrunnlag',
              name: 'faktagrunnlag',
              to: [{type: 'faktagrunnlag'}],
            },
          ],
        },
      ],
    }),
  ],
})
