import {
  Link as ChakraLink,
  Flex,
  For,
  Icon,
  List,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import DiscordIcon from './icons/discord-icon';
import FacebookIcon from './icons/facebook-icon';
import GithubIcon from './icons/github-icon';
import LinkedInIcon from './icons/linked-in-icon';
import TelegramIcon from './icons/telegram-icon';
import { Tooltip } from './tooltip';

const PERSONAL_EMAIL = 'ngockhoi96.dev@gmail.com';
const PERSONAL_GITHUB_REPO_URL =
  'https://github.com/anIcedAntFA/blog.ngockhoi96.dev';

const footerSocialIcons: Record<string, ReactElement> = {
  GITHUB: <GithubIcon />,
  LINKED_IN: <LinkedInIcon />,
  TELEGRAM: <TelegramIcon />,
  DISCORD: <DiscordIcon />,
  FACEBOOK: <FacebookIcon />,
};

const socialLinks = [
  {
    id: 1,
    icon: 'GITHUB',
    alt: 'GitHub',
    link: 'https://github.com/anIcedAntFA',
  },
  {
    id: 2,
    icon: 'LINKED_IN',
    alt: 'LinkedIn',
    link: 'https://github.com/anIcedAntFA',
  },
  {
    id: 3,
    icon: 'TELEGRAM',
    alt: 'Telegram',
    link: 'https://github.com/anIcedAntFA',
  },
  {
    id: 4,
    icon: 'DISCORD',
    alt: 'Discord',
    link: 'https://github.com/anIcedAntFA',
  },
  {
    id: 5,
    icon: 'FACEBOOK',
    alt: 'Facebook',
    link: 'https://github.com/anIcedAntFA',
  },
];

function Footer() {
  const t = useTranslations('layout.footer');

  return (
    <VStack
      as='footer'
      align='center'
      justifyContent='center'
      px={4}
      py={8}
      borderColor='fgBase'
      borderTop='1px solid'
    >
      <Flex align='center' gap={1}>
        <Text color='fgBase'>{t('githubInfo.infoText')}</Text>
        <ChakraLink
          color='blue.600'
          _hover={{ textDecoration: 'none' }}
          _dark={{ color: 'blue.400' }}
          href={PERSONAL_GITHUB_REPO_URL}
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('githubInfo.linkText')}
        </ChakraLink>
      </Flex>
      <Flex align='center' gap={1}>
        <Text color='fgBase'>{t('emailInfo.infoText')}</Text>
        <ChakraLink
          color='blue.600'
          _hover={{ textDecoration: 'none' }}
          _dark={{ color: 'blue.400' }}
          href={`mailto:${PERSONAL_EMAIL}`}
          target='_blank'
        >
          {PERSONAL_EMAIL}
        </ChakraLink>
      </Flex>
      <List.Root
        flexDirection='row'
        gap={4}
        my={2}
        listStyle='none'
        align='center'
      >
        <For each={socialLinks}>
          {({ id, icon, alt, link }) => (
            <Tooltip content={alt} showArrow openDelay={200} closeDelay={100}>
              <List.Item key={id} w={5} h={5}>
                <ChakraLink
                  color='fgBase'
                  aria-label={alt}
                  href={link}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Icon w={5} h={5}>
                    {footerSocialIcons[icon]}
                  </Icon>
                </ChakraLink>
              </List.Item>
            </Tooltip>
          )}
        </For>
      </List.Root>
      <Text color='fgBase' fontSize='sm' fontWeight='md'>
        {t('copyright')} &copy; 2025-2026 ngockhoi96
      </Text>
    </VStack>
  );
}

Footer.displayName = 'Footer';

export default Footer;
