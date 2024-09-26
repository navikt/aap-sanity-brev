import { Content } from '../lib/services/sanity/model/content/contentSchema';
import { Faktagrunnlag } from 'lib/services/sanity/model/faktagrunnlag/faktagrunnlagSchema';
import { Innhold } from 'lib/services/sanity/model/innhold/innholdSchema';
import { Brevtype } from 'lib/services/sanity/model/brevtype/brevtypeSchema';
import { Tekstbolk } from 'lib/services/sanity/model/tekstbolk/tekstbolkSchema';
import { LocaleString } from 'lib/services/sanity/model/localization/localeStringSchema';

export const schemaTypes = [Brevtype, Content, Faktagrunnlag, Innhold, LocaleString, Tekstbolk];
