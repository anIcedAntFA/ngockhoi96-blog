'use client';

import { Box, Flex, HStack, Separator } from '@chakra-ui/react';

import GithubStarButton from '../github-star-button';

import NavigationList from './navigation-list';
import SubscribeButton from './subscribe-button';

type NavigationBarProps = {
  starCount: number;
};

function NavigationBar({ starCount }: NavigationBarProps) {
  return (
    <Flex as='header' pos='relative' align='center' justify='space-between'>
      <Box>ngockhoi96</Box>
      <NavigationList />
      <HStack>
        <Box>Search btn</Box>
        <Box>Theme switcher</Box>
        <Box>Language selector</Box>
        <Separator h={10} borderColor='fgSecondary' orientation='vertical' />
        <SubscribeButton />
        <GithubStarButton count={starCount} />
      </HStack>
    </Flex>
  );
}

NavigationBar.displayName = 'NavigationBar';

export default NavigationBar;
