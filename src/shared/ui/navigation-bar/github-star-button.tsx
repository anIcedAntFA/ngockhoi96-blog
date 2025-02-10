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
        gap={1}
        h={{ base: 8, sm: 9 }}
        p={{ base: 0.5, sm: 1 }}
        border='2px solid'
        borderColor='primary'
        shadow='md'
        _hover={{
          textDecoration: 'none',
          backgroundColor: 'primary/10',
          '& svg': { animation: 'githubStarIcon ease-in-out 0.6s forwards' },
          '& span': { color: 'fg.default' },
        }}
        transition='background 0.3s ease-in-out'
        aria-label={t('ariaLabel')}
        href={url}
        rel='noopener noreferrer'
        rounded={{ base: 'sm', sm: 'md' }}
        target='_blank'
      >
        <HStack
          align='center'
          overflowX='hidden'
          w={{ base: '24px', sm: '26px', xl: '58px' }}
          h={9}
          transition='width 0.3s'
        >
          <Icon
            as={StarIcon}
            w={{ base: 4, sm: 4.5 }}
            h={{ base: 4, sm: 4.5 }}
            ml={1}
            color='orange.400'
            fill='orange.400'
            _dark={{ color: 'yellow.300', fill: 'yellow.300' }}
          />
          <Box
            as='span'
            color='fgSecondary'
            fontSize='sm'
            fontWeight='semibold'
            transition='color 0.3s'
          >
            {t('label')}
          </Box>
        </HStack>
        <Separator
          display={{ base: 'none', md: 'block' }}
          h={9}
          borderColor='primary'
          orientation='vertical'
          size={{ base: 'sm', md: 'md' }}
        />
        <Box
          as='span'
          display={{ base: 'none', md: 'inline-block' }}
          minW={5}
          color='fgSecondary'
          fontSize='sm'
          fontWeight='semibold'
          textAlign='center'
          transition='color 0.3s ease-in-out'
        >
          {count}
        </Box>
      </ChakraLink>
    </Tooltip>
  );
}

GithubStarButton.displayName = 'GithubStarButton';
export default GithubStarButton;
