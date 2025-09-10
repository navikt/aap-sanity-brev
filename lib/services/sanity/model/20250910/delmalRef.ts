import {defineField} from 'sanity'

export const delmalRef = defineField({
  name: 'delmalRef',
  title: 'DelmalRef',
  type: 'object',
  fields: [
    defineField({
      title: 'delmal',
      name: 'delmal',
      type: 'reference',
      to: [{type: 'delmal'}],
    }),
    defineField({
      title: 'Obligatorisk',
      name: 'obligatorisk',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
