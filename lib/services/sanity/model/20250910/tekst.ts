import { defineField, defineType } from 'sanity';

export const tekst = defineType({
  title: 'Tekst',
  name: 'tekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      description: 'Brukes i brevbygger',
      type: 'string',
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'internationalizedArrayBlockEditor',
    }),
  ],
});
