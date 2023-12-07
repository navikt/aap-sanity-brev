import { defineType } from '@sanity/types';
import { defineField } from 'sanity';

interface Context {
  parent: {
    niva: string;
    overskrift: string;
  };
}
export const Standardtekst = defineType({
  name: 'standardtekst',
  type: 'document',
  title: 'Standardtekst',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Beskrivelse',
      description: 'Denne vises kun i Sanity.',
    }),
    defineField({
      name: 'overskrift',
      type: 'string',
      title: 'Overskrift',
      description: 'Overskrift på innholdet. Ikke obligatorisk',
      validation: (Rule) =>
        Rule.custom((overskrift, context) => {
          const { parent } = context as Context;
          return parent.niva && overskrift === undefined ? 'Overskrift må være satt når overskriftsnivå er satt' : true;
        }),
    }),
    defineField({
      name: 'niva',
      type: 'reference',
      title: 'Overskriftsnivå',
      to: { type: 'overskriftsniva' },
      validation: (Rule) =>
        Rule.custom((niva, context) => {
          const { parent } = context as Context;
          return parent.overskrift && niva === undefined ? 'Overskriftsnivå må være satt når overskrift er satt' : true;
        }),
    }),
    defineField({
      title: 'Innhold',
      name: 'innhold',
      type: 'array',
      of: [{ type: 'content' }],
      description: 'Avsnitt(ene) i standardteksten.',
    }),
    defineField({
      name: 'kanRedigeres',
      type: 'boolean',
      title: 'Kan redigeres', // ja eller nei
      initialValue: false,
    }),
    defineField({
      title: 'Hjelpetekst',
      name: 'hjelpetekst',
      type: 'array',
      of: [{ type: 'contentUtenVariabler' }],
      description:
        'IKKE OBLIGATORISK. En tekst som forklarer saksbehandler hvordan de kan bruke denne standardteksten. Vises som et hjelpeikon i brevløsningen.',
    }),
  ],
});
