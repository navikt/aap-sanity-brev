import {defineField} from 'sanity'

export const periodetekstRef = defineField({
  name: 'periodetekstRef',
  title: 'PeriodetekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Periodetekst',
      name: 'periodetekst',
      type: 'reference',
      to: [{type: 'periodetekst'}],
    })
  ],
})
