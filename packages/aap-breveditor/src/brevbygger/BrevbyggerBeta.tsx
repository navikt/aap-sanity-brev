'use client';
import React from 'react';
import { TekstElement } from './TekstElement';
import Image, { StaticImageData } from 'next/image';
import { BodyShort, Detail, Heading } from '@navikt/ds-react';
import { formaterDatoForFrontend } from '../lib/date';
import { v4 as uuidV4 } from 'uuid';
import { InnholdType } from './enums';
import { IkkeRedigerbarListe } from './IkkeRedigerbarListe';
import { Blokk, BlokkInnhold, Brev, Faktagrunnlag, FormattertTekst, Innhold, Signatur, Tekstbolk } from '../types';
import { Brevtittel } from './Brevtittel';

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
  const mapBlokkInnholdTilFormatertTekst = (blokkInnhold: BlokkInnhold): FormattertTekst => {
    switch (blokkInnhold.type) {
      case 'TEKST':
        return blokkInnhold as FormattertTekst;
      case 'FAKTAGRUNNLAG':
        return {
          type: 'TEKST',
          id: blokkInnhold.id,
          tekst: `<${(blokkInnhold as Faktagrunnlag).visningsnavn}>`,
          formattering: [],
        };
    }
  };
  const mappetBrevmal: Brev = {
    ...brevmal,
    tekstbolker: brevmal.tekstbolker.map((blokk: Tekstbolk) => {
      return {
        ...blokk,
        innhold: blokk.innhold.map((innhold: Innhold) => {
          if (innhold.blokker.length) {
            return {
              ...innhold,
              blokker: innhold.blokker.map((blokk: Blokk) => {
                // midlertidig mapping for å
                // - legge inn tomme blokker for fritekst-felt
                // - slå sammen redigerebare liste-elementer til ett tekstfelt
                // flyttes til egen mapper-funksjon når breveditor byttes ut
                if (blokk.type === InnholdType.LISTE && innhold.kanRedigeres) {
                  const tekst = blokk.innhold.reduce(
                    (acc: string, curr: BlokkInnhold) => acc + `- ${mapBlokkInnholdTilFormatertTekst(curr).tekst}\n`,
                    ''
                  );
                  return {
                    id: uuidV4(),
                    type: 'AVSNITT',
                    innhold: [
                      {
                        id: uuidV4(),
                        type: 'TEKST',
                        tekst: tekst,
                        formattering: [],
                      },
                    ],
                  };
                }

                // Gjør om manglende faktagrunnlag til tekst, og slår sammen BlokkInnhold som er faktagrunnlag
                // med nabo-BlokkInnhold
                if (
                  blokk.type === InnholdType.AVSNITT &&
                  innhold.kanRedigeres &&
                  blokk.innhold.find((blokkInnhold) => blokkInnhold.type === 'FAKTAGRUNNLAG')
                ) {
                  const blokkInnhold = blokk.innhold.reduce(
                    (acc: FormattertTekst[], current: BlokkInnhold, index: number) => {
                      if (current.type === 'FAKTAGRUNNLAG' || blokk.innhold[index - 1]?.type === 'FAKTAGRUNNLAG') {
                        if (acc.length > 0) {
                          const accLast = acc[acc.length - 1];

                          return acc.slice(0, acc.length - 1).concat({
                            ...accLast,
                            tekst: accLast.tekst + mapBlokkInnholdTilFormatertTekst(current).tekst,
                          });
                        } else {
                          return acc.concat(mapBlokkInnholdTilFormatertTekst(current));
                        }
                      } else {
                        return acc.concat(mapBlokkInnholdTilFormatertTekst(current));
                      }
                    },
                    []
                  );

                  return {
                    ...blokk,
                    innhold: blokkInnhold,
                  };
                }
                return { ...blokk };
              }),
            };
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

  const oppdaterBrev = (brevElementId: string, oppdatertTekst: string) => {
    const blokkInnholdTekst = oppdatertTekst ?? '';
    const oppdatertFellesformat: Brev = {
      ...mappetBrevmal,
      tekstbolker: mappetBrevmal.tekstbolker.map((tekstbolk) => {
        return {
          ...tekstbolk,
          id: tekstbolk.id,
          innhold: tekstbolk.innhold.map((innhold) => {
            return {
              ...innhold,
              blokker: innhold.blokker.map((blokk) => {
                return {
                  ...blokk,
                  id: blokk.id,
                  innhold: blokk.innhold.map((blokkInnhold) => {
                    if (blokkInnhold.id === brevElementId) {
                      return {
                        ...blokkInnhold,
                        tekst: blokkInnholdTekst,
                      };
                    }
                    return blokkInnhold;
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

  const oppdaterOverskrift = (text: string) => {
    onBrevChange({ ...mappetBrevmal, overskrift: text });
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
        <Brevtittel
          brevtittel={mappetBrevmal.overskrift ?? ''}
          kanOverstyreBrevtittel={!!mappetBrevmal.kanOverstyreBrevtittel}
          oppdaterBrevtittel={oppdaterOverskrift}
        />
        {mappetBrevmal.tekstbolker.map((tekstbolk: Tekstbolk) => (
          <div key={tekstbolk.id}>
            <div className="aap-brev-headerRow">
              <Heading level="2" size="large">
                {tekstbolk.overskrift}
              </Heading>
            </div>
            {tekstbolk.innhold.map((innhold: Innhold) => (
              <div key={innhold.id}>
                {innhold.overskrift && (
                  <Heading level="3" size="medium">
                    {innhold.overskrift}
                  </Heading>
                )}
                {innhold.blokker.map((blokk: Blokk) => {
                  if (blokk.type === InnholdType.LISTE && !kanRedigeres(readonly, innhold.kanRedigeres)) {
                    return <IkkeRedigerbarListe blokkInnholdListe={blokk.innhold} key={blokk.id} />;
                  } else {
                    return (
                      <div key={blokk.id}>
                        {blokk.innhold.map((blokkInnholdElement: BlokkInnhold) => {
                          const blokkInnholdTekst = blokkInnholdElement as FormattertTekst;
                          return (
                            <TekstElement
                              tekst={blokkInnholdTekst.tekst}
                              erRedigerbar={!!kanRedigeres(readonly, innhold.kanRedigeres)}
                              erListe={blokk.type === InnholdType.LISTE}
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
