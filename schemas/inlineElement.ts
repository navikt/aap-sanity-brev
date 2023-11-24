import { defineField, defineType } from 'sanity';

export const InlineElement = defineType({
  type: 'document',
  name: 'inlineElement',
  title: 'Inline element',
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
