'use client';
import React from 'react';

import { Detail, Heading } from '@navikt/ds-react';
import Image, { StaticImageData } from 'next/image';
import { Breveditor } from '../breveditor/Breveditor';

import { formaterDatoForFrontend } from '../lib/date';

import { JSONContent } from '@tiptap/core';
import { Brev } from '../types';
import { v4 as uuidV4 } from 'uuid';

import { mapBlokkInnholdToTipTapJsonContent, mapTipTapJsonContentToBlokkInnhold } from '../tiptapMapper';

export const Brevbygger = ({
  brevmal,
  mottaker,
  saksnummer,
  logo,
  onBrevChange,
}: {
  brevmal: Brev;
  mottaker: {
    ident: string;
    navn: string;
  };
  saksnummer?: string;
  logo: StaticImageData;
  onBrevChange: (brev: Brev) => void;
}) => {
  const updateBrev = (content: JSONContent, innholdId: string) => {
    const oppdatertInnhold = mapTipTapJsonContentToBlokkInnhold(content);

    const oppdatertFellesformat: Brev = {
      ...brevmal,
      tekstbolker: brevmal.tekstbolker.map((blokk) => {
        return {
          ...blokk,
          id: blokk.id ?? uuidV4(),
          innhold: blokk.innhold.map((innhold) => {
            return {
              ...innhold,
              blokker: innhold.id === innholdId ? oppdatertInnhold : innhold.blokker,
            };
          }),
        };
      }),
    };
    onBrevChange(oppdatertFellesformat);
  };

  return (
    <div className="aap-brev-brevbygger">
      <div className="aap-brev-brev">
        <div className="aap-brev-personalia">
          <Image src={logo} width={110} height={70} alt={'NAV logo'} />
          <Detail>Navn: {mottaker.navn}</Detail>
          <Detail>Fødselsnummer: {mottaker.ident}</Detail>
          <Detail>Dato: {formaterDatoForFrontend(new Date())}</Detail>
          {saksnummer && <Detail>Saksnnummer: {saksnummer}</Detail>}
        </div>
        <Heading level="1" size="xlarge">
          {brevmal.overskrift}
        </Heading>
        {brevmal.tekstbolker.map((blokk) => (
          <div key={blokk.id}>
            <div className="aap-brev-headerRow">
              <Heading level="2" size="large">
                {blokk.overskrift}
              </Heading>
            </div>
            {blokk.innhold.map((innhold) => (
              <div key={innhold.id} className={innhold.kanRedigeres ? 'aap-brev-editableContent' : ''}>
                {innhold.overskrift && (
                  <Heading level="3" size="medium">
                    {innhold.overskrift}
                  </Heading>
                )}
                <Breveditor
                  initialValue={mapBlokkInnholdToTipTapJsonContent(innhold.blokker)}
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
