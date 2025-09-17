import {defineField, defineType} from 'sanity'

export const tekst = defineType({
  title: 'Tekst',
  name: 'tekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Tekst',
      name: 'title',
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
              to: [{type: 'faktagrunnlag'}],
            },
          ],
        },
      ],
    }),
  ],
})
