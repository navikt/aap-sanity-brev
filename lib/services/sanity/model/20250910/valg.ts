import { defineField, defineType } from 'sanity';

import { fritekst } from './fritekst';
import { kategorisertTekstRef } from './kategorisertTekstRef';

export const valg = defineType({
  name: 'valg',
  title: 'Undervalg',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      description: 'Brukes i brevbygger',
      type: 'string',
    }),
    defineField({
      title: 'Språk',
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'alternativer',
      title: 'Alternativer',
      type: 'array',
      of: [kategorisertTekstRef, fritekst],
    }),
  ],
});
