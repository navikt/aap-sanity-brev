import {defineField} from 'sanity'

export const valgRef = defineField({
  name: 'valgRef',
  title: 'ValgRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Valg',
      name: 'valg',
      type: 'reference',
      to: [{type: 'valg'}],
    }),
    defineField({
      title: 'Obligatorisk',
      name: 'obligatorisk',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
