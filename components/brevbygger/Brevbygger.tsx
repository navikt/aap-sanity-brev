'use client';

import { Heading } from '@navikt/ds-react';
import { Breveditor } from 'components/breveditor/Breveditor';
import { Brevmal } from 'lib/services/sanity/model/brevmal/brevmalQuery';
import { deserialize } from 'lib/services/tiptap/tipTapService';

export const Brevbygger = ({ brevmal }: { brevmal: Brevmal }) => {
  return (
    <div>
      <Heading level="1" size="xlarge">
        {brevmal.brevtittel}
      </Heading>
      {brevmal.innhold.map((innhold) => {
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
