import { defineField, defineType } from 'sanity';

export const Content = defineType({
  type: 'block',
  name: 'content',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [{ title: 'Punktliste', value: 'bullet' }],
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
      name: 'faktagrunnlag',
      to: [{ type: 'faktagrunnlag' }],
    }),
  ],
});
