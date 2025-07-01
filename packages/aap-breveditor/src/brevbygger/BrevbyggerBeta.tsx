'use client';
import React from 'react';
import { TekstElement } from './TekstElement';
import Image, { StaticImageData } from 'next/image';
import { BodyShort, Detail, Heading } from '@navikt/ds-react';
import { formaterDatoForFrontend } from '../lib/date';
import { v4 as uuidV4 } from 'uuid';
import { InnholdType } from './enums';
import { IkkeRedigerbarListe } from './IkkeRedigerbarListe';
import { Blokk, BlokkInnhold, Brev, FormattertTekst, Innhold, Signatur, Tekstbolk } from '../types';

const kanRedigeres = (readonly?: boolean, kanRedigeres?: boolean) => {
  return !readonly && kanRedigeres;
};

export const BrevbyggerBeta = ({
  brevmal,
  mottaker,
  saksnummer,
  signatur,
  logo,
  onBrevChange,
  readonly = false,
}: {
  brevmal: Brev;
  mottaker: {
    ident: string;
    navn: string;
  };
  saksnummer?: string;
  signatur: Signatur[];
  logo: StaticImageData;
  onBrevChange: (brev: Brev) => void;
  readonly?: boolean;
}) => {
  // TODO 2025-06-25
  // midlertidig mapping for å legge inn tomme blokker for fritekst-felt.
  // flyttes til egen mapper-funksjon når breveditor byttes ut
  const mappetBrevmal: Brev = {
    ...brevmal,
    tekstbolker: brevmal.tekstbolker.map((blokk) => {
      return {
        ...blokk,
        innhold: blokk.innhold.map((innhold) => {
          if (innhold.blokker.length) {
            return { ...innhold };
          }
          return {
            ...innhold,
            blokker: [
              {
                id: uuidV4(),
                type: 'AVSNITT',
                innhold: [
                  {
                    id: uuidV4(),
                    type: 'TEKST',
                    tekst: '',
                    formattering: [],
                  },
                ],
              },
            ],
          };
        }),
      };
    }),
  };

  const utledOppdatertBlokkInnhold = (blokkinnholdId: string, blokkinnholdTekst: string): BlokkInnhold => {
    return {
      formattering: [],
      id: blokkinnholdId,
      tekst: blokkinnholdTekst,
      type: InnholdType.TEKST,
    };
  };

  const oppdaterBrev = (brevElementId: string, oppdatertTekst: string) => {
    const blokkInnholdTekst = oppdatertTekst ?? '';
    const oppdatertFellesformat: Brev = {
      ...mappetBrevmal,
      tekstbolker: mappetBrevmal.tekstbolker.map((blokk) => {
        return {
          ...blokk,
          id: blokk.id ?? uuidV4(),
          innhold: blokk.innhold.map((innhold) => {
            if (innhold.id === brevElementId) {
              const nyttBlokkInnholdId = uuidV4();
              return {
                ...innhold,
                blokker: [
                  {
                    id: nyttBlokkInnholdId,
                    innhold: [utledOppdatertBlokkInnhold(nyttBlokkInnholdId, blokkInnholdTekst)],
                    type: InnholdType.AVSNITT,
                    formattering: [],
                  },
                ],
              };
            }
            return {
              ...innhold,
              blokker: innhold.blokker.map((blokk) => {
                return {
                  ...blokk,
                  id: blokk.id ?? uuidV4(),
                  innhold: blokk.innhold.map((innhold) => {
                    return innhold.id === brevElementId
                      ? utledOppdatertBlokkInnhold(brevElementId, blokkInnholdTekst)
                      : innhold;
                  }),
                };
              }),
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
          {mappetBrevmal.overskrift}
        </Heading>
        {mappetBrevmal.tekstbolker.map((blokk: Tekstbolk) => (
          <div key={blokk.id}>
            <div className="aap-brev-headerRow">
              <Heading level="2" size="large">
                {blokk.overskrift}
              </Heading>
            </div>
            {blokk.innhold.map((innhold: Innhold) => (
              <div key={innhold.id}>
                {innhold.overskrift && (
                  <Heading level="3" size="medium">
                    {innhold.overskrift}
                  </Heading>
                )}
                {innhold.blokker.map((blokkInnhold: Blokk) => {
                  if (blokkInnhold.type === InnholdType.LISTE && !kanRedigeres(readonly, innhold.kanRedigeres)) {
                    return <IkkeRedigerbarListe blokkInnholdListe={blokkInnhold.innhold} key={blokkInnhold.id} />;
                  } else {
                    return (
                      <div key={blokkInnhold.id}>
                        {blokkInnhold.innhold.map((blokkInnholdElement: BlokkInnhold) => {
                          const blokkInnholdTekst = blokkInnholdElement as FormattertTekst;
                          return (
                            <TekstElement
                              tekst={blokkInnholdTekst.tekst}
                              erRedigerbar={!!kanRedigeres(readonly, innhold.kanRedigeres)}
                              erListe={blokkInnhold.type === InnholdType.LISTE}
                              spacing={false}
                              nøkkel={blokkInnholdElement.id}
                              oppdaterTekst={oppdaterBrev}
                              key={blokkInnholdElement.id}
                            />
                          );
                        })}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        ))}
        <div className="aap-brev-signatur">
          {signatur.map((signatur, index) => (
            <div key={index}>
              <BodyShort>{signatur.navn}</BodyShort>
              <BodyShort>{signatur.enhet}</BodyShort>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
