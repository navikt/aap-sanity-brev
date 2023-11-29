import Brev from './brev';
import { Content } from './content';
import { Standardtekst } from './standardtekst';
import { IndividuellVurdering } from './individuellVurdering';
import { SystemVariabel } from './systemVariabel';
import { Vilkar } from './vilkar';
import { Brevtittel } from './brevtittel';
import { InlineElement } from './inlineElement';
import { BlockElement } from './blockElement';
import { Systeminnhold } from './fritekst';

export const schemaTypes = [
  BlockElement,
  Brev,
  Brevtittel,
  Content,
  Systeminnhold,
  IndividuellVurdering,
  SystemVariabel,
  Vilkar,
  Standardtekst,
  InlineElement,
];
