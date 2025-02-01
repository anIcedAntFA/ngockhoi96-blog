import { Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { ColorModeButton } from '@/shared/ui/color-mode';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div>
      {t('metadata.title')}
      <ColorModeButton />
      <Box bg='bg.default'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, quam fuga.
        Facere, distinctio aperiam? Nobis assumenda, esse quas minus aperiam at
        neque deleniti nihil! Modi ratione eaque voluptatem quo aut!
      </Box>
    </div>
  );
}
