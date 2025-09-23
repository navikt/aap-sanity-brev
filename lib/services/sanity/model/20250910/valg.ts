import {defineField, defineType} from 'sanity'
import {gruppertTekstRef} from './gruppertTekstRef'
import {fritekst} from './fritekst'

export const valg = defineType({
  name: 'valg',
  title: 'Valg',
  type: 'document',
  fields: [
    defineField({
      name: 'valg',
      title: 'Valg',
      type: 'array',
      of: [gruppertTekstRef, fritekst],
    }),
  ],
})
