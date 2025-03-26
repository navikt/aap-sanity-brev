import { defineField, defineType } from 'sanity';

export const Brevtype = defineType({
  name: 'brevtype',
  type: 'document',
  title: 'Brevtype',
  preview: {
    select: {
      title: 'overskrift.nb',
    },
  },
  fields: [
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'localeString',
      description: 'Overskrift på brevet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Journalpost tittel',
      name: 'journalpostTittel',
      type: 'localeString',
      description: 'Tittel på journalposten',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Kan overstyre brevtittel',
      name: 'kanOverstyreBrevtittel',
      type: 'boolean',
      description: 'Styrer om brevtittelen kan overstyres i breveditoren',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Unikt navn som brukes av brevløsningen for å skille på brevtypene, må settes av en utvikler',
      readOnly: ({ currentUser }) => !currentUser?.roles.find((x) => x.name === 'developer'),
    }),
    defineField({
      title: 'Tekstbolker',
      name: 'tekstbolker',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tekstbolk' }] }],
    }),
    defineField({
      title: 'Kan sendes automatisk',
      name: 'kanSendesAutomatisk',
      type: 'boolean',
      description:
        'Vil la brevløsningen sende brevet automatisk til bruker uten manuell input fra saksbehandler eller veileder. Forutsetter at alle tekster i brevet er markert som ferdigstilt og ikke redigerbare.',
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
  ],
});
