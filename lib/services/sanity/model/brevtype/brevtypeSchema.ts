import { defineField, defineType } from 'sanity';

export const Brevtype = defineType({
  name: 'brevtype',
  type: 'document',
  title: 'Brevtype',
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
