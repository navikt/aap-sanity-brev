import { BrevmalWrapper } from 'components/BrevmalWrapper';
import styles from './page.module.css';

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const env = process.env.NODE_ENV;
  if (env !== 'development') {
    return <div>Kun tilgjengelig lokalt</div>;
  }
  const mal = (await searchParams).mal;
  const res = await fetch(`http://localhost:8087/api/mal?brevtype=${mal}&sprak=NB`);
  if (res.ok) {
    const brevmal = await res.json();
    return (
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <BrevmalWrapper brevmal={brevmal} />
        </div>
      </div>
    );
  }
  return <div>Noe gikk galt. Er proxy startet?</div>;
};

export default Page;
