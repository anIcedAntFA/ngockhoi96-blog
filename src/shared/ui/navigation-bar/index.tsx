'use client';

import { Box, HStack, Separator, Show, useBreakpoint } from '@chakra-ui/react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef } from 'react';

import { DESKTOP_HEADER_HEIGHT } from '@/shared/config/theme.config';
import useBoolean from '@/shared/lib/utility-hooks/use-boolean';

import GithubStarButton from './github-star-button';
import NavigationList from './navigation-list';
import SearchDialogButton from './search-dialog-button';
import SubscribeButton from './subscribe-button';

type NavigationBarProps = {
  starCount: number;
};

const HIDE_THRESHOLD = DESKTOP_HEADER_HEIGHT * 3;
const BLUR_THRESHOLD = DESKTOP_HEADER_HEIGHT;

const MotionHeader = motion.create(HStack);

function NavigationBar({ starCount }: NavigationBarProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const hidden = useBoolean(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;
    //* Hide the header when scrolling down past threshold
    hidden.setValue(latest > previous && latest > HIDE_THRESHOLD);
    //* Apply blur effect when scrolling past a certain height
    if (headerRef.current) {
      headerRef.current.dataset.blur =
        latest > BLUR_THRESHOLD ? 'true' : 'false';
    }
  });

  const breakpoint = useBreakpoint({ breakpoints: ['md', 'lg'] });

  return (
    <MotionHeader
      ref={headerRef}
      as='header'
      pos='sticky'
      zIndex='sticky'
      top={0}
      justify='space-between'
      h={`${DESKTOP_HEADER_HEIGHT}px`}
      px={6}
      py={2}
      bg='bg.default'
      css={{
        transition: 'box-shadow 0.3s ease-in-out',
        '&[data-blur="true"]': {
          boxShadow: '0 1px 6px 0 {colors.fgBase/20}',
          backdropFilter: 'blur(20px)',
        },
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      transition={{ type: 'spring', bounce: 20, damping: 12, stiffness: 80 }}
      animate={hidden.value ? 'hidden' : 'visible'}
    >
      <Box>ngockhoi96</Box>
      <Show when={breakpoint === 'lg'}>
        <NavigationList />
      </Show>
      <HStack>
        {/* <Box>Search btn</Box>
        <Box>Theme switcher</Box>
        <Box>Language selector</Box> */}
        <SearchDialogButton />
        <Separator
          h={{ base: 9, xl: 10 }}
          borderColor='fgSecondary'
          orientation='vertical'
        />
        <SubscribeButton />
        <GithubStarButton count={starCount} />
      </HStack>
    </MotionHeader>
  );
}

NavigationBar.displayName = 'NavigationBar';
export default NavigationBar;
