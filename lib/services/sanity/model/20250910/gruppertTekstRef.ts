import {defineField} from 'sanity'

export const gruppertTekstRef = defineField({
  name: 'gruppertTekstRef',
  title: 'GruppertTekstRef',
  type: 'object',
  fields: [
    defineField({
      title: 'Tekst',
      name: 'valg',
      type: 'reference',
      to: [{type: 'tekst'}],
    }),
    defineField({
      title: 'Valgt gruppe',
      name: 'valgGruppe',
      type: 'reference',
      to: [{type: 'valgGruppe'}],
    }),
  ],
})
