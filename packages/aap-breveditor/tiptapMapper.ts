import { JSONContent } from '@tiptap/core';
import { Blokk, FormattertTekst, Innhold, Tekstbolk } from 'packages/aap-breveditor/types';
import { v4 as uuidv4 } from 'uuid';

export interface TipTopBlokk {
  id: string;
  overskrift?: string;
  innhold: Array<TipTapInnhold>;
}

export interface TipTapInnhold {
  id: string;
  overskrift?: string;
  riktekst: JSONContent;
  kanRedigeres: boolean;
}

export const mapBlokkerTilTipTap = (blokker: Tekstbolk[]): TipTopBlokk[] => {
  return blokker.map((blokk) => {
    return {
      id: uuidv4(),
      overskrift: blokk.overskrift ?? '',
      innhold: mapInnholdTilTipTap(blokk.innhold),
    };
  });
};

export const mapInnholdTilTipTap = (innhold: Innhold[]): TipTapInnhold[] => {
  return innhold.map((innhold) => {
    return {
      id: uuidv4(),
      overskrift: innhold.overskrift ?? '',
      riktekst: mapBlokkInnholdToTipTapJsonContent(innhold.blokker),
      kanRedigeres: innhold.kanRedigeres ?? false,
    };
  });
};

export const mapBlokkInnholdToTipTapJsonContent = (blokkInnhold: Blokk[]): JSONContent => {
  const content = blokkInnhold?.map((block) => {
    const blockType = block.type;

    const innhold =
      block.innhold
        .map((innhold) => {
          const type = innhold.type;
          if (type === 'TEKST') {
            const tekstInnhold = innhold as FormattertTekst;
            const marks =
              tekstInnhold.formattering
                .map((mark) => {
                  const markType = mapPortableTextMarkToTipTapMarks(mark);
                  if (markType) {
                    return { type: markType };
                  }
                })
                .filter((mark) => mark != undefined) ?? [];
            if (blockType === 'LISTE') {
              return { type: 'listItem', content: [{ type: 'text', text: tekstInnhold.tekst }] };
            }
            return { type: 'text', text: tekstInnhold.tekst, marks };
          }
        })
        .filter((innhold) => innhold != undefined) ?? [];

    return { type: mapPortableTextElementToTipTapElement(blockType), content: innhold };
  });
  return { type: 'doc', content };
};

type TipTapMark = 'bold' | 'italic' | 'underline' | 'normal';
function mapPortableTextMarkToTipTapMarks(value: string): TipTapMark | null {
  switch (value) {
    case 'FET':
      return 'bold';
    case 'KURSIV':
      return 'italic';
    case 'UNDERSTREK':
      return 'underline';
    default:
      return null;
  }
}

type TipTapElement = 'paragraph' | 'bulletList';
function mapPortableTextElementToTipTapElement(value: Blokk['type']): TipTapElement {
  switch (value) {
    case 'AVSNITT':
      return 'paragraph';
    case 'LISTE':
      return 'bulletList';
    default:
      return 'paragraph';
  }
}

export const mapTipTapBolkerTilTekstbolker = (blokker: TipTopBlokk[]): Tekstbolk[] => {
  return blokker.map((blokk) => {
    return {
      overskrift: blokk.overskrift,
      innhold: mapTipTapInnholdToBrevInnhold(blokk.innhold),
    };
  });
};

export const mapTipTapInnholdToBrevInnhold = (innhold: TipTapInnhold[]): Innhold[] => {
  return innhold.map((innhold) => {
    return {
      overskrift: innhold.overskrift ?? '',
      kanRedigeres: innhold.kanRedigeres,
      blokker: mapTipTapJsonContentToBlokkInnhold(innhold.riktekst),
      erFullstendig: true,
    };
  });
};

export const mapTipTapJsonContentToBlokkInnhold = (jsonContent: JSONContent): Blokk[] => {
  return (
    jsonContent.content?.map((block) => {
      return {
        type: block.type === 'listItem' ? 'LISTE' : 'AVSNITT',
        innhold:
          block.content
            ?.map((content) => {
              console.log('content', content);
              if (content.type === 'text') {
                const tekst: FormattertTekst = {
                  type: 'TEKST',
                  tekst: content.text ?? '',
                  formattering: [], // content.marks?.map((mark) => mark.type) ?? [],
                };
                return tekst;
              }
              return;
            })
            .filter((content) => content != undefined) ?? [],
      };
    }) ?? []
  );
};
