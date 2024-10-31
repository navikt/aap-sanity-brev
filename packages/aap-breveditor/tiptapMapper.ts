import { JSONContent } from '@tiptap/core';
import { Blokk, FormattertTekst } from 'packages/aap-breveditor/types';
import { v4 as uuidV4 } from 'uuid';

export const mapBlokkInnholdToTipTapJsonContent = (blokkInnhold: Blokk[]): JSONContent => {
  const content = blokkInnhold?.map((block) => {
    const blockType = block.type;

    const innhold =
      block.innhold
        .map((innhold) => {
          const type = innhold.type;
          if (type === 'TEKST') {
            return mapFormattertTekstToTipTapJsonContent(innhold as FormattertTekst, blockType);
          }
          if (type === 'FAKTAGRUNNLAG') {
            return; // TODO: Implementer faktagrunnlag
          }
        })
        .filter((innhold) => innhold != undefined) ?? [];

    return { type: mapPortableTextElementToTipTapElement(blockType), content: innhold, fellesformatBlokkId: block.id };
  });
  return { type: 'doc', content };
};

export const mapFormattertTekstToTipTapJsonContent = (
  formattertTekst: FormattertTekst,
  blockType: string
): JSONContent => {
  const tekstInnhold = formattertTekst as FormattertTekst;
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
    return {
      type: 'listItem',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: tekstInnhold.tekst }] }],
      fellesformatFormattertTekstId: tekstInnhold.id,
    };
  }
  return { type: 'text', text: tekstInnhold.tekst, marks, fellesformatFormattertTekstId: tekstInnhold.id };
};

type TipTapMark = 'bold' | 'italic' | 'underline' | 'normal';
export const mapPortableTextMarkToTipTapMarks = (value: string): TipTapMark | null => {
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
};

type TipTapElement = 'paragraph' | 'bulletList';
export const mapPortableTextElementToTipTapElement = (value: Blokk['type']): TipTapElement => {
  switch (value) {
    case 'AVSNITT':
      return 'paragraph';
    case 'LISTE':
      return 'bulletList';
    default:
      return 'paragraph';
  }
};

export const mapTipTapJsonContentToBlokkInnhold = (jsonContent: JSONContent): Blokk[] => {
  return (
    jsonContent.content?.map((block) => {
      return {
        id: block.fellesformatBlokkId ?? uuidV4(),
        type: block.type === 'listItem' ? 'LISTE' : 'AVSNITT',
        innhold:
          block.content
            ?.map((content) => {
              console.log('content', content);
              if (content.type === 'text') {
                const tekst: FormattertTekst = {
                  id: content.fellesformatFormattertTekstId,
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
