import { defineType } from '@sanity/types';
import { defineField } from 'sanity';

export const Vilkarsvurdering = defineType({
  name: 'vilkarsvurdering',
  type: 'document',
  title: 'Vilkårsvurdering',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
      description: 'Tittel på vilkårsvurderingen fra AAP-Norge malen, eks "Yrkesskade ikke godkjent"',
    }),
    defineField({
      title: 'Innhold',
      name: 'innhold',
      type: 'array',
      of: [{ type: 'content' }],
      description: 'Avsnitt(ene) i vilkårsvurderingen.',
    }),
    /*defineField({
      type: 'string',
      name: 'relevantVilkår',
      title: 'Relevant vilkår', // eks 11-22
    }),
    defineField({
      name: 'vilkårOppfyllt',
      type: 'boolean',
      title: 'Vilkår oppfylt', // ja eller nei
    }),*/
  ],
});
