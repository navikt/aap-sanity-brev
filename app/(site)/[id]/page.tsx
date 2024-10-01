import { Heading } from '@navikt/ds-react';
import { Breveditor } from 'components/breveditor/Breveditor';
import { getBrevtypeById } from 'lib/services/sanity/model/brevtype/brevtypeQuery';
import { innholdByIdQuery } from 'lib/services/sanity/model/innhold/innholdQuery';
import { tekstbolkByIdQuery } from 'lib/services/sanity/model/tekstbolk/tekstbolkQuery';
import { deserialize } from 'lib/services/tiptap/tipTapService';
import { PortableTextBlock } from 'next-sanity';

interface Props {
  id: string;
}

const BrevmalPage = async ({ params }: { params: Props }) => {
  const brev = await getBrevtypeById(params.id);

  const tekstbolker = await Promise.all(
    brev?.tekstbolker?.map((tekstbolk) => tekstbolkByIdQuery(tekstbolk._ref)) ?? []
  );

  const innholdRef = tekstbolker
    .map((tekstbolk) => tekstbolk.innhold?.map((innhold) => innhold._ref))
    .flat()
    .filter((ref) => ref != undefined);
  const innhold = await Promise.all(innholdRef.map((ref) => innholdByIdQuery(ref)));

  return (
    <div>
      <Heading level="1" size="xlarge">
        {brev?.overskrift?.nb}
      </Heading>
      {tekstbolker.map((tekstbolk) => {
        return (
          <div key={tekstbolk._id}>
            <Heading level="2" size="large">
              {tekstbolk.overskrift?.nb}
            </Heading>
            {tekstbolk.innhold?.map((innholdRef) => {
              const innholdByRef = innhold.find((innhold) => innhold._id === innholdRef._ref);
              if (!innholdByRef) {
                return null;
              }
              return (
                <div key={innholdByRef._id}>
                  <Breveditor
                    initialValue={deserialize(innholdByRef.riktekst as PortableTextBlock[])}
                    brukEditor={innholdByRef.kanRedigeres ?? false}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BrevmalPage;
