import {defineField, defineType} from 'sanity'

export const valg = defineType({
  name: 'valg',
  title: 'Valg',
  type: 'document',
  fields: [
    defineField({
      name: 'valg',
      title: 'Valg',
      type: 'array',
      of: [{type: 'gruppertTekstRef'}, {type: 'fritekst'}],
    }),
  ],
})
