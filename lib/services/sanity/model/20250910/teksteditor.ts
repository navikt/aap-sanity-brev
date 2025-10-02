import { defineField } from 'sanity';
import { valgRef } from './valgRef';
import { periodetekstRef } from './periodetekstRef';
import { betingetTekstRef } from './betingetTekstRef';
import { fritekst } from './fritekst';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';

export const teksteditor = defineField({
  name: 'teksteditor',
  type: 'array',
  of: [
    valgRef,
    periodetekstRef,
    betingetTekstRef,
    fritekst,
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
})