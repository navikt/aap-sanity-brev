import {
  mapBlokkInnholdToTipTapJsonContent,
  mapPortableTextElementToTipTapElement,
  mapPortableTextMarkToTipTapMarks,
} from 'packages/aap-breveditor/tiptapMapper';
import { Blokk } from 'packages/aap-breveditor/types';
import { describe, expect, it } from 'vitest';

describe('mapPortableTextMarkToTipTapMarks', () => {
  it('skal returnere bold for input FET', () => {
    expect(mapPortableTextMarkToTipTapMarks('FET')).toBe('bold');
  });
  it('skal returnere italic for input KURSIV', () => {
    expect(mapPortableTextMarkToTipTapMarks('KURSIV')).toBe('italic');
  });
  it('skal returnere underline for input UNDERSTREK', () => {
    expect(mapPortableTextMarkToTipTapMarks('UNDERSTREK')).toBe('underline');
  });
  it('skal returnere null for annen input', () => {
    expect(mapPortableTextMarkToTipTapMarks('tilfeldig input')).toBe(null);
  });
});

describe('mapPortableTextElementToTipTapElement', () => {
  it('skal returnere paragraph for input AVSNITT', () => {
    expect(mapPortableTextElementToTipTapElement('AVSNITT')).toBe('paragraph');
  });
  it('skal returnere bulletListfor input LISTE', () => {
    expect(mapPortableTextElementToTipTapElement('LISTE')).toBe('bulletList');
  });
});

describe('mapBlokkInnholdToTipTapJsonContent', () => {
  it('skal ha type "doc" på rotnivå', () => {
    const result = mapBlokkInnholdToTipTapJsonContent([]);
    expect(result.type).toBe('doc');
  });
  it('skal ha tomt content array dersom blokkInnhold er tomt', () => {
    const result = mapBlokkInnholdToTipTapJsonContent([]);
    expect(result.content).toEqual([]);
  });
  it('skal mappe lister i blokkinnhold til riktig tiptap format', () => {
    const blokkInnhold: Blokk[] = [
      {
        id: '1',
        type: 'LISTE',
        innhold: [
          {
            id: '1',
            type: 'TEKST',
            tekst: 'Dette er en liste',
            formattering: [],
          },
        ],
      },
    ];
    const result = mapBlokkInnholdToTipTapJsonContent(blokkInnhold);
    const content = result.content?.[0];
    expect(content?.type).toBe('bulletList');
    expect(content?.content?.[0].type).toBe('listItem');
    expect(content?.content?.[0].content?.[0].type).toBe('paragraph');
    expect(content?.content?.[0].content?.[0].content?.[0].text).toBe('Dette er en liste');
  });
});
