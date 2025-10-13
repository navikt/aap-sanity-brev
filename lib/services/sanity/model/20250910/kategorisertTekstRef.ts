import { defineField } from 'sanity';
import { kategori } from './kategori';
import { tekst } from './tekst';

export const kategorisertTekstRef = defineField({
  name: 'kategorisertTekstRef',
  title: 'KategorisertTekstRef',
  type: 'object',
  preview: {
    select: {
      title: 'tekst.beskrivelse',
      kategori: 'kategori.visningsnavn',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.kategori,
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
      title: 'Kategori',
      name: 'kategori',
      type: 'reference',
      to: [kategori],
    }),
  ],
});
