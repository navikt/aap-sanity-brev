'use client';

import { Detail, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { Breveditor } from 'components/breveditor/Breveditor';

import styles from './Brevbygger.module.css';
import { formaterDatoForFrontend } from 'lib/services/date';

import NavLogo from 'public/nav_logo.png';
import { JSONContent } from '@tiptap/core';
import { Brev } from 'packages/aap-breveditor/types';
import { useEffect, useState } from 'react';

import { mapBrevTilTipTap, mapTipTapBrevTilBrev, TipTapBrev } from 'packages/aap-breveditor/tiptapMapper';

export const Brevbygger = ({ brevmal }: { brevmal: Brev }) => {
  const [tipTapBrev, setTipTapBrev] = useState<TipTapBrev>(mapBrevTilTipTap(brevmal));
  const [fellesformat, setFellesformat] = useState<Brev>(brevmal);

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

  useEffect(() => {
    setFellesformat(mapTipTapBrevTilBrev(tipTapBrev));
  }, [tipTapBrev, setFellesformat]);

  useEffect(() => {
    console.log('fellesformat', fellesformat);
  }, [fellesformat]);

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
