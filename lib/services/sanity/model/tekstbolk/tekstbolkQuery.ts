import { client } from 'lib/services/sanity/client';
import { groq } from 'next-sanity';
import { Tekstbolk } from 'packages/aap-sanity-schema-types';

const tekstbolkGroq = groq`
  *[_type == 'tekstbolk' && _id == $id][0]
`;

export const tekstbolkByIdQuery = async (id: string): Promise<Tekstbolk> => {
  return await client.fetch(tekstbolkGroq, { id });
};
