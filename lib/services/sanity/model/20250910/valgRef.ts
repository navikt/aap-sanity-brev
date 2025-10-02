import {defineField} from 'sanity'
import {valg} from './valg'

export const valgRef = defineField({
  name: 'valgRef',
  title: 'ValgRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Valg',
      name: 'valg',
      type: 'reference',
      to: [valg],
    }),
    defineField({
      title: 'Obligatorisk',
      name: 'obligatorisk',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
