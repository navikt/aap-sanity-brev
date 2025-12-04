import '@navikt/ds-css';
import 'packages/aap-breveditor-css/src/breveditor.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
