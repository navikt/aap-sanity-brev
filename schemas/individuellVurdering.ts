import { defineType } from '@sanity/types';
import { defineField } from 'sanity';

export const IndividuellVurdering = defineType({
  name: 'individuellVurdering',
  type: 'document',
  title: 'Individuelle vurderinger',
  fields: [
    defineField({
      name: 'tittel',
      type: 'string',
      title: 'Tittel',
      description: 'Tittel på den individuelle vurderingen fra AAP-Norge malen, eks "Yrkesskade ikke godkjent"',
    }),
    defineField({
      title: 'Referanse til mal',
      name: 'referanseTilMal',
      type: 'string',
      description: 'Eks: AAP Norge mal, med kapittelnummer og tittel.',
    }),
    defineField({
      title: 'Innhold',
      name: 'innhold',
      type: 'array',
      of: [{ type: 'content' }],
      description: 'Avsnitt(ene) i den individuelle vurderingen.',
    }),
    defineField({
      name: 'vilkarOppfyllt',
      type: 'boolean',
      title: 'Vilkår oppfylt', // ja eller nei
    }),
    defineField({
      name: 'kanRedigeres',
      type: 'boolean',
      title: 'Kan redigeres', // ja eller nei
      initialValue: false,
    }),
    defineField({
      name: 'erGodkjent',
      type: 'boolean',
      title: 'Er godkjent og kan publiseres i løsningen', // ja eller nei
      initialValue: false,
    }),
  ],
});
