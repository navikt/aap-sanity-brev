'use client';
import React from 'react';
import { Brev, FormattertTekst, Signatur } from '../types';
import Image, { StaticImageData } from 'next/image';
import { BodyShort, Button, Detail, Heading, Textarea, TextField } from '@navikt/ds-react';
import { formaterDatoForFrontend } from '../lib/date';
import { TrashIcon } from '@navikt/aksel-icons';
import { v4 as uuidV4 } from 'uuid';

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
  const updateBrev = () => {
    onBrevChange({
      ...brevmal,
      tekstbolker: brevmal.tekstbolker.map((blokk) => {
        return {
          ...blokk,
          id: blokk.id ?? uuidV4(),
          innhold: blokk.innhold.map((innholdElement) => {
            return {
              ...innholdElement,
              blokker: innholdElement.blokker.length > 0 ? innholdElement.blokker : defaultBlokker,
            };
          }),
        };
      }),
    });
  };

  type InnholdType = 'LISTE' | 'AVSNITT'

  const defaultBlokker = [
    {
      id: uuidV4(),
      type: 'LISTE' as InnholdType,
      innhold: [],
    },
  ];

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
              <div key={innhold.id}>
                {innhold.overskrift && (
                  <Heading level="3" size="medium">
                    {innhold.overskrift}
                  </Heading>
                )}
                {kanRedigeres(readonly, innhold.kanRedigeres) && innhold.blokker.length === 0 && (
                  <Textarea label="Redigerbar tekst" onChange={() => updateBrev()} hideLabel />
                )}
                {innhold.blokker.map((blokkInnhold) => {
                  if (kanRedigeres(readonly, innhold.kanRedigeres)) {
                    if (blokkInnhold.type === 'AVSNITT') {
                      if (blokkInnhold.innhold.length === 0) {
                        return <Textarea key={blokkInnhold.id} label="Redigerbar tekst" hideLabel />;
                      }
                      if (blokkInnhold.innhold.length > 0) {
                        return (
                          <Textarea key={blokkInnhold.id} label="Redigerbar tekst" hideLabel>
                            {blokkInnhold.innhold.map((val) => {
                              const formattertTekst = val as FormattertTekst;
                              if (val.type === 'TEKST') {
                                return formattertTekst.tekst;
                              }
                            })}
                          </Textarea>
                        );
                      }
                    }
                    if (blokkInnhold.type === 'LISTE') {
                      return (
                        <ul key={blokkInnhold.id}>
                          {blokkInnhold.innhold.map((val) => {
                            if (val.type === 'TEKST') {
                              const formattertTekst = val as FormattertTekst;
                              return (
                                <li key={val.id}>
                                  <TextField value={formattertTekst.tekst} label="Redigerbar tekst" hideLabel />{' '}
                                  <Button variant="danger" icon={<TrashIcon />}>
                                    Slett
                                  </Button>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      );
                    }
                  }
                  if (!kanRedigeres(readonly, innhold.kanRedigeres)) {
                    if (blokkInnhold.type === 'AVSNITT')
                      return (
                        <div key={blokkInnhold.id}>
                          {blokkInnhold.innhold.map((val) => {
                            if (val.type === 'TEKST') {
                              const formattertTekst = val as FormattertTekst;
                              return (
                                <BodyShort key={val.id} spacing>
                                  {formattertTekst.tekst}
                                </BodyShort>
                              );
                            }
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
