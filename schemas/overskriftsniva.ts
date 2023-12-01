import { defineField, defineType } from 'sanity';

export const Overskriftsniva = defineType({
  name: 'overskriftsniva',
  type: 'document',
  title: 'Overskriftsnivå',
  fields: [
    defineField({
      name: 'level',
      type: 'string',
      title: 'Nivå',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
  ],
});
