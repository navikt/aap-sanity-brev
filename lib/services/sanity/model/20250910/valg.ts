import {defineField, defineType} from 'sanity'
import {tekst} from './tekst'

export const valg = defineType({
  name: 'valg',
  title: 'Valg',
  type: 'document',
  fields: [
    defineField({
      name: 'valg',
      title: 'Valg',
      type: 'array',
      of: [{type: 'reference', to: tekst}, {type: 'fritekst'}],
    }),
  ],
})
