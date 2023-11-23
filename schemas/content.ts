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
    ],
    annotations: [
      defineField({
        type: 'reference',
        title: 'Referanse til variabel',
        to: [{ type: 'variabel' }],
        icon: () => '$',
      }),
      defineField({
        type: 'reference',
        title: 'Standard element',
        to: [{ type: 'standardElement' }],
        icon: () => 'SE',
      }),
    ],
  },
});
