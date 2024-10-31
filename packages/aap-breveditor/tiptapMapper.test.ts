import {
  mapPortableTextElementToTipTapElement,
  mapPortableTextMarkToTipTapMarks,
} from 'packages/aap-breveditor/tiptapMapper';
import { describe, expect, it } from 'vitest';

describe('mapPortableTextMarkToTipTapMarks', () => {
  it('should return bold when given FET', () => {
    expect(mapPortableTextMarkToTipTapMarks('FET')).toBe('bold');
  });
  it('should return italic when given KURSIV', () => {
    expect(mapPortableTextMarkToTipTapMarks('KURSIV')).toBe('italic');
  });
  it('should return underline when given UNDERSTREK', () => {
    expect(mapPortableTextMarkToTipTapMarks('UNDERSTREK')).toBe('underline');
  });
  it('should return null when given something else', () => {
    expect(mapPortableTextMarkToTipTapMarks('something else')).toBe(null);
  });
});

describe('mapPortableTextElementToTipTapElement', () => {
  it('should return paragraph when given AVSNITT', () => {
    expect(mapPortableTextElementToTipTapElement('AVSNITT')).toBe('paragraph');
  });
  it('should return bulletList when given LISTE', () => {
    expect(mapPortableTextElementToTipTapElement('LISTE')).toBe('bulletList');
  });
});
