import { client } from 'lib/services/sanity/client';
import { groq } from 'next-sanity';
import { Brevtype } from 'packages/aap-sanity-schema-types';

export interface BrevtypeOversikt {
  overskrift: string;
  _id: string;
}

const alleBrevtyperGroq = groq`
  *[_type=='brevtype']{
    "overskrift": overskrift.nb,
    _id,
  }`;

export const getAlleBrevtyper = async (): Promise<BrevtypeOversikt[]> => {
  return await client.fetch(alleBrevtyperGroq);
};

const brevtypeByIdGroq = groq`
*[ _type == 'brevtype' && _id == $id][0]`;

export const getBrevtypeById = async (id: string): Promise<Brevtype> => {
  return await client.fetch(brevtypeByIdGroq, { id });
};
