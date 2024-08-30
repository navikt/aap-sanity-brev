import { Brevmal } from 'lib/services/sanity/model/brevmal/brevmalSchema';
import { Content, ContentUtenVariabler } from './content';
import { Standardtekst } from './standardtekst';
import { SystemVariabel } from './systemVariabel';
import { InlineElement } from './inlineElement';
import { Systeminnhold } from './systeminnhold';
import { Overskriftsniva } from './overskriftsniva';

export const schemaTypes = [
  Brevmal,
  Content,
  ContentUtenVariabler,
  Systeminnhold,
  SystemVariabel,
  Standardtekst,
  InlineElement,
  Overskriftsniva,
];
