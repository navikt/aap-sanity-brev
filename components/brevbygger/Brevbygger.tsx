'use client';

import { Detail, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { Breveditor } from 'components/breveditor/Breveditor';

import styles from './Brevbygger.module.css';
import { formaterDatoForFrontend } from 'lib/services/date';

import NavLogo from 'public/nav_logo.png';
import { JSONContent } from '@tiptap/core';
import { Blokk, Brev, FormattertTekst, Innhold, Tekstbolk } from 'packages/aap-breveditor/types';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

export interface TipTapBrev {
  brevtittel: string;
  blokker: Array<TipTopBlokk>;
}

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

export const Brevbygger = ({ brevmal }: { brevmal: Brev }) => {
  const [tipTapBrev, setTipTapBrev] = useState<TipTapBrev>(mapBrevTilTipTap(brevmal));

  const updateBrev = (content: JSONContent, id: string) => {
    setTipTapBrev({
      ...tipTapBrev,
      blokker: tipTapBrev.blokker.map((blokk) => {
        return {
          ...blokk,
          innhold: blokk.innhold.map((innhold) => {
            if (innhold.id === id) {
              return { ...innhold, riktekst: content };
            }
            return innhold;
          }),
        };
      }),
    });
  };

  return (
    <div className={styles.brevbygger}>
      <div className={styles.brev}>
        <div className={styles.brevPersonalia}>
          <Image src={NavLogo} width={110} height={70} alt={'NAV logo'} />
          <Detail>Navn: Ola Nordmann</Detail>
          <Detail>Fødselsnummer: 1234567890</Detail>
          <Detail>Dato: {formaterDatoForFrontend(new Date())}</Detail>
          <Detail>Saksnnummer: AABBCC112233</Detail>
        </div>
        <Heading level="1" size="xlarge" className={styles.brevtittel}>
          {tipTapBrev.brevtittel}
        </Heading>
        {tipTapBrev.blokker.map((blokk) => (
          <div key={blokk.id}>
            <div className={styles.headerRow}>
              <Heading level="2" size="large" className={styles.heading}>
                {blokk.overskrift}
              </Heading>
            </div>
            {blokk.innhold.map((innhold) => (
              <div key={innhold.id} className={innhold.kanRedigeres ? styles.editableContent : ''}>
                {innhold.overskrift && (
                  <Heading level="3" size="medium" className={styles.heading}>
                    {innhold.overskrift}
                  </Heading>
                )}
                <Breveditor
                  initialValue={innhold.riktekst}
                  setContent={(content) => {
                    updateBrev(content, innhold.id);
                  }}
                  brukEditor={innhold.kanRedigeres}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const mapBrevTilTipTap = (brev: Brev): TipTapBrev => {
  return {
    brevtittel: brev.overskrift ?? '',
    blokker: mapBlokkerTilTipTap(brev.tekstbolker ?? []),
  };
};

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
