import { validerOversettelser } from 'lib/services/sanity/model/20250910/validering';
import { defineField, defineType } from 'sanity';

import { paragrafOptions } from './paragrafOptions';

export const delmal = defineType({
  title: 'Delmal',
  name: 'delmal',
  type: 'document',
  preview: {
    select: {
      title: 'beskrivelse',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      description: 'Brukes i Sanity',
      type: 'string',
    }),
    defineField({
      title: 'Brevbyggertittel',
      name: 'brevbyggerTittel',
      description: 'Brukes i brevbygger',
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
      validation: validerOversettelser,
    }),
  ],
});
