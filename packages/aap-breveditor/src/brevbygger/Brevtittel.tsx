import React, { useState } from 'react';
import { Button, Heading, TextField } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
  brevtittel: string;
  oppdaterBrevtittel: (nyTittel: string) => void;
  kanOverstyreBrevtittel: boolean;
}

export const Brevtittel = ({ brevtittel, kanOverstyreBrevtittel = false, oppdaterBrevtittel }: Props) => {
  const [redigerBrevtittel, toggleRedigerBrevtittel] = useState<boolean>(false);
  const [brevtittelFeil, oppdaterBrevtittelFeil] = useState<string | undefined>(undefined);

  const validerOgOppdaterBrevtittel = (nyTittel: string) => {
    if (!nyTittel) {
      oppdaterBrevtittelFeil('Du må sette en tittel på brevet');
    } else {
      oppdaterBrevtittel(nyTittel);
      toggleRedigerBrevtittel(!redigerBrevtittel);
    }
  };

  return (
    <div className="aap-brev-redigerbar-seksjon">
      {!redigerBrevtittel ? (
        <Heading level="1" size="xlarge">
          {brevtittel}
        </Heading>
      ) : (
        <TextField
          className={'aap-brev-redigerbar-tekst'}
          label={'Brevtittel'}
          defaultValue={brevtittel}
          onChange={() => oppdaterBrevtittelFeil(undefined)}
          onBlur={(event) => {
            validerOgOppdaterBrevtittel(event.currentTarget.value);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              validerOgOppdaterBrevtittel(event.currentTarget.value);
            }
          }}
          error={brevtittelFeil}
          hideLabel
          autoFocus
        />
      )}
      {kanOverstyreBrevtittel && (
        <Button
          className={'aap-brev-rediger-knapp'}
          variant={'tertiary'}
          icon={<PencilIcon title={'Rediger overskrift'} />}
          title="Rediger tittel"
          onClick={() => toggleRedigerBrevtittel(!redigerBrevtittel)}
        />
      )}
    </div>
  );
};
