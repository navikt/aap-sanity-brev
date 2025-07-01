import React from 'react';
import { BlokkInnhold, FormattertTekst } from '../types';
import { InnholdType } from './enums';
import { BodyShort } from '@navikt/ds-react';

interface Props {
  blokkInnholdListe: BlokkInnhold[];
}

export const IkkeRedigerbarListe = ({ blokkInnholdListe }: Props) => {
  return (
    <ul className={'aap-brev-ikke-redigerbar-tekst'}>
      {blokkInnholdListe.map((blokkInnhold: BlokkInnhold) => {
        if (blokkInnhold.type === InnholdType.TEKST) {
          return (
            <li key={blokkInnhold.id}>
              <BodyShort spacing>{(blokkInnhold as FormattertTekst).tekst}</BodyShort>
            </li>
          );
        }
      })}
    </ul>
  );
};
