import {defineField} from 'sanity'
import {tekst} from './tekst'
import {kategori} from './kategori'

export const betingetTekstRef = defineField({
  name: 'betingetTekstRef',
  title: 'BetingetTekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Tekst',
      name: 'tekst',
      type: 'reference',
      to: [tekst],
    }),
    defineField({
      name: 'kategorier',
      title: 'Kategorier',
      type: 'array',
      of: [{type: 'reference', to: kategori}],
    }),
  ],
})
