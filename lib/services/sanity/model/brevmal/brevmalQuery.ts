import { client } from 'lib/services/sanity/client';
import { groq, PortableTextBlock } from 'next-sanity';

export interface EnkelBrevmal {
  brevtittel: string;
  _id: string;
  brevtype: string;
}

const alleBrevmalerGroq = groq`
*[_type=='brev']{
  brevtittel,
  _id,
  brevtype
}`;

export const getAlleBrevmaler = async (): Promise<EnkelBrevmal[]> => {
  return await client.fetch(alleBrevmalerGroq);
};

export type Nivå = 'H1' | 'H2' | 'H3';

export interface Brevmal {
  brevtittel: string;
  innhold: Systeminnhold[] | Standardtekst[];
}

export interface Innhold {
  _id: string;
  overskrift?: string;
  nivå?: Nivå;
}

interface Systeminnhold extends Innhold {
  _type: 'systeminnhold';
  systemNokkel: string;
}

interface Standardtekst extends Innhold {
  _type: 'standardtekst';
  niva: Nivå;
  kanRedigeres: boolean;
  innhold: PortableTextBlock[];
}

const brevmalGroq = groq`*[_id == $brevmalId][0]{
    brevtittel,
    innhold[] -> {
      _type,
      _id,
      _type == 'systeminnhold' => {
        systemNokkel,
        overskrift,
        "niva": niva->.level
      },
      _type == 'standardtekst' => {
        overskrift,
        "niva": niva->.level,
        kanRedigeres,
          innhold[]{
          _type == 'content' => {
            ...,
            children[] {
              ...,
              _type == 'systemVariabel' => {
                ...,
                "systemVariabel": @->.tekniskNavn
              },
              _type == 'inlineElement' => {
                ...,
                "text": @->.tekst
              },
            }
          }
        }
      }
    }
  }`;

export const getBrevmalByBrevmalId = async (brevmalId: string): Promise<Brevmal> => {
  return await client.fetch(brevmalGroq, { brevmalId });
};
