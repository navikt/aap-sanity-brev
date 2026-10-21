// @vitest-environment node
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { renderModel } from './cli.mjs';

describe('Sanity schema model', () => {
  const source = resolve('lib/services/sanity/model/20250910');

  it('renders the schema reachable from mal directly from TypeScript sources', async () => {
    const model = await renderModel(source);

    expect(model).toContain('class mal["mal · Hovedmal"]');
    expect(model).toContain('+string brevbyggerTittel');
    expect(model).toContain('mal "1" *-- "*" delmalRef : delmaler');
    expect(model).toContain('valgRef "1" --> "1" valg : valg');
    expect(model).toContain('blockEditor "1" --> "*" tabell : tabell');
    expect(model).toContain('class faktagrunnlag["faktagrunnlag · Faktagrunnlag"]');
    expect(model).toContain('betingetTekstRef "1" --> "*" kategori : kategorier');
  });

  it('rejects an unknown root export', async () => {
    await expect(renderModel(source, 'missing')).rejects.toThrow('Schema export "missing" was not found');
  });
});
