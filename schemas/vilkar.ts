import { defineField, defineType } from 'sanity';

export const Vilkar = defineType({
  title: 'Vilkår',
  name: 'vilkar',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'tittel',
      type: 'string',
    }),
    defineField({
      title: 'Individuelle vurderinger',
      name: 'individuelleVurderinger',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'individuellVurdering' }] }],
    }),
  ],
});
