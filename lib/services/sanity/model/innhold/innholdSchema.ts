import { defineField, defineType } from 'sanity';

export const Innhold = defineType({
  name: 'innhold',
  type: 'document',
  title: 'Innhold',
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
    }),
    // TODO: Lokalisering av riktekst. Støtte for bokmål, nynorsk og kanskje engelsk.
    defineField({
      title: 'Riktekst',
      name: 'riktekst',
      type: 'array',
      of: [{ type: 'content' }],
      description: 'Avsnitt(ene) i innholdet.',
    }),
    defineField({
      title: 'Kan redigeres',
      name: 'kanRedigeres',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Er fullstendig',
      name: 'erFullstendig',
      type: 'boolean',
      description:
        'Et hint om at teksten er fullstendig og ikke trenger å redigeres og ikke trenger redigering av saksbehandler',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
