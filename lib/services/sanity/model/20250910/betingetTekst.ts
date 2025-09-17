import {defineField} from 'sanity'

export const betingetTekstRef = defineField({
  name: 'betingetTekstRef',
  title: 'BetingetTekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Tekst',
      name: 'tekst',
      type: 'reference',
      to: [{type: 'tekst'}],
    }),
    defineField({
      name: 'grupper',
      title: 'Grupper',
      type: 'array',
      of: [{type: 'reference', to: {type: 'gruppe'}}],
    }),
  ],
})
