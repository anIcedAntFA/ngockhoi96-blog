'use client';

import {
  Box,
  Link as ChakraLink,
  HStack,
  Icon,
  Separator,
} from '@chakra-ui/react';
import { StarIcon } from 'lucide-react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

import { Tooltip } from './tooltip';

interface GithubStarButtonProps {
  count: number;
  href?: string;
}

const DEFAULT_REPO_URL = 'https://github.com/anIcedAntFA/blog.ngockhoi96.dev';

function GithubStarButton({
  count,
  href = DEFAULT_REPO_URL,
}: GithubStarButtonProps) {
  const t = useTranslations('components.common.githubStarButton');

  return (
    <Tooltip
      content={t('tooltipLabel')}
      showArrow
      openDelay={500}
      closeDelay={300}
    >
      <ChakraLink
        alignItems='center'
        h={10}
        p={2}
        border='2px solid'
        borderColor='primary'
        _hover={{
          textDecoration: 'none',
          backgroundColor: 'primary/10',
          '& svg': {
            animation: 'githubStarIcon 0.6s ease-in-out forwards',
          },
          '& span': {
            color: 'fg',
          },
        }}
        transition='background 0.3s ease-in-out'
        asChild
        rounded='md'
      >
        <NextLink
          href={href}
          rel='noopener noreferrer'
          target='_blank'
          aria-label={t('ariaLabel')}
        >
          <HStack align='center'>
            <Icon
              as={StarIcon}
              w={5}
              h={5}
              color='orange.400'
              fill='orange.400'
              _dark={{
                color: 'yellow.300',
                fill: 'yellow.300',
              }}
            />
            <Box
              as='span'
              color='fgSecondary'
              fontWeight='bold'
              transition='color 0.3s ease-in-out'
            >
              {t('label')}
            </Box>
          </HStack>
          <Separator
            h={10}
            borderColor='primary'
            orientation='vertical'
            size='md'
          />
          <Box
            as='span'
            color='fgSecondary'
            fontWeight='bold'
            transition='color 0.3s ease-in-out'
          >
            {count}
          </Box>
        </NextLink>
      </ChakraLink>
    </Tooltip>
  );
}

GithubStarButton.displayName = 'GithubStarButton';

export default GithubStarButton;
