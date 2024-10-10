import { Brevbygger } from 'components/brevbygger/Brevbygger';
import { getBrevtypeById } from 'lib/services/sanity/model/brevtype/brevtypeQuery';
import { innholdByIdQuery } from 'lib/services/sanity/model/innhold/innholdQuery';
import { tekstbolkByIdQuery } from 'lib/services/sanity/model/tekstbolk/tekstbolkQuery';
import styles from './page.module.css';
import { Blokk, BlokkInnhold, Brev, FormattertTekst, Innhold, Tekstbolk } from 'packages/aap-breveditor/types';
import {
  Content,
  Tekstbolk as SanityTekstBolk,
  Innhold as SanityInnhold,
  Brevtype,
} from 'packages/aap-sanity-schema-types';

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

  const brevmal = mapBrevFraSanity(brev, tekstbolker, innhold);

  return (
    <div className={styles.page}>
      <Brevbygger brevmal={brevmal} />
    </div>
  );
};

export default BrevmalPage;

export const mapBlokkInnholdFraSanity = (content: Content): BlokkInnhold[] => {
  const blokkInnhold: BlokkInnhold[] =
    content.children
      ?.map((child) => {
        if (child._type === 'span') {
          const innhold: FormattertTekst = {
            type: 'TEKST',
            tekst: child.text ?? '',
            formattering: child.marks?.map((mark) => mapMarkFraSanity(mark)).filter((mark) => mark != undefined) ?? [],
          };
          return innhold;
        }
        // TODO: Støtte faktagrunnlag
        return null;
      })
      .filter((child) => child != null) ?? [];
  return blokkInnhold;
};

export const mapBlokkerFraSanity = (content?: Content[]): Blokk[] => {
  return (
    content?.map((blokk) => {
      return {
        type: blokk.listItem ? 'LISTE' : 'AVSNITT',
        innhold: mapBlokkInnholdFraSanity(blokk),
      };
    }) ?? []
  );
};

export const mapTekstBolkBlokkInnholdFraSanity = (
  sanityTekstBolk: SanityTekstBolk,
  innhold: SanityInnhold[]
): Innhold[] => {
  return (
    sanityTekstBolk.innhold
      ?.map((sanityInnhold) => {
        const innholdByRef = innhold.find((innhold) => innhold._id === sanityInnhold._ref);
        if (!innholdByRef) {
          return null;
        }
        return {
          overskrift: innholdByRef.overskrift ?? '',
          erFullstendig: innholdByRef.erFullstendig ?? false,
          kanRedigeres: innholdByRef.kanRedigeres ?? false,
          blokker: mapBlokkerFraSanity(innholdByRef.riktekst),
        };
      })
      .filter((innhold) => innhold != null) ?? []
  );
};

export const mapTekstBolkerFraSanity = (tekstbolker: SanityTekstBolk[], innhold: SanityInnhold[]): Tekstbolk[] => {
  return tekstbolker.map((tekstbolk) => ({
    overskrift: tekstbolk.overskrift?.nb ?? '',
    innhold: mapTekstBolkBlokkInnholdFraSanity(tekstbolk, innhold),
  }));
};

export const mapBrevFraSanity = (brev: Brevtype, tekstbolker: SanityTekstBolk[], innhold: SanityInnhold[]): Brev => {
  return {
    overskrift: brev?.overskrift?.nb ?? '',
    tekstbolker: mapTekstBolkerFraSanity(tekstbolker, innhold),
  };
};

export const mapMarkFraSanity = (mark: string): 'FET' | 'KURSIV' | 'UNDERSTREK' | undefined => {
  switch (mark) {
    case 'strong':
      return 'FET';
    case 'italic':
      return 'KURSIV';
    case 'underline':
      return 'UNDERSTREK';
  }
};
