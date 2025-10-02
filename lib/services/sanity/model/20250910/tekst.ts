import { defineField, defineType } from 'sanity';

export const tekst = defineType({
  title: 'Tekst',
  name: 'tekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      type: 'string',
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'internationalizedArrayBlockEditor',
    }),
  ],
});
