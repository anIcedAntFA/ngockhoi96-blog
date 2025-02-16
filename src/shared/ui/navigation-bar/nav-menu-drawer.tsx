import {
  Box,
  Link as ChakraLink,
  Collapsible,
  For,
  Icon,
  List,
  Show,
  useCollapsible,
} from '@chakra-ui/react';
import { toolbox } from '@lucide/lab';
import {
  Code,
  Contact,
  FileJson,
  FileSearch,
  GalleryHorizontal,
  Image,
  Icon as LucideIcon,
  Newspaper,
  NotebookPen,
  Package,
  Plus,
  Rss,
  Shapes,
  UserCheck,
} from 'lucide-react';
import type { ReactElement } from 'react';

import { DESKTOP_HEADER_HEIGHT } from '@/shared/config/theme.config';
import { Link, type Pathname } from '@/shared/lib/i18n';
import type { Todo } from '@/shared/lib/utility-types';

import { DrawerBody, DrawerContent, DrawerFooter, DrawerRoot } from '../drawer';

import { useMenuDrawer, useMenuDrawerActions } from './navigation-bar.store';

export const navigationList: {
  id: number;
  type: 'link' | 'menu';
  title: string;
  icon: ReactElement;
  href: Pathname;
  children?: {
    id: number;
    type: 'link';
    title: string;
    icon: ReactElement;
    href: Todo;
  }[];
}[] = [
  {
    id: 1,
    type: 'link',
    title: 'Articles',
    icon: <Newspaper />,
    href: '/articles',
  },
  {
    id: 2,
    type: 'menu',
    title: 'Category',
    icon: <Shapes />,
    href: '/category',
    children: [
      {
        id: 2.1,
        type: 'link',
        title: 'Code',
        icon: <Code />,
        href: '/code',
      },
      {
        id: 2.2,
        type: 'link',
        title: 'Learn',
        icon: <NotebookPen />,
        href: '/learn',
      },
      {
        id: 2.3,
        type: 'link',
        title: 'Tools',
        icon: <LucideIcon iconNode={toolbox} />,
        href: '/tools',
      },
      {
        id: 2.4,
        type: 'link',
        title: 'General',
        icon: <FileJson />,
        href: '/general',
      },
    ],
  },
  {
    id: 3,
    type: 'menu',
    title: 'Resources',
    icon: <Package />,
    href: '/resources',
    children: [
      {
        id: 3.1,
        type: 'link',
        title: 'image',
        icon: <Image />,
        href: '/images',
      },
      {
        id: 3.2,
        type: 'link',
        title: 'portfolio',
        icon: <GalleryHorizontal />,
        href: '/portfolio',
      },
    ],
  },
  {
    id: 4,
    type: 'menu',
    title: 'About',
    icon: <FileSearch />,
    href: '/about',
    children: [
      {
        id: 4.1,
        type: 'link',
        title: 'about me',
        icon: <UserCheck />,
        href: '/about-ngockhoi96',
      },
      {
        id: 4.2,
        type: 'link',
        title: 'about this blog',
        icon: <Rss />,
        href: '/how-I-built-my-blog',
      },
      {
        id: 4.3,
        type: 'link',
        title: 'contact',
        icon: <Contact />,
        href: '/contact',
      },
    ],
  },
];

interface NavMenuItemProps {
  data: {
    title: string;
    icon: ReactElement;
    href: Pathname;
    children?: {
      id: number;
      type: 'link';
      title: string;
      icon: ReactElement;
      href: Todo;
    }[];
  };
}

function NavMenuItem({ data }: NavMenuItemProps) {
  const { title, icon, children } = data;

  const { setMenuDrawer } = useMenuDrawerActions();

  const collapsible = useCollapsible({
    defaultOpen: title === 'Category',
    lazyMount: true,
  });

  return (
    <Collapsible.RootProvider value={collapsible} width='full'>
      <Collapsible.Trigger
        pos='relative'
        paddingY='3'
        w='full'
        display='flex'
        alignItems='center'
        gap={3}
        py={3}
        px={2}
        cursor='pointer'
      >
        <Icon w={5} h={5}>
          {icon}
        </Icon>
        <Box as='span' flexGrow={1} fontSize='md' textAlign='start'>
          {title}
        </Box>
        <Icon
          as={Plus}
          transition='rotate 0.2s ease-in-out'
          rotate={collapsible.open ? '45deg' : '0'}
        />
      </Collapsible.Trigger>
      <Collapsible.Content pl={6}>
        <List.Root
          as='ol'
          display='grid'
          gridTemplateColumns='repeat(2, 1fr)'
          p={2}
        >
          <For each={children}>
            {({ id, ...restData }) => (
              <List.Item
                key={id}
                display='flex'
                alignItems='center'
                gap={3}
                p={2}
              >
                <ChakraLink
                  w='full'
                  textDecoration='unset'
                  asChild
                  onClick={() => setMenuDrawer(false)}
                >
                  <Link href={restData.href}>
                    <Icon w={4} h={4}>
                      {restData.icon}
                    </Icon>
                    <Box as='span'>{restData.title}</Box>
                  </Link>
                </ChakraLink>
              </List.Item>
            )}
          </For>
        </List.Root>
      </Collapsible.Content>
    </Collapsible.RootProvider>
  );
}

function NavLinkItem({ data }: NavMenuItemProps) {
  const { title, icon, href } = data;

  const { setMenuDrawer } = useMenuDrawerActions();

  return (
    <ChakraLink
      alignItems='center'
      gap={4}
      display='flex'
      w='full'
      px={2}
      py={3}
      textDecoration='unset'
      asChild
      onClick={() => setMenuDrawer(false)}
    >
      <Link href={href}>
        <Icon w={4} h={4}>
          {icon}
        </Icon>
        <Box as='span' fontSize='md'>
          {title}
        </Box>
      </Link>
    </ChakraLink>
  );
}

function NavMenuDrawer() {
  const showMenuDrawer = useMenuDrawer();

  return (
    <DrawerRoot
      size={{ base: 'full', md: 'md' }}
      open={showMenuDrawer}
      persistentElements={[() => document.querySelector('header')]}
    >
      <DrawerContent
        offset={{ base: 2, md: 4 }}
        rounded='md'
        mt={`calc(${DESKTOP_HEADER_HEIGHT}px - 8px)`}
        maxH={`calc(100dvh - ${DESKTOP_HEADER_HEIGHT}px - 8px)`}
      >
        <DrawerBody px={{ base: 2, sm: 4 }} py={{ base: 1, sm: 2 }}>
          <Box as='nav'>
            <List.Root id='main-menu-content' listStyle='none' align='center'>
              <For each={navigationList}>
                {({ id, type, ...restData }) => (
                  <Show
                    key={id}
                    fallback={
                      <List.Item
                        borderBottom='1px solid'
                        borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                        display='flex'
                        py={1}
                      >
                        <NavLinkItem data={restData} />
                      </List.Item>
                    }
                    when={type === 'menu'}
                  >
                    <List.Item
                      borderBottom='1px solid'
                      display='flex'
                      py={1}
                      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                    >
                      <NavMenuItem data={restData} />
                    </List.Item>
                  </Show>
                )}
              </For>
            </List.Root>
          </Box>
        </DrawerBody>
        <DrawerFooter>footer</DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}

NavMenuDrawer.displayName = 'NavMenuDrawer';
export default NavMenuDrawer;
