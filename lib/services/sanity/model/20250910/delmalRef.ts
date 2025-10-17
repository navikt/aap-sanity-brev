import { defineField } from 'sanity';
import { delmal } from './delmal';

export const delmalRef = defineField({
  name: 'delmalRef',
  title: 'DelmalRef',
  type: 'object',
  preview: {
    select: {
      title: 'delmal.beskrivelse',
      paragraf: 'delmal.paragraf',
    },
    prepare(selection) {
      const { title, paragraf } = selection;
      return {
        title: title,
        subtitle: paragraf ? `§ ${paragraf}` : '',
      };
    },
  },
  fields: [
    defineField({
      title: 'delmal',
      name: 'delmal',
      type: 'reference',
      to: [delmal],
    }),
    defineField({
      title: 'Obligatorisk',
      name: 'obligatorisk',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
