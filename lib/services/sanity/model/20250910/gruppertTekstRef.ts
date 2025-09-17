import {defineField} from 'sanity'

export const gruppertTekstRef = defineField({
  name: 'gruppertTekstRef',
  title: 'GruppertTekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Tekst',
      name: 'tekst',
      type: 'reference',
      to: [{type: 'tekst'}],
    }),
    defineField({
      title: 'Gruppe',
      name: 'gruppe',
      type: 'reference',
      to: [{type: 'gruppe'}],
    }),
  ],
})
