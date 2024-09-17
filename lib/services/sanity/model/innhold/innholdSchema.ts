import { defineField, defineType } from 'sanity';
import { supportedLanguages } from 'sanity.config';

export const Innhold = defineType({
  name: 'innhold',
  type: 'document',
  title: 'Innhold',
  preview: {
    select: {
      title: 'tittel',
      language: 'language',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: supportedLanguages.find((lang) => lang.id === selection.language)?.title,
      };
    },
  },
  fields: [
    defineField({
      title: 'Teknisk navn',
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
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
