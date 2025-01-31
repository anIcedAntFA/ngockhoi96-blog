import { Icon } from '@chakra-ui/react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../button';

function SubscribeButton() {
  const t = useTranslations('components.common.subscribeButton');

  return (
    <Button
      w={32}
      color='fgTertiary'
      fontWeight='semibold'
      bg='primary'
      shadow='md'
      _hover={{
        bg: 'primary/90',
        _dark: { bg: 'green.400' },
        '& > svg': {
          w: 5,
          h: 5,
          opacity: 1,
          animation: 'bounce 0.8s ease-in-out infinite',
        },
      }}
      _active={{
        scale: 0.95,
      }}
      aria-label={t('ariaLabel')}
      rounded='md'
      transitionDuration='moderate'
      transitionProperty='background, scale'
    >
      <Icon
        w={0}
        h={0}
        opacity={0}
        transitionDuration='slower'
        transitionProperty='width, height, opacity'
      >
        <Mail />
      </Icon>
      {t('label')}
    </Button>
  );
}

SubscribeButton.displayName = 'SubscribeButton';
export default SubscribeButton;
