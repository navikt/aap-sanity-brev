import { defineField } from 'sanity';
import { valgRef } from './valgRef';
import { betingetTekstRef } from './betingetTekstRef';
import { fritekst } from './fritekst';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';
import { tabell } from './tabell';

export const teksteditor = defineField({
  name: 'teksteditor',
  type: 'array',
  of: [
    valgRef,
    betingetTekstRef,
    fritekst,
    {
      type: 'reference',
      title: 'Tabell',
      name: 'tabell',
      to: [tabell],
    },
    {
      type: 'block',
      of: [
        {
          type: 'reference',
          title: 'Referanse til faktagrunnlag',
          name: 'faktagrunnlag',
          to: [Faktagrunnlag],
        },
      ],
    },
  ],
});
