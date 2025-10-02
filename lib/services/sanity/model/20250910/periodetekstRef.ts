import {defineField} from 'sanity'
import {periodetekst} from './periodetekst'

export const periodetekstRef = defineField({
  name: 'periodetekstRef',
  title: 'PeriodetekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Periodetekst',
      name: 'periodetekst',
      type: 'reference',
      to: [periodetekst],
    })
  ],
})
