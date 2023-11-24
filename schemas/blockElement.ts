import { defineField, defineType } from 'sanity';

export const BlockElement = defineType({
  type: 'document',
  name: 'blockElement',
  title: 'Block element',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
    }),
    defineField({
      name: 'innhold',
      title: 'Tekst',
      type: 'array',
      of: [{ type: 'content' }],
    }),
  ],
});
