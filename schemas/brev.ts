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
      description: 'Brevtype, eks "Vedtak"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brevTitler',
      type: 'array',
      title: 'brevTitler',
      description: 'Mulige titler på brevet',
      of: [{ type: 'reference', to: [{ type: 'brevtittel' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      title: 'Relevante vilkår',
      name: 'vilkar',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vilkar' }] }],
    }),
    defineField({
      title: 'Standardtekster',
      name: 'standardtekster',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'standardtekst' }] }],
    }),
  ],
});

export default brevmal;
