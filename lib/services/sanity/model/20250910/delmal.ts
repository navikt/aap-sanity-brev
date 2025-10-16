import { defineField, defineType } from 'sanity';
import { paragrafOptions } from './paragrafOptions';

export const delmal = defineType({
  title: 'Delmal',
  name: 'delmal',
  type: 'document',
  preview: {
    select: {
      title: 'internTittel',
      paragraf: 'paragraf',
    },
    prepare(selection) {
      const { title, paragraf } = selection;
      return {
        title: title,
        subtitle: paragraf ? `§ ${paragraf}` : '',
      };
    },
  },
  fields: [
    defineField({
      title: 'Intern tittel',
      name: 'internTittel',
      description: 'Vises kun i Sanity',
      type: 'string',
    }),
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      description: 'Vises i brevet',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'paragraf',
      title: 'Paragraf',
      type: 'string',
      options: {
        list: paragrafOptions,
      },
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'internationalizedArrayTeksteditor',
    }),
  ],
});
