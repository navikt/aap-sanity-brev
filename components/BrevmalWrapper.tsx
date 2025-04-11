'use client';

import { Brevbygger, BrevbyggerBeta } from 'packages/aap-breveditor';
import { Brev } from 'packages/aap-breveditor/src/types';
import { useState } from 'react';
import NavLogo from 'public/nav_logo.png';
import { Tabs } from '@navikt/ds-react';

export const BrevmalWrapper = ({ brevmal }: { brevmal: Brev }) => {
  const [mal, setMal] = useState(brevmal);

  return (
    <Tabs defaultValue="standard">
      <Tabs.List>
        <Tabs.Tab value="standard" label="Standard brevmal" />
        <Tabs.Tab value="beta" label="Beta brevmal" />
      </Tabs.List>
      <Tabs.Panel value="standard">
        <Brevbygger
          brevmal={mal}
          onBrevChange={setMal}
          logo={NavLogo}
          mottaker={{ ident: 'XXXXX', navn: 'Test Testesen' }}
          signatur={[
            { navn: 'Ola Saksbehandler', enhet: 'NAY Testenhet' },
            { navn: 'Kari Veileder', enhet: 'Nav Testkontor' },
          ]}
        />
      </Tabs.Panel>
      <Tabs.Panel value="beta">
        <BrevbyggerBeta
          brevmal={mal}
          onBrevChange={setMal}
          logo={NavLogo}
          mottaker={{ ident: 'XXXXX', navn: 'Test Testesen' }}
          signatur={[
            { navn: 'Ola Saksbehandler', enhet: 'NAY Testenhet' },
            { navn: 'Kari Veileder', enhet: 'Nav Testkontor' },
          ]}
        />
      </Tabs.Panel>
    </Tabs>
  );
};
