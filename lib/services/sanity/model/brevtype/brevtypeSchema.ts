import { defineField, defineType } from 'sanity';

export const Brevtype = defineType({
  name: 'brevtype',
  type: 'document',
  title: 'Brevtype',
  fields: [
    // Støtte flere språk
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'string',
      description: 'Overskrift på brevet',
    }),
    defineField({
      title: 'Tekstbolker',
      name: 'tekstbolker',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tekstbolk' }] }],
    }),
  ],
});
