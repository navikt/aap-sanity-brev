import { defineArrayMember, defineField } from 'sanity';

export const Content = defineArrayMember({
  type: 'block',
  name: 'content',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Fet', value: 'strong' },
      { title: 'Kursiv', value: 'em' },
      { title: 'Understrek', value: 'underline' },
    ],
    annotations: [],
  },

  of: [
    defineField({
      type: 'reference',
      title: 'Referanse til variabel',
      name: 'systemVariabel',
      to: [{ type: 'systemVariabel' }],
    }),
    defineField({
      name: 'inlineElement',
      type: 'reference',
      to: [{ type: 'inlineElement' }],
    }),
  ],
});
