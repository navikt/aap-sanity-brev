import { getBrevtypeById } from 'lib/services/sanity/model/brevtype/brevtypeQuery';
import { innholdByIdQuery } from 'lib/services/sanity/model/innhold/innholdQuery';
import { tekstbolkByIdQuery } from 'lib/services/sanity/model/tekstbolk/tekstbolkQuery';
import styles from './page.module.css';
import { Blokk, BlokkInnhold, Brev, FormattertTekst, Innhold, Tekstbolk } from 'packages/aap-breveditor/src/types';
import {
  Content,
  Tekstbolk as SanityTekstBolk,
  Innhold as SanityInnhold,
  Brevtype,
} from 'packages/aap-sanity-schema-types';
import { v4 as uuidV4 } from 'uuid';
import { Brevbygger } from 'packages/aap-breveditor/src/brevbygger/Brevbygger';
import NavLogo from 'public/nav_logo.png';

type Params = Promise<{
  id: string;
}>;

const BrevmalPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const brev = await getBrevtypeById(id);

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
      <Brevbygger brevmal={brevmal} logo={NavLogo} />
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
            id: uuidV4(),
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
  // Merge liste elementger slik at de ikke rendres som separate lister
  const mergedContent = content?.reduce((accumulator: Content[], content: Content) => {
    if (accumulator.length === 0) return accumulator.concat(content);
    if (content.listItem === 'bullet' && accumulator[accumulator.length - 1]?.listItem === 'bullet') {
      const prevItem = accumulator[accumulator.length - 1];
      accumulator[accumulator.length - 1] = {
        ...prevItem,
        // Støtter foreløpig ikke nestede lister, eller lister med ulik formatering etc.
        children: prevItem.children?.concat(content.children ?? []),
      };
      return accumulator;
    }
    return accumulator.concat(content);
  }, []);

  return (
    mergedContent?.map((blokk) => {
      return {
        id: uuidV4(),
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
          id: uuidV4(),
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
    id: uuidV4(),
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
