import { client } from 'lib/services/sanity/client';
import { groq } from 'next-sanity';

export interface Brevtype {
  overskrift: string;
  _id: string;
}

const alleBrevtyperGroq = groq`
  *[_type=='brevtype']{
    "overskrift": overskrift.nb,
    _id,
  }`;

export const getAlleBrevtyper = async (): Promise<Brevtype[]> => {
  return await client.fetch(alleBrevtyperGroq);
};
