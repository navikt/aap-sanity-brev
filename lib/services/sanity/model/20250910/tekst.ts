import { defineField, defineType } from 'sanity';
import { validerOversettelser } from 'lib/services/sanity/model/20250910/validering';

export const tekst = defineType({
  title: 'Tekst',
  name: 'tekst',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      description: 'Brukes i brevbygger',
      type: 'string',
    }),
    defineField({
      title: 'Editor',
      name: 'teksteditor',
      type: 'internationalizedArrayBlockEditor',
      validation: validerOversettelser,
    }),
  ],
});
