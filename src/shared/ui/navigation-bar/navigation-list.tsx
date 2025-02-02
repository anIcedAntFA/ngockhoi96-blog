import {
  Box,
  Button,
  Link as ChakraLink,
  For,
  Icon,
  List,
  Show,
  useDisclosure,
} from '@chakra-ui/react';
import { Contact, Home, Newspaper, Package } from 'lucide-react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations, type MessageKeys } from 'next-intl';
import type { ComponentRef } from 'react';
import { useRef, type ReactElement } from 'react';

import { Link as LocaleLink, type Pathname } from '@/shared/lib/i18n';

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from '../menu';

type NavigationListKey = MessageKeys<
  { home: string; about: string; articles: string; resources: string },
  'home' | 'about' | 'articles' | 'resources'
>;

const navigationList = (
  t: (key: NavigationListKey) => string,
): {
  id: number;
  type: 'link' | 'menu';
  title: string;
  icon: ReactElement;
  href: Pathname;
}[] => {
  return [
    {
      id: 1,
      type: 'link',
      title: t('home'),
      icon: <Home />,
      href: '/',
    },
    {
      id: 2,
      type: 'link',
      title: t('about'),
      icon: <Contact />,
      href: '/about',
    },
    {
      id: 3,
      type: 'link',
      title: t('articles'),
      icon: <Newspaper />,
      href: '/articles',
    },
    {
      id: 4,
      type: 'menu',
      title: t('resources'),
      icon: <Package />,
      href: '/resources',
    },
  ];
};

type NavItemProps = {
  data: {
    type: 'link' | 'menu';
    title: string;
    icon: ReactElement;
    href: Pathname;
  };
};

function NavItem({ data }: NavItemProps) {
  const { type, title, icon, href } = data;

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
        gap={{ lg: 1, xl: 2 }}
        overflow='hidden'
        px={{ lg: 2, xl: 3 }}
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
          transition: 'width 0.3s, opacity 0.3s',
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
          transition: 'height 0.3s, opacity 0.3s',
        }}
        outline='none'
        asChild
        css={{
          '&[data-active="true"]': {
            _after: {
              height: '100%',
              opacity: 1,
            },
            '& > svg': {
              color: 'primary',
            },
            '& > span': {
              fontWeight: 'semibold',
              color: 'primary',
            },
          },
        }}
        data-active={isActive}
        rounded='md'
      >
        <LocaleLink href={href}>
          <Icon w={4} h={4} transition='color 0.3s' xl={{ w: 5, h: 5 }}>
            {icon}
          </Icon>
          <Box
            as='span'
            fontSize={{ lg: 'sm', xl: 'md' }}
            fontWeight='medium'
            transition='color 0.3s'
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
    <MenuRoot open={open} onEscapeKeyDown={onClose}>
      <MenuTrigger asChild>
        <Button
          ref={btnRef}
          pos='relative'
          justifyContent='center'
          gap={{ lg: 1, xl: 2 }}
          overflow='hidden'
          px={{ lg: 2, xl: 3 }}
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
            transition: 'width 0.3s, opacity 0.3s, background 0.3s',
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
            transition: 'height 0.3s, opacity 0.3s',
          }}
          outline='none'
          css={{
            '&[data-selected="true"]': {
              borderColor: 'primary',
              transition: 'border-color 0.3s ease-in-out 0.2s',
              _after: {
                bg: 'transparent',
              },
            },
            '&[data-active="true"]': {
              _before: {
                bg: 'transparent',
                opacity: 0,
                transitionDelay: '0.2s',
              },
              _after: {
                height: '100%',
                opacity: 1,
              },
              '& > svg': {
                color: 'primary',
              },
              '& > span': {
                fontWeight: 'semibold',
                color: 'primary',
              },
            },
          }}
          data-active={open}
          data-selected={open}
          onClick={onToggle}
          rounded='md'
        >
          <Icon w={4} h={4} transition='color 0.3s' xl={{ w: 5, h: 5 }}>
            {icon}
          </Icon>
          <Box
            as='span'
            fontSize={{ lg: 'sm', xl: 'md' }}
            fontWeight='medium'
            transition='color 0.3s'
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
      w={4}
      ml={{ lg: '6px', xl: 0 }}
      _before={{
        transform: 'rotate(45deg) scaleX(0.7) translate(-3px, 3px)',
      }}
      _after={{
        transform: 'rotate(-45deg) scaleX(0.7) translate(3px, 3px)',
      }}
      transition='color 0.3s'
      aria-hidden='true'
      css={{
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '48%',
          right: '12px',
          w: 4,
          h: 0.5,
          bg: 'currentcolor',
          transformOrigin: 'center',
          transition: 'transform 0.3s, background 0.3s',
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

function NavigationList() {
  const t = useTranslations('layout.header.navigation');

  return (
    <Box
      as='nav'
      pos='absolute'
      left='50%'
      transform='translateX(-50%)'
      aria-labelledby='main-menu-content'
      xl={{ pos: 'static', transform: 'unset' }}
    >
      <List.Root
        id='main-menu-content'
        listStyle='none'
        flexDirection='row'
        align='center'
        gap={2}
      >
        <For each={navigationList(t)}>
          {({ id, ...restData }) => (
            <List.Item key={id} display='flex'>
              <NavItem data={restData} />
            </List.Item>
          )}
        </For>
      </List.Root>
    </Box>
  );
}

NavigationList.displayName = 'NavigationList';
export default NavigationList;
