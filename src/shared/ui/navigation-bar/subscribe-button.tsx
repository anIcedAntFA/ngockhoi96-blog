import { Box, Icon } from '@chakra-ui/react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../button';
import { Tooltip } from '../tooltip';

function SubscribeButton() {
  const t = useTranslations('components.common.subscribeButton');

  return (
    <Tooltip content='Subscribe to your email' showArrow>
      <Button
        overflow='hidden'
        w={{ base: 8, xl: '120px' }}
        color='fgTertiary'
        fontSize={'sm'}
        fontWeight='semibold'
        bg='primary'
        shadow={'sm'}
        _hover={{
          bg: 'primary/90',
          _dark: { bg: 'green.400' },
          '& > svg': {
            w: 4,
            h: 4,
            opacity: 1,
            animation: 'bounce 0.8s ease-in-out infinite',
          },
        }}
        _active={{ scale: 0.95 }}
        aria-label={t('ariaLabel')}
        rounded='md'
        size={'sm'}
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
    </Tooltip>
  );
}

SubscribeButton.displayName = 'SubscribeButton';
export default SubscribeButton;
