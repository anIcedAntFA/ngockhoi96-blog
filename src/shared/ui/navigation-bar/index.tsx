'use client';

import { Box, HStack, Icon, List, Separator } from '@chakra-ui/react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../button';
import GithubStarButton from '../github-star-button';

type NavigationBarProps = {
  starCount: number;
};

function NavigationBar({ starCount }: NavigationBarProps) {
  const tSubscribeBtn = useTranslations('components.common.subscribeButton');

  return (
    <header>
      <Box>ngockhoi96</Box>
      <Box as='nav'>
        <List.Root>
          <List.Item>Home</List.Item>
          <List.Item>About</List.Item>
          <List.Item>Articles</List.Item>
          <List.Item>Resources</List.Item>
        </List.Root>
      </Box>
      <HStack>
        <Box>Search btn</Box>
        <Box>Theme switcher</Box>
        <Box>Language selector</Box>
        <Separator h={10} borderColor='fgSecondary' orientation='vertical' />
        <Button
          w={32}
          rounded='md'
          bg='primary'
          color='fgTertiary'
          fontWeight='semibold'
          transitionProperty='background, scale'
          transitionDuration='moderate'
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
          aria-label={tSubscribeBtn('ariaLabel')}
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
          {tSubscribeBtn('label')}
        </Button>
        <GithubStarButton count={starCount} />
      </HStack>
    </header>
  );
}

NavigationBar.displayName = 'NavigationBar';

export default NavigationBar;
