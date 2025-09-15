import { fritekst } from './fritekst';
import { tekst } from './tekst';
import { valg } from './valg';
import { delmal } from './delmal';
import { mal } from './mal';
import { faktagrunnlag } from './faktagrunnlag';
import { periodetekst } from './periodetekst';
import { valgGruppe } from './valgGruppe';
import { gruppertTekstRef } from './gruppertTekstRef';
import { betingetTekst } from './betingetTekst';
import { paragrafOptions } from 'lib/services/sanity/model/20250910/paragrafOptions';

export const schemaTypes = [
  tekst,
  fritekst,
  valg,
  mal,
  delmal,
  faktagrunnlag,
  periodetekst,
  valgGruppe,
  gruppertTekstRef,
  betingetTekst,
  paragrafOptions,
];
