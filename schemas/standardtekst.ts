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
      title: 'Beskrivelse',
      description: 'Denne vises kun i Sanity.',
    }),
    defineField({
      name: 'overskrift',
      type: 'string',
      title: 'Overskrift',
      description: 'Overskrift på innholdet. Ikke obligatorisk',
    }),
    defineField({
      name: 'niva',
      type: 'reference',
      title: 'Overskriftsnivå',
      to: { type: 'overskriftsniva' },
    }),
    defineField({
      title: 'Innhold',
      name: 'innhold',
      type: 'array',
      of: [{ type: 'content' }],
      description: 'Avsnitt(ene) i standardteksten.',
    }),
    defineField({
      name: 'kanRedigeres',
      type: 'boolean',
      title: 'Kan redigeres', // ja eller nei
      initialValue: false,
    }),
  ],
});
