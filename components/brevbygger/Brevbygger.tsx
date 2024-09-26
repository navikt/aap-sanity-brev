'use client';

import { Heading } from '@navikt/ds-react';
import { Breveditor } from 'components/breveditor/Breveditor';
import { deserialize } from 'lib/services/tiptap/tipTapService';

// TODO: Oppdatere brevbygger til å følge ny brevmal
export const Brevbygger = ({ brevmal }: { brevmal: any }) => {
  return (
    <div>
      <Heading level="1" size="xlarge">
        {brevmal.brevtittel}
      </Heading>
      {brevmal.innhold.map((innhold: any) => {
        if (innhold._type === 'standardtekst') {
          return (
            <div key={innhold._id}>
              <Heading level="2" size="large">
                {innhold.overskrift}
              </Heading>
              <Breveditor
                initialValue={deserialize(innhold.innhold)}
                setContent={() => {}}
                brukEditor={innhold.kanRedigeres}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
