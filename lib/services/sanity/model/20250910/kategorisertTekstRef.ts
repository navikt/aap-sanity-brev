import {defineField} from 'sanity'
import {kategori} from './kategori'
import {tekst} from './tekst'

export const kategorisertTekstRef = defineField({
  name: 'kategorisertTekstRef',
  title: 'KategorisertTekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Tekst',
      name: 'tekst',
      type: 'reference',
      to: [tekst],
    }),
    defineField({
      title: 'Kategori',
      name: 'kategori',
      type: 'reference',
      to: [kategori],
    }),
  ],
})
