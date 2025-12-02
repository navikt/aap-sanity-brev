import { defineField, defineType } from 'sanity';
import { delmalRef } from './delmalRef';

export const mal = defineType({
  title: 'Hovedmal',
  name: 'mal',
  type: 'document',
  fields: [
    defineField({
      title: 'Beskrivelse',
      name: 'beskrivelse',
      description: 'Brukes i Sanity og brevbygger',
      type: 'string',
    }),
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      description: 'Vises i brevet',
      type: 'internationalizedArrayString',
    }),
    defineField({
      title: 'Journalposttittel',
      name: 'journalposttittel',
      type: 'string', // enum?
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Kan sendes automatisk',
      name: 'kanSendesAutomatisk',
      description: 'Styrer om brevet kan sendes automatisk eller om det må via en saksbehandler',
      validation: (rule) => rule.required(),
      initialValue: false,
      type: 'boolean',
    }),
    defineField({
      title: 'Delmaler',
      name: 'delmaler',
      type: 'array',
      of: [delmalRef],
    }),
  ],
});
