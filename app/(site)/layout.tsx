import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>
        {draftMode().isEnabled && (
          <div>
            <a href="/api/disable-draft">Skru av preview mode</a>
          </div>
        )}
        {children}
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
