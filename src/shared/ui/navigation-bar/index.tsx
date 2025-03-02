'use client';

import { Box, Container, HStack } from '@chakra-ui/react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useRef } from 'react';

import {
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from '@/shared/config/theme.config';
import useBoolean from '@/shared/lib/utility-hooks/use-boolean';

import GithubStarButton from './github-star-button';
import HamburgerButton from './hamburger-button';
import NavMenuDrawer from './nav-menu-drawer';
import NavigationList from './navigation-list';
import { RssButton } from './rss-button';
import SearchBoxButton from './search-box-button';
import SettingDropdownButton from './setting-dropdown-button';
import SubscribeButton from './subscribe-button';

interface NavigationBarProps {
  starCount: number;
}

const HIDE_THRESHOLD = DESKTOP_HEADER_HEIGHT * 4;
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

  return (
    <>
      <MotionHeader
        ref={headerRef}
        as='header'
        pos='sticky'
        zIndex='dropdown'
        top={0}
        justify='space-between'
        h={{
          base: `${MOBILE_HEADER_HEIGHT}px`,
          sm: `${DESKTOP_HEADER_HEIGHT}px`,
        }}
        px={6}
        py={2}
        bg='bg.default'
        css={{
          transition: 'box-shadow 0.3s ease-in-out',
          '&[data-blur="true"]': {
            background: 'bg.default/10',
            boxShadow: '0 1px 6px 0 {colors.fgBase/20}',
            backdropFilter: 'blur(8px)',
          },
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        transition={{ type: 'spring', bounce: 20, damping: 12, stiffness: 80 }}
        animate={hidden.value ? 'hidden' : 'visible'}
      >
        <Container px={{ base: 0, sm: '1rem' }}>
          <HStack justify='space-between'>
            <Box fontSize={{ base: 'medium', sm: 'lg' }}>ngockhoi96</Box>
            <NavigationList />
            <HStack
              justifyContent='flex-end'
              flex={{ base: 1, lg: 'unset' }}
              gap={{ base: 2, sm: 3 }}
            >
              <SearchBoxButton />
              <SettingDropdownButton />
              <RssButton />
              <GithubStarButton count={starCount} />
              <SubscribeButton />
              <HamburgerButton />
            </HStack>
          </HStack>
        </Container>
      </MotionHeader>
      <NavMenuDrawer />
    </>
  );
}

NavigationBar.displayName = 'NavigationBar';
export default NavigationBar;
