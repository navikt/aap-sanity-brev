import { JSONContent } from '@tiptap/core';
import { PortableTextBlock } from 'next-sanity';

export function deserialize(innhold?: Array<PortableTextBlock>): JSONContent {
  const content = innhold?.map((block) => {
    const content = block.children.map((child) => {
      const marks = child.marks?.map((mark: string) => {
        return { type: mapPortableTextMarkToTipTapMark(mark) };
      });

      return { type: mapPortableTextLeafToTipTapLeaf(child._type), text: child.text, marks };
    });

    return { type: mapPortableTextElementToTipTapElement(block.style), content };
  });

  return { type: 'doc', content };
}

type TipTapMark = 'bold' | 'italic' | 'underline' | 'normal';
function mapPortableTextMarkToTipTapMark(value: string): TipTapMark {
  switch (value) {
    case 'strong':
      return 'bold';
    case 'em':
      return 'italic';
    case 'underline':
      return 'underline';
    default:
      return 'normal';
  }
}

type TipTapElement = 'paragraph' | 'heading';
function mapPortableTextElementToTipTapElement(value?: string): TipTapElement {
  switch (value) {
    case 'normal':
      return 'paragraph';
    default:
      return 'paragraph';
  }
}

type TipTapLeaf = 'text';
function mapPortableTextLeafToTipTapLeaf(value?: string): TipTapLeaf {
  switch (value) {
    case 'span':
      return 'text';
    default:
      return 'text';
  }
}
