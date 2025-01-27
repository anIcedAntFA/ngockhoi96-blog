import { useTranslations } from 'next-intl';

import { ColorModeButton } from '@/shared/ui/color-mode';

import styles from './page.module.css';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {t('metadata.title')}
        <ColorModeButton />
      </main>
    </div>
  );
}
