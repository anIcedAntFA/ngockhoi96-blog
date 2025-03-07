import {
  Box,
  Link as ChakraLink,
  For,
  List,
  Show,
  useDisclosure,
} from '@chakra-ui/react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations, type MessageKeys } from 'next-intl';
import type { ComponentRef } from 'react';
import { useRef } from 'react';

import { Link as LocaleLink, type Pathname } from '@/shared/lib/i18n';

import { Button, type ButtonProps } from '../button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from '../menu';

type NavigationListKey = MessageKeys<
  {
    home: string;
    about: string;
    articles: string;
    category: string;
    resources: string;
  },
  'home' | 'about' | 'articles' | 'category' | 'resources'
>;

const navigationList = (
  t: (key: NavigationListKey) => string,
): {
  id: number;
  type: 'link' | 'menu';
  title: string;
  href: Pathname;
}[] => {
  return [
    // {
    //   id: 1,
    //   type: 'link',
    //   title: t('home'),
    //   icon: <Home />,
    //   href: '/',
    // },
    {
      id: 2,
      type: 'link',
      title: t('articles'),
      href: '/articles',
    },
    {
      id: 3,
      type: 'menu',
      title: t('category'),
      href: '/category',
    },
    {
      id: 4,
      type: 'menu',
      title: t('resources'),
      href: '/resources',
    },
    {
      id: 5,
      type: 'link',
      title: t('about'),
      href: '/about',
    },
  ];
};

interface NavItemProps extends ButtonProps {
  data: {
    type: 'link' | 'menu';
    title: string;
    href: Pathname;
  };
}

function NavItem({ data, ...restProps }: NavItemProps) {
  const { type, title, href } = data;

  const btnRef = useRef<ComponentRef<'button'>>(null);

  const { open, onClose, onToggle } = useDisclosure();

  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  if (type === 'link') {
    return (
      <ChakraLink
        pos='relative'
        justifyContent='center'
        gap={1.5}
        overflow='hidden'
        px={3}
        py={2}
        _hover={{
          textDecoration: 'none',
          color: 'primary',
          '&:not([data-active="true"])': {
            _before: {
              width: 'calc(100% - 12px)', // 12px is px
              opacity: 1,
            },
          },
        }}
        _before={{
          content: '""',
          position: 'absolute',
          bottom: 0.5,
          rounded: 'sm',
          width: 0,
          height: 0.5,
          bg: 'primary',
          opacity: 0,
          transitionDuration: '0.2s',
          transitionProperty: 'width, opacity',
          transitionTimingFunction: 'ease-in-out',
        }}
        _after={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          rounded: 'md',
          width: '100%',
          height: 0,
          bg: 'primary/10',
          opacity: 0,
          transitionDuration: '0.2s',
          transitionProperty: 'height, opacity',
          transitionTimingFunction: 'ease-in-out',
        }}
        outline='none'
        asChild
        css={{
          '&[data-active="true"]': {
            _after: { height: '100%', opacity: 1 },
            '& > svg': { color: 'primary' },
            '& > span': { color: 'primary' },
          },
        }}
        data-active={isActive}
        rounded='md'
      >
        <LocaleLink href={href}>
          <Box
            as='span'
            fontSize='md'
            fontWeight='medium'
            transition='color 0.2s ease-in-out'
          >
            {title}
          </Box>
          <Show when={isActive}>
            <Box
              pos='absolute'
              top={0}
              left='-100%'
              w='80%'
              h='full'
              bgImage='linear-gradient(90deg, transparent, {colors.snow/60})'
              transform='skew(45deg)'
              animationStyle='shiny-glass'
              content='""'
            />
          </Show>
        </LocaleLink>
      </ChakraLink>
    );
  }

  return (
    <MenuRoot
      open={open}
      onPointerDownOutside={onClose}
      onEscapeKeyDown={onClose}
    >
      <MenuTrigger asChild>
        <Button
          ref={btnRef}
          pos='relative'
          justifyContent='center'
          gap={1.5}
          overflow='hidden'
          px={3}
          py={2}
          color='fg.default'
          fontSize='md'
          bg='transparent'
          border='2px solid transparent'
          _hover={{
            color: 'primary',
            '&:not([data-active="true"])': {
              _before: {
                width: 'calc(100% - 12px)', // 12px is px
                opacity: 1,
              },
            },
          }}
          _before={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            rounded: 'sm',
            width: 0,
            height: 0.5,
            bg: 'primary',
            opacity: 0,
            transitionDuration: '0.2s',
            transitionProperty: 'width, opacity, background',
            transitionTimingFunction: 'ease-in-out',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            rounded: 'md',
            width: '100%',
            height: 0,
            bg: 'primary/10',
            opacity: 0,
            transitionDuration: '0.2s',
            transitionProperty: 'height, opacity',
            transitionTimingFunction: 'ease-in-out',
          }}
          outline='none'
          css={{
            '&[data-selected="true"]': {
              borderColor: 'primary',
              transition: 'border-color 0.2s ease-in-out 0.1s',
              _after: { bg: 'transparent' },
            },
            '&[data-active="true"]': {
              _before: {
                bg: 'transparent',
                opacity: 0,
                transitionDelay: '0.1s',
              },
              _after: { height: '100%', opacity: 1 },
              '& > svg': { color: 'primary' },
              '& > span': { color: 'primary' },
            },
          }}
          data-active={open}
          data-selected={open}
          onClick={onToggle}
          rounded='md'
          {...restProps}
        >
          <Box
            as='span'
            flex={1}
            fontSize='md'
            fontWeight='medium'
            transition='color 0.2s ease-in-out'
          >
            {title}
          </Box>
          <DropdownIcon active={open} />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value='new-txt' onClick={onClose}>
          New Text File
        </MenuItem>
        <MenuItem value='new-file'>New File...</MenuItem>
        <MenuRoot positioning={{ placement: 'right-start', gutter: 2 }}>
          <MenuTriggerItem value='open-recent'>Open Recent</MenuTriggerItem>
          <MenuContent>
            <MenuItem value='panda' onClick={onClose}>
              Panda
            </MenuItem>
            <MenuItem value='ark'>Ark UI</MenuItem>
            <MenuItem value='chakra'>Chakra v3</MenuItem>
          </MenuContent>
        </MenuRoot>
        <MenuItem value='open-file'>Open File...</MenuItem>
        <MenuItem value='export'>Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}

function DropdownIcon({ active = false }: { active?: boolean }) {
  return (
    <Box
      as='span'
      display='inline-block'
      w='14px'
      _before={{
        transform: 'rotate(45deg) scaleX(0.8) translate(-2.8px, 2.8px)',
      }}
      _after={{
        transform: 'rotate(-45deg) scaleX(0.8) translate(2.8px, 2.8px)',
      }}
      transition='color 0.2s ease-in-out'
      aria-hidden='true'
      css={{
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '48%',
          right: '12px',
          w: '14px',
          h: 0.5,
          bg: 'currentcolor',
          transformOrigin: 'center',
          transitionProperty: 'transform, background',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-in-out',
        },
        '&[data-active="true"]': {
          _before: {
            bg: 'primary',
            transform: 'rotate(45deg) scaleX(1) translate(0)',
          },
          _after: {
            bg: 'primary',
            transform: 'rotate(-45deg) scaleX(1) translate(0)',
          },
        },
      }}
      data-active={active}
    />
  );
}

export function NavigationList() {
  const t = useTranslations('layout.header.navigation');

  return (
    <Box
      as='nav'
      justifyContent={{ base: 'center', xl: 'flex-start' }}
      flex={1}
      display={{ base: 'none', lg: 'flex' }}
      ml={{ xl: 4 }}
      aria-labelledby='main-menu-content'
    >
      <List.Root
        id='main-menu-content'
        listStyle='none'
        flexDirection='row'
        align='center'
        gap={2}
      >
        <For each={navigationList(t)}>
          {({ id, ...restData }) => {
            return (
              <List.Item key={id} display='flex'>
                <NavItem data={restData} />
              </List.Item>
            );
          }}
        </For>
      </List.Root>
    </Box>
  );
}

NavigationList.displayName = 'NavigationList';
