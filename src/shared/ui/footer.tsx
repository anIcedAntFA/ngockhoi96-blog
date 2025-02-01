import { Flex, For, List, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import { PERSONAL_GITHUB_REPO_URL } from '../config/constant.config';

import DiscordIcon from './icons/discord-icon';
import FacebookIcon from './icons/facebook-icon';
import GithubIcon from './icons/github-icon';
import LinkedInIcon from './icons/linked-in-icon';
import TelegramIcon from './icons/telegram-icon';
import NavItem from './nav-item';
import { Tooltip } from './tooltip';

const PERSONAL_EMAIL = 'ngockhoi96.dev@gmail.com';

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
      <Flex
        align='center'
        direction={{
          base: 'column',
          md: 'row',
        }}
        gap={1}
      >
        <Text color='fgBase'>{t('githubInfo.infoText')}</Text>
        <NavItem
          aria-label='Github repository'
          href={PERSONAL_GITHUB_REPO_URL}
          target='_blank'
        >
          {t('githubInfo.linkText')}
        </NavItem>
      </Flex>
      <Flex
        align='center'
        direction={{
          base: 'column',
          md: 'row',
        }}
        gap={1}
      >
        <Text color='fgBase'>{t('emailInfo.infoText')}</Text>
        <NavItem
          aria-label='Email address'
          hoverType='bg'
          href={`mailto:${PERSONAL_EMAIL}`}
        >
          {PERSONAL_EMAIL}
        </NavItem>
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
            <Tooltip content={alt} showArrow>
              <List.Item key={id}>
                <NavItem
                  hoverType='icon'
                  aria-label={alt}
                  href={link}
                  target='_blank'
                >
                  {footerSocialIcons[icon]}
                </NavItem>
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
