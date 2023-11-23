import { defineField, defineType } from 'sanity';

export const StandardElement = defineType({
  type: 'document',
  name: 'standardElement',
  title: 'Standard element',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
    }),
    defineField({
      type: 'string',
      name: 'tekst',
      title: 'Tekst',
    }),
  ],
});
