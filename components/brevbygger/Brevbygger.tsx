'use client';

import { Heading } from '@navikt/ds-react';
import { Brevmal } from 'lib/services/sanity/model/brevmal/brevmalQuery';

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
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
