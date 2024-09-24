import { Brevmal } from 'lib/services/sanity/model/brevmal/brevmalSchema';
import { Content } from '../lib/services/sanity/model/content/contentSchema';
import { Standardtekst } from './standardtekst';
import { SystemVariabel } from './systemVariabel';
import { Systeminnhold } from './systeminnhold';
import { Overskriftsniva } from './overskriftsniva';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';
import { Innhold } from 'lib/services/sanity/model/innhold/innholdSchema';
import { Brevtype } from 'lib/services/sanity/model/brevtype/brevtypeSchema';
import { Tekstbolk } from 'lib/services/sanity/model/tekstbolk/tekstbolkSchema';
import { LocaleString } from 'lib/services/sanity/model/localization/localeStringSchema';

export const schemaTypes = [
  Brevmal,
  Brevtype,
  Content,
  Faktagrunnlag,
  Innhold,
  LocaleString,
  Systeminnhold,
  SystemVariabel,
  Standardtekst,
  Tekstbolk,
  Overskriftsniva,
];
