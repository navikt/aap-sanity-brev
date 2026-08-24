import { defineField } from 'sanity';

import { kategori } from './kategori';
import { tekst } from './tekst';

export const betingetTekstRef = defineField({
  name: 'betingetTekstRef',
  title: 'Betinget tekst',
  type: 'object',
  preview: {
    select: {
      title: 'tekst.beskrivelse',
    },
    prepare(selection) {
      return {
        title: selection.title,
      };
    },
  },
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
      of: [{ type: 'reference', to: kategori }],
    }),
  ],
});
