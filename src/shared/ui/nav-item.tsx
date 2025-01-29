import type { LinkProps } from '@chakra-ui/react';
import { Box, Link as ChakraLink, Icon, Show } from '@chakra-ui/react';
import { ArrowUpRight } from 'lucide-react';

interface NavItemProps extends LinkProps {
  hoverType?: 'line' | 'bg' | 'icon';
}

function NavItem({
  target,
  children,
  hoverType = 'line',
  ...linkProps
}: NavItemProps) {
  return (
    <ChakraLink
      pos='relative'
      gap={1}
      px={1}
      py={0.5}
      color='blue.600'
      _hover={{
        textDecoration: 'none',
        '& > svg': { scale: 1 },
      }}
      _dark={{ color: 'blue.400' }}
      css={{
        '&[data-hover-type="line"]': {
          _before: {
            content: '""',
            position: 'absolute',
            bottom: 0,
            w: 0,
            h: 0.5,
            borderRadius: 'md',
            bg: 'blue.600',
            transition: 'width 0.3s',
            _dark: {
              bg: 'blue.400',
            },
          },
          _hover: {
            _before: {
              w: 'full',
            },
          },
        },
        '&[data-hover-type="bg"]': {
          _after: {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'md',
            bg: 'transparent',
            transition: 'background 0.3s',
          },
          _hover: {
            _after: {
              bg: 'blue.100',
              _dark: {
                bg: 'blue.500/8',
              },
            },
          },
        },
        '&[data-hover-type="icon"]': {
          _after: {
            content: '""',
            position: 'absolute',
            top: '14px',
            left: '22px ',
            borderRadius: 'md',
            w: 'calc(100% + 14px)',
            h: 'calc(100% + 6px)',
            bg: 'transparent',
            opacity: 0.1,
            transform: 'translate(-50%, -50%)',
            transition: 'background 0.3s',
          },
          _hover: {
            _after: {
              bg: 'fgBase',
              opacity: 0.1,
            },
          },
        },
        '&[target = "_blank"]': {
          _hover: {
            _before: {
              w: `calc(100% - 16px - 8px)`, // 16px for icon size, 8px for gap
            },
          },
        },
      }}
      data-hover-type={hoverType}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      target={target}
      {...linkProps}
    >
      <Box as='span' zIndex={1} fontWeight='medium'>
        <Show fallback={children} when={hoverType === 'icon'}>
          <Icon w={6} h={6} color='fgBase'>
            {children}
          </Icon>
        </Show>
      </Box>
      <Show when={target === '_blank'}>
        <Icon
          w={4}
          h={4}
          transition='scale 0.3s'
          css={{
            '.chakra-link[data-hover-type="icon"] &': {
              pos: 'absolute',
              top: '-2px',
              right: '-12px',
              color: 'fgBase',
            },
          }}
          scale={0}
        >
          <ArrowUpRight />
        </Icon>
      </Show>
    </ChakraLink>
  );
}

NavItem.displayName = 'NavLinkItem';

export default NavItem;
