import { Box, Collapsible, For, List } from '@chakra-ui/react';
import { toolbox } from '@lucide/lab';
import {
  Code,
  Contact,
  FileJson,
  FileSearch,
  GalleryHorizontal,
  Icon,
  Image,
  Newspaper,
  NotebookPen,
  Package,
  Rss,
  Shapes,
  UserCheck,
} from 'lucide-react';
import type { ReactElement } from 'react';

import { DESKTOP_HEADER_HEIGHT } from '@/shared/config/theme.config';
import type { Pathname } from '@/shared/lib/i18n';
import type { Todo } from '@/shared/lib/utility-types';

import { DrawerBody, DrawerContent, DrawerFooter, DrawerRoot } from '../drawer';

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
    icon?: ReactElement;
    href: Todo;
  }[];
}[] = [
  {
    id: 1,
    type: 'link',
    title: 'articles',
    icon: <Newspaper />,
    href: '/articles',
  },
  {
    id: 2,
    type: 'menu',
    title: 'category',
    icon: <Shapes />,
    href: '/category',
    children: [
      {
        id: 2.1,
        type: 'link',
        title: 'Coding',
        icon: <Code />,
        href: '/category/coding',
      },
      {
        id: 2.2,
        type: 'link',
        title: 'Learn',
        icon: <NotebookPen />,
        href: '/category/learn',
      },
      {
        id: 2.3,
        type: 'link',
        title: 'Tooling',
        icon: <Icon iconNode={toolbox} />,
        href: '/category/tooling',
      },
      {
        id: 2.4,
        type: 'link',
        title: 'General',
        icon: <FileJson />,
        href: '/category/general',
      },
    ],
  },
  {
    id: 3,
    type: 'menu',
    title: 'resources',
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
    title: 'about',
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

interface MobileMenuDrawerProps {
  isOpen: boolean;
}

function MobileMenuDrawer({ isOpen }: MobileMenuDrawerProps) {
  return (
    <DrawerRoot
      size='full'
      open={isOpen}
      persistentElements={[() => document.querySelector('header')]}
    >
      <DrawerContent
        offset={{ base: 2, md: 4 }}
        rounded='md'
        mt={`calc(${DESKTOP_HEADER_HEIGHT}px - 8px)`}
        maxH={`calc(100dvh - ${DESKTOP_HEADER_HEIGHT}px - 8px)`}
      >
        <DrawerBody>
          <Box as='nav'>
            <List.Root
              id='main-menu-content'
              listStyle='none'
              align='center'
              gap={2}
            >
              <For each={navigationList}>
                {({ id, ...restData }) => {
                  if (restData.type === 'menu') {
                    return (
                      <Collapsible.Root as={List.Item} key={id}>
                        <Collapsible.Trigger paddingY='3'>
                          {restData.icon} {restData.title}
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                          <List.Root as='ol'>
                            <For each={restData.children}>
                              {({ id, ...restData }) => (
                                <List.Item key={id} display='flex'>
                                  {restData.icon} {restData.title}
                                </List.Item>
                              )}
                            </For>
                          </List.Root>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    );
                  }
                  return (
                    <List.Item key={id} display='flex'>
                      {restData.icon} {restData.title}
                    </List.Item>
                  );
                }}
              </For>
            </List.Root>
          </Box>
        </DrawerBody>
        <DrawerFooter>footer</DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}

MobileMenuDrawer.displayName = 'MobileMenuDrawer';
export default MobileMenuDrawer;
