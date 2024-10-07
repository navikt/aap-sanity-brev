'use client';

import { Detail, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { Breveditor } from 'components/breveditor/Breveditor';

import styles from './Brevbygger.module.css';
import { formaterDatoForFrontend } from 'lib/services/date';

import NavLogo from 'public/nav_logo.png';
import { JSONContent } from '@tiptap/core';

export interface Brevmal {
  personalia: {
    navn: string;
    fødselsnummer: string;
    dato: Date;
    saksnnummer: string;
  };
  brevtittel: string;
  blokker: Array<{
    id: string;
    overskrift: string;
    innhold: Array<{
      id: string;
      type: string;
      riktekst: JSONContent;
      kanRedigeres: boolean;
    }>;
  }>;
}

export const Brevbygger = ({ brevmal }: { brevmal: Brevmal }) => {
  return (
    <div className={styles.brevbygger}>
      <div className={styles.brev}>
        <div className={styles.brevPersonalia}>
          <Image src={NavLogo} width={110} height={70} alt={'NAV logo'} />
          <Detail>Navn: {brevmal.personalia.navn}</Detail>
          <Detail>Fødselsnummer: {brevmal.personalia.fødselsnummer}</Detail>
          <Detail>Dato: {formaterDatoForFrontend(brevmal.personalia.dato)}</Detail>
          <Detail>Saksnnummer: {brevmal.personalia.saksnnummer}</Detail>
        </div>
        <Heading level="1" size="xlarge" className={styles.brevtittel}>
          {brevmal.brevtittel}
        </Heading>
        {brevmal.blokker.map((blokk) => (
          <div key={blokk.id}>
            <div className={styles.headerRow}>
              <Heading level="2" size="large" className={styles.heading}>
                {blokk.overskrift}
              </Heading>
            </div>
            {blokk.innhold.map((innhold) => (
              <div key={innhold.id} className={innhold.kanRedigeres ? styles.editableContent : ''}>
                <Breveditor initialValue={innhold.riktekst} setContent={() => {}} brukEditor={innhold.kanRedigeres} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
