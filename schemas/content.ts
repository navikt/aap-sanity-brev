import { defineArrayMember } from 'sanity';

export const Content = defineArrayMember({
  type: 'block',
  name: 'content',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [],
  },
});
