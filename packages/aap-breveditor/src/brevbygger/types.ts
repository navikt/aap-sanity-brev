import { InnholdType } from './enums';

export type BlokkInnholdTekst = {
  id: string;
  tekst: string;
  type: TekstType;
}

export type TekstType = InnholdType.TEKST | InnholdType.FAKTAGRUNNLAG;
