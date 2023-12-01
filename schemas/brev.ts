import { defineType } from '@sanity/types';
import { defineField } from 'sanity';

const brevmal = defineType({
  name: 'brev',
  type: 'document',
  title: 'Brevmal',
  fields: [
    defineField({
      name: 'brevtype',
      type: 'string',
      title: 'Brevtype',
      description: 'Brevtype, eks "Vedtak". Vises kun i Sanity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brevtittel',
      type: 'string',
      title: 'Overskrift på brevet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'innhold',
      name: 'innhold',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'standardtekst' }, { type: 'systeminnhold' }] }],
    }),
  ],
});

export default brevmal;
