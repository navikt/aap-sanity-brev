import { client } from 'lib/services/sanity/client';
import { groq } from 'next-sanity';
import { Innhold } from 'packages/aap-sanity-schema-types';

const innholdByIdGroq = groq`
*[ _type == 'innhold' && _id == $id][0]
`;

export const innholdByIdQuery = async (id: string): Promise<Innhold> => {
  return await client.fetch(innholdByIdGroq, { id });
};
