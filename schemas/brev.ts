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
      description: 'Brevtype, eks "Vedtak om avslag"',
    }),
    defineField({
      title: 'Vilkårsvurderinger',
      name: 'vilkarsvurderinger',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vilkarsvurdering' }] }],
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
