import { defineType } from '@sanity/types';
import { defineField } from 'sanity';

export const Standardtekst = defineType({
  name: 'standardtekst',
  type: 'document',
  title: 'Standardtekst',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
      description: 'Tittel på standardteksten.',
    }),
    defineField({
      title: 'Innhold',
      name: 'innhold',
      type: 'array',
      of: [{ type: 'content' }],
      description: 'Avsnitt(ene) i standardteksten.',
    }),
  ],
});
