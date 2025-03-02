import { Icon, IconButton } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { useMouseMotion } from '@/shared/lib/utility-hooks';

export function RssButton() {
  const { controls, handleMouseEnter, handleMouseLeave } = useMouseMotion();

  return (
    <IconButton
      pos='relative'
      display={{ base: 'none', sm: 'flex' }}
      bg='transparent'
      _hover={{
        _before: { opacity: 1, scale: 1 },
        _icon: { color: 'primary' },
      }}
      _active={{ scale: 0.95 }}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        rounded: 'md',
        bg: 'primary/10',
        opacity: 0,
        scale: 0.6,
        transitionDuration: 'moderate',
        transitionProperty: 'opacity, scale',
        transitionTimingFunction: 'ease-in-out',
      }}
      aria-label={'searchButton.placeholder'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      rounded='md'
      size='sm'
    >
      <Icon
        w={5}
        h={5}
        color='fg.default'
        css={{ transition: 'color 0.2s ease-in-out' }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
          focusable='false'
        >
          <motion.path
            d='M4 11a9 9 0 0 1 9 9'
            variants={{
              normal: { d: 'M4 11a9 9 0 0 1 9 9' },
              animate: { d: 'M4 9a11 11 0 0 1 11 11' },
            }}
            animate={controls}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.path
            d='M4 4a16 16 0 0 1 16 16'
            variants={{
              normal: { d: 'M4 4a16 16 0 0 1 16 16' },
              animate: { d: 'M4 2a18 18 0 0 1 18 18' },
            }}
            animate={controls}
            transition={{ duration: 0.2, delay: 0.2 }}
          />
          <motion.circle
            cx='5'
            cy='19'
            r='1'
            variants={{
              animate: { r: 2.5 },
              normal: { r: 1 },
            }}
            animate={controls}
            transition={{ duration: 0.2 }}
          />
        </svg>
      </Icon>
    </IconButton>
  );
}
