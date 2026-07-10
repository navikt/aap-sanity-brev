import { defineField, defineType } from 'sanity';
import { kategorisertTekstRef } from './kategorisertTekstRef';
import { fritekst } from './fritekst';

export const valg = defineType({
  name: 'valg',
  title: 'Valg',
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
      validation: (Rule) =>
        Rule.custom((alternativer: { _type: string; erDefault?: boolean }[] | undefined) => {
          const antallDefault = (alternativer ?? []).filter(
            (a) => a._type === 'kategorisertTekstRef' && a.erDefault === true
          ).length;
          return antallDefault <= 1 ? true : 'Kun ett alternativ kan være standard valg';
        }),
    }),
  ],
});
