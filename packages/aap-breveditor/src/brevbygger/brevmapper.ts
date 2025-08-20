import { Blokk, BlokkInnhold, Brev, Faktagrunnlag, FormattertTekst, Innhold, Tekstbolk } from '../types';
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

function slåSammenListeElementer(blokk: Blokk) {
  return blokk.innhold.reduce(
    (acc: string, curr: BlokkInnhold) => acc + `- ${mapBlokkInnholdTilFormatertTekst(curr).tekst}\n`,
    ''
  );
}

function slåSammenBlokkInnhold(blokkInnhold: BlokkInnhold[]): string {
  if (blokkInnhold.length) {
    const formaterteTekstblokker = blokkInnhold.map((blokkInnhold) => {
      return mapBlokkInnholdTilFormatertTekst(blokkInnhold);
    });
    return formaterteTekstblokker.map((formattertTekst) => formattertTekst.tekst).join('');
  }
  return '';
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
      .map((blokk) => {
        if (blokk.type === 'LISTE') {
          return slåSammenListeElementer(blokk);
        } else {
          return slåSammenBlokkInnhold(blokk.innhold);
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
    return blokker;
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
