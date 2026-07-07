import { defineField, defineType } from 'sanity';
import { delmalRef } from './delmalRef';
import { ExclamationmarkTriangleIcon, PersonCheckmarkIcon, RobotIcon } from '@navikt/aksel-icons';

const distribusjonstype = {
  true: { subtitle: 'Sendes automatisk', media: RobotIcon },
  false: { subtitle: 'Må besluttes', media: PersonCheckmarkIcon },
  mangler: { subtitle: 'DISTRIBUSJON MANGLER', media: ExclamationmarkTriangleIcon },
} as const;

export const mal = defineType({
  title: 'Hovedmal',
  name: 'mal',
  type: 'document',
  preview: {
    select: {
      title: 'beskrivelse',
      kanSendesAutomatisk: 'kanSendesAutomatisk',
      delmaler: 'delmaler',
    },
    prepare(selection) {
      const { title, kanSendesAutomatisk, delmaler } = selection;
      const antallDelmaler = Array.isArray(delmaler) ? delmaler.length : 0;
      const status =
        kanSendesAutomatisk === true
          ? distribusjonstype.true
          : kanSendesAutomatisk === false
            ? distribusjonstype.false
            : distribusjonstype.mangler;

      return {
        title,
        subtitle: `${status.subtitle} · ${antallDelmaler} ${antallDelmaler === 1 ? 'delmal' : 'delmaler'}`,
        media: status.media,
      };
    },
  },
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
