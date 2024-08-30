'use client';

import { Brevmal } from 'lib/services/sanity/model/brevmal/brevmalQuery';

export const Brevbygger = ({ brevmal }: { brevmal: Brevmal }) => {
  return (
    <div>
      <h1>{brevmal.brevtittel}</h1>
    </div>
  );
};
