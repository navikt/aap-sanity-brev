import { defineField, defineType } from 'sanity';

export const Tekstbolk = defineType({
  name: 'tekstbolk',
  type: 'document',
  title: 'Tekstbolk',
  preview: {
    select: {
      title: 'tittel',
      subtitle: 'overskrift.nb',
    },
  },
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Beskrivelse',
      description: 'Denne vises kun i Sanity.',
    }),
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'localeString',
      description: 'Overskrift på teksten',
    }),
    defineField({
      type: 'array',
      name: 'innhold',
      title: 'Innhold',
      of: [{ type: 'reference', to: [{ type: 'innhold' }] }],
    }),
  ],
});
