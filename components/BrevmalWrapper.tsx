'use client';

import { Brevbygger } from 'packages/aap-breveditor';
import { Brev } from 'packages/aap-breveditor/src/types';
import { useState } from 'react';
import NavLogo from 'public/nav_logo.png';

export const BrevmalWrapper = ({ brevmal }: { brevmal: Brev }) => {
  const [mal, setMal] = useState(brevmal);

  return <Brevbygger brevmal={mal} onBrevChange={setMal} logo={NavLogo} />;
};
