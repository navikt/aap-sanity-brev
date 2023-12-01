import Brev from './brev';
import { Content } from './content';
import { Standardtekst } from './standardtekst';
import { SystemVariabel } from './systemVariabel';
import { InlineElement } from './inlineElement';
import { Systeminnhold } from './systeminnhold';
import { Overskriftsniva } from './overskriftsniva';

export const schemaTypes = [
  Brev,
  Content,
  Systeminnhold,
  SystemVariabel,
  Standardtekst,
  InlineElement,
  Overskriftsniva,
];
