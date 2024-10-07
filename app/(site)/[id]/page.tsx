import { Brevbygger, Brevmal } from 'components/brevbygger/Brevbygger';
import { getBrevtypeById } from 'lib/services/sanity/model/brevtype/brevtypeQuery';
import { innholdByIdQuery } from 'lib/services/sanity/model/innhold/innholdQuery';
import { tekstbolkByIdQuery } from 'lib/services/sanity/model/tekstbolk/tekstbolkQuery';
import { deserialize } from 'lib/services/tiptap/tipTapService';
import { PortableTextBlock } from 'next-sanity';
import styles from './page.module.css';

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

  const brevmal: Brevmal = {
    brevtittel: brev?.overskrift?.nb ?? '',
    personalia: {
      navn: 'Ola Nordmann',
      fødselsnummer: '12345678910',
      dato: new Date(),
      saksnnummer: '123456789',
    },
    blokker: tekstbolker.map((tekstbolk) => ({
      id: tekstbolk._id,
      overskrift: tekstbolk.overskrift?.nb ?? '',
      innhold:
        tekstbolk.innhold
          ?.map((innholdRef) => {
            const innholdByRef = innhold.find((innhold) => innhold._id === innholdRef._ref);
            if (!innholdByRef) {
              return null;
            }
            return {
              id: innholdByRef._id,
              type: 'tekst',
              riktekst: deserialize(innholdByRef.riktekst as PortableTextBlock[]),
              kanRedigeres: innholdByRef.kanRedigeres ?? false,
            };
          })
          .filter((innhold) => innhold != null) ?? [],
    })),
  };

  return (
    <div className={styles.page}>
      <Brevbygger brevmal={brevmal} />
    </div>
  );
};

export default BrevmalPage;
