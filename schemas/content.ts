import { defineArrayMember, defineField } from 'sanity';

const blockContent = {
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
};

export const Content = defineArrayMember({
  ...blockContent,
  type: 'block',
  name: 'content',
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

export const ContentUtenVariabler = defineArrayMember({ ...blockContent, type: 'block', name: 'contentUtenVariabler' });
