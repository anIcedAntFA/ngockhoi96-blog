import Dummy from '@/components/dummy';

import styles from './page.module.css';

export default function Home() {
  const title = 'Welcome to your Next.js app';

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Dummy />
        {title}
      </main>
    </div>
  );
}
