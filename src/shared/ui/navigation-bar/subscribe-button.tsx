import { Box, Icon } from '@chakra-ui/react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../button';

function SubscribeButton() {
  const t = useTranslations('components.common.subscribeButton');

  return (
    <Button
      overflow='hidden'
      w={{ base: 8, xl: '137px' }}
      color='fgTertiary'
      fontSize={{ base: 'sm', xl: 'md' }}
      fontWeight='semibold'
      bg='primary'
      border='2px solid'
      borderColor='primary'
      shadow={{ base: 'sm', xl: 'md' }}
      _hover={{
        bg: 'primary/90',
        _dark: { bg: 'green.400' },
        '& > svg': {
          w: { base: 4, xl: 5 },
          h: { base: 4, xl: 5 },
          opacity: 1,
          animation: 'bounce 0.8s ease-in-out infinite',
        },
      }}
      _active={{ scale: 0.95 }}
      aria-label={t('ariaLabel')}
      rounded='md'
      size={{ base: 'sm', xl: 'md' }}
      transitionDuration='moderate'
      transitionProperty='width, background, scale'
    >
      <Icon
        w={4}
        h={4}
        transitionDuration='slower'
        transitionProperty='width, height, opacity'
        xl={{ w: 0, h: 0, opacity: 0 }}
      >
        <Mail />
      </Icon>
      <Box
        as='span'
        display='none'
        w={0}
        xl={{ w: 'full', display: 'inline-block' }}
      >
        {t('label')}
      </Box>
    </Button>
  );
}

SubscribeButton.displayName = 'SubscribeButton';
export default SubscribeButton;
