'use client';

import { Detail, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { Breveditor } from '../breveditor/Breveditor';

import { formaterDatoForFrontend } from 'lib/services/date';

import NavLogo from 'public/nav_logo.png';
import { JSONContent } from '@tiptap/core';
import { Brev } from 'packages/aap-breveditor/types';
import { useEffect, useState } from 'react';

import {
  mapBlokkInnholdToTipTapJsonContent,
  mapTipTapJsonContentToBlokkInnhold,
} from 'packages/aap-breveditor/tiptapMapper';

export const Brevbygger = ({ brevmal }: { brevmal: Brev }) => {
  const [fellesformat, setFellesformat] = useState<Brev>(brevmal);

  const updateBrev = (content: JSONContent, innholdId: string, blokkId: string) => {
    const oppdatertInnhold = mapTipTapJsonContentToBlokkInnhold(content);

    const oppdatertFellesformat: Brev = {
      ...fellesformat,
      tekstbolker: fellesformat.tekstbolker.map((blokk) => {
        return {
          ...blokk,
          innhold: blokk.innhold.map((innhold) => {
            return {
              ...innhold,
              blokker: innhold.id === innholdId ? oppdatertInnhold : innhold.blokker,
            };
          }),
        };
      }),
    };
    setFellesformat(oppdatertFellesformat);
  };

  useEffect(() => {
    console.log('fellesformat', fellesformat);
  }, [fellesformat]);

  return (
    <div className="aap-brev-brevbygger">
      <div className="aap-brev-brev">
        <div className="aap-brev-personalia">
          <Image src={NavLogo} width={110} height={70} alt={'NAV logo'} />
          <Detail>Navn: Ola Nordmann</Detail>
          <Detail>Fødselsnummer: 1234567890</Detail>
          <Detail>Dato: {formaterDatoForFrontend(new Date())}</Detail>
          <Detail>Saksnnummer: AABBCC112233</Detail>
        </div>
        <Heading level="1" size="xlarge">
          {fellesformat.overskrift}
        </Heading>
        {fellesformat.tekstbolker.map((blokk) => (
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
                    updateBrev(content, innhold.id, blokk.id);
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
