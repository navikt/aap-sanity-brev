import React, { useRef } from 'react';
import { BodyShort, Button, Textarea } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';

interface TextProps {
  tekst?: string;
  erRedigerbar: boolean;
  erListe?: boolean;
  oppdaterTekst: (textareaId: string, oppdatertTekst: string) => void;
  nøkkel: string;
  spacing?: boolean;
}

export const TekstElement = ({ tekst, erRedigerbar, erListe, oppdaterTekst, nøkkel, spacing }: TextProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!erRedigerbar) {
    return (
      <BodyShort className="aap-brev-ikke-redigerbar-tekst" spacing={spacing}>
        {tekst}
      </BodyShort>
    );
  }

  return (
    <div className={'aap-brev-redigerbar-seksjon'}>
      {!erListe && (
        <Textarea
          className={'aap-brev-redigerbar-tekst'}
          minRows={1}
          ref={textareaRef}
          label="Redigerbar tekst"
          defaultValue={tekst}
          onChange={(event) => {
            oppdaterTekst(nøkkel, event.target.value);
          }}
          hideLabel
        />
      )}
      {erListe && (
        <ul className={'aap-brev-liste'}>
          <li className={'aap-brev-liste-element'}>
            <Textarea
              className={'aap-brev-liste-element'}
              minRows={1}
              ref={textareaRef}
              label="Redigerbar tekst"
              defaultValue={tekst}
              onChange={(event) => {
                oppdaterTekst(nøkkel, event.target.value);
              }}
              hideLabel
            />
          </li>
        </ul>
      )}
      <Button
        className={'aap-brev-rediger-knapp'}
        variant={'tertiary'}
        icon={<PencilIcon title={'Rediger tekst'} />}
        onClick={() => {
          const textarea = textareaRef?.current;
          if (!!textarea) {
            textarea.selectionStart = textarea.selectionEnd = textarea.textLength;
            textarea.focus();
          }
        }}
      />
    </div>
  );
};
