import { defineField, defineType } from 'sanity';

export const Tekstbolk = defineType({
  name: 'tekstbolk',
  type: 'document',
  title: 'Tekstbolk',
  preview: {
    select: {
      title: 'overskrift.nb',
    },
  },
  fields: [
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
