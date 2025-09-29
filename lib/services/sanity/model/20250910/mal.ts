import { defineField, defineType } from 'sanity';
import { delmalRef } from './delmalRef';

export const mal = defineType({
  title: 'Mal',
  name: 'mal',
  type: 'document',
  fields: [
    defineField({
      title: 'Intern tittel',
      name: 'internTittel',
      description: 'Vises kun i Sanity',
      type: 'string',
    }),
    defineField({
      title: 'Overskrift',
      name: 'overskrift',
      type: 'internationalizedArrayString',
    }),
    defineField({
      title: 'Journalposttittel',
      name: 'journalposttittel',
      type: 'string', // enum?
    }),
    defineField({
      title: 'Kan sendes automatisk',
      name: 'kanSendesAutomatisk',
      description: 'Styrer om brevet kan sendes automatisk eller om det må via en saksbehandler',
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
