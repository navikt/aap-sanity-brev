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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Unikt navn som brukes av brevløsningen for å skille på brevtypene, må settes av en utvikler',
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
    defineField({
      title: 'Tekstbolker',
      name: 'tekstbolker',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tekstbolk' }] }],
    }),
  ],
});
