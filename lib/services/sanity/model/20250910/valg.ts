import {defineField, defineType} from 'sanity'
import {kategorisertTekstRef} from './kategorisertTekstRef'
import {fritekst} from './fritekst'

export const valg = defineType({
  name: 'valg',
  title: 'Valg',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      type: 'string',
    }),
    defineField({
      name: 'alternativer',
      title: 'Alternativer',
      type: 'array',
      of: [kategorisertTekstRef, fritekst],
    }),
  ],
})
