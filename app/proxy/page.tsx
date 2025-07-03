import { BrevmalWrapper } from 'components/BrevmalWrapper';
import styles from './page.module.css';

const Page = async () => {
  const env = process.env.NODE_ENV;
  if (env !== 'development') {
    return <div>Kun tilgjengelig lokalt</div>;
  }

  const res = await fetch('http://localhost:8087/api/mal?brevtype=AVSLAG&sprak=NB');
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
