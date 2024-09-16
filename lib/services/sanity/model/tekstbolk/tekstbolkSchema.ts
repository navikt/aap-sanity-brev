import { defineField, defineType } from 'sanity';

export const Tekstbolk = defineType({
  name: 'tekstbolk',
  type: 'document',
  title: 'Tekstbolk',
  fields: [
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'string',
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
