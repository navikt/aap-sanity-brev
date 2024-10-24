import '@navikt/ds-css';
import '@navikt/aap-felles-css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  return (
    <html lang="nb">
      <body>
        {isEnabled && (
          <div>
            <a href="/api/disable-draft">Skru av preview mode</a>
          </div>
        )}
        {children}
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
