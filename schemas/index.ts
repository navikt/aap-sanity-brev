import { Content } from '../lib/services/sanity/model/content/contentSchema';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';
import { Innhold } from 'lib/services/sanity/model/innhold/innholdSchema';
import { Brevtype } from 'lib/services/sanity/model/brevtype/brevtypeSchema';
import { Tekstbolk } from 'lib/services/sanity/model/tekstbolk/tekstbolkSchema';
import { LocaleString } from 'lib/services/sanity/model/localization/localeStringSchema';
import { tekst } from 'lib/services/sanity/model/20250910/tekst';
import { valg } from 'lib/services/sanity/model/20250910/valg';
import { mal } from 'lib/services/sanity/model/20250910/mal';
import { delmal } from 'lib/services/sanity/model/20250910/delmal';
import { periodetekst } from 'lib/services/sanity/model/20250910/periodetekst';
import { kategori } from 'lib/services/sanity/model/20250910/kategori';

export const schemaTypes = [
  // Gammel struktur:
  Brevtype,
  Content,
  Faktagrunnlag,
  Innhold,
  LocaleString,
  Tekstbolk,

  // Ny struktur (gjenbruker kun Faktagrunnlag):
  tekst,
  valg,
  mal,
  delmal,
  periodetekst,
  kategori,
];
