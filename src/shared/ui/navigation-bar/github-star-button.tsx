import {
  Box,
  Link as ChakraLink,
  HStack,
  Icon,
  Separator,
} from '@chakra-ui/react';
import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PERSONAL_GITHUB_REPO_URL } from '@/shared/config/constant.config';

import { Tooltip } from '../tooltip';

interface GithubStarButtonProps {
  count: number;
  url?: string;
}

function GithubStarButton({
  count,
  url = PERSONAL_GITHUB_REPO_URL,
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
        h={{ base: 9, xl: 10 }}
        p={2}
        border='2px solid'
        borderColor='primary'
        shadow='md'
        _hover={{
          textDecoration: 'none',
          backgroundColor: 'primary/10',
          '& svg': {
            animation: 'githubStarIcon 0.6s forwards',
          },
          '& span': {
            color: 'fg',
          },
        }}
        transition='background 0.3s'
        aria-label={t('ariaLabel')}
        href={url}
        rel='noopener noreferrer'
        rounded='md'
        target='_blank'
      >
        <HStack
          align='center'
          overflowX='hidden'
          w={{ base: '24px', xl: '68px' }}
          h={{ base: 9, xl: 10 }}
          transition='width 0.3s'
        >
          <Icon
            as={StarIcon}
            w={4}
            h={4}
            ml={1}
            color='orange.400'
            fill='orange.400'
            _dark={{ color: 'yellow.300', fill: 'yellow.300' }}
            xl={{ w: 5, h: 5 }}
          />
          <Box
            as='span'
            color='fgSecondary'
            fontSize='md'
            fontWeight='semibold'
            transition='color 0.3s'
          >
            {t('label')}
          </Box>
        </HStack>
        <Separator
          h={{ base: 9, xl: 10 }}
          borderColor='primary'
          orientation='vertical'
          size='md'
        />
        <Box
          as='span'
          minW={{ base: 5, xl: 6 }}
          color='fgSecondary'
          fontSize='md'
          fontWeight='semibold'
          textAlign='center'
          transition='color 0.3s'
        >
          {count}
        </Box>
      </ChakraLink>
    </Tooltip>
  );
}

GithubStarButton.displayName = 'GithubStarButton';
export default GithubStarButton;
