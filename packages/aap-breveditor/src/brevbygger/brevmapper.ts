import { Blokk, BlokkInnhold, Brev, Faktagrunnlag, FormattertTekst, Innhold, Tekstbolk } from '../types';
import { BlokkInnholdTekst } from './types';
import { v4 as uuidV4 } from 'uuid';

function mapBlokkInnholdTilFormatertTekst(blokkInnhold: BlokkInnhold): FormattertTekst {
  switch (blokkInnhold.type) {
    case 'TEKST':
      return blokkInnhold as FormattertTekst;
    case 'FAKTAGRUNNLAG':
      return {
        type: 'TEKST',
        id: blokkInnhold.id,
        tekst: `<${(blokkInnhold as Faktagrunnlag).visningsnavn}>`,
        formattering: [],
      };
  }
}

function slåSammenListeElementer(blokk: { id: string; innhold: BlokkInnhold[]; type: 'AVSNITT' | 'LISTE' }) {
  return blokk.innhold.reduce(
    (acc: string, curr: BlokkInnhold) => acc + `- ${mapBlokkInnholdTilFormatertTekst(curr).tekst}\n`,
    ''
  );
}

function mapFaktagrunnlag(blokk: { id: string; innhold: BlokkInnhold[]; type: 'AVSNITT' | 'LISTE' }) {
  const blokkInnhold = blokk.innhold.reduce((acc: FormattertTekst[], current: BlokkInnhold, index: number) => {
    if (current.type === 'FAKTAGRUNNLAG' || blokk.innhold[index - 1]?.type === 'FAKTAGRUNNLAG') {
      if (acc.length > 0) {
        const accLast = acc[acc.length - 1];

        return acc.slice(0, acc.length - 1).concat({
          ...accLast,
          tekst: accLast.tekst + mapBlokkInnholdTilFormatertTekst(current).tekst,
        });
      } else {
        return acc.concat(mapBlokkInnholdTilFormatertTekst(current));
      }
    } else {
      return acc.concat(mapBlokkInnholdTilFormatertTekst(current));
    }
  }, []);
  return blokkInnhold.flatMap((b) => (b as BlokkInnholdTekst).tekst);
}

function finnBlokkId(blokker: Blokk[]): string {
  return blokker.length ? blokker[0].id : uuidV4();
}

function finnInnholdId(blokker: Blokk[]): string {
  if (blokker.length) {
    if (blokker[0].innhold.length) {
      return blokker[0].innhold[0].id;
    }
  }
  return uuidV4();
}

function mapBlokker(blokker: Blokk[], kanRedigeres: boolean): Blokk[] {
  if (kanRedigeres) {
    const joinedText = blokker
      .flatMap((blokk) => {
        if (blokk.type === 'LISTE') {
          return slåSammenListeElementer(blokk);
        } else if (
          blokk.type === 'AVSNITT' &&
          blokk.innhold.find((blokkInnhold) => blokkInnhold.type === 'FAKTAGRUNNLAG')
        ) {
          return mapFaktagrunnlag(blokk);
        } else {
          return blokk.innhold.map((b) => (b as BlokkInnholdTekst).tekst).join();
        }
      })
      .join('\n\n');

    return [
      {
        id: finnBlokkId(blokker),
        type: 'AVSNITT',
        innhold: [
          {
            id: finnInnholdId(blokker),
            type: 'TEKST',
            tekst: joinedText,
            formattering: [],
          },
        ],
      },
    ];
  } else {
    return blokker.map((blokk: Blokk) => {
      return { ...blokk };
    });
  }
}

export function mapBrevmal(brevmal: Brev): Brev {
  return {
    ...brevmal,
    tekstbolker: brevmal.tekstbolker.map((blokk: Tekstbolk) => {
      return {
        ...blokk,
        innhold: blokk.innhold.map((innhold: Innhold) => {
          return {
            ...innhold,
            blokker: mapBlokker(innhold.blokker, innhold.kanRedigeres),
          };
        }),
      };
    }),
  };
}
