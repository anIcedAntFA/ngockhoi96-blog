import type { ButtonProps } from '@chakra-ui/react';
import { Icon, IconButton } from '@chakra-ui/react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { forwardRef } from 'react';

import { useMouseMotion } from '../lib/utility-hooks';

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

const MotionIcon = motion.create(Icon);

export const CloseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function CloseButton(props, ref) {
    const { controls, handleMouseEnter, handleMouseLeave } = useMouseMotion();

    return (
      <IconButton
        ref={ref}
        pos='relative'
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
        aria-label='Close'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        rounded={{ base: 'sm', sm: 'md' }}
        size={{ base: 'xs', sm: 'sm', md: 'md' }}
        variant='ghost'
        {...props}
      >
        {props.children ?? (
          <MotionIcon
            w={{ base: 4, sm: 5, md: 6 }}
            h={{ base: 4, sm: 5, md: 6 }}
            color='fg.default'
            css={{ transition: 'color 0.2s ease-in-out' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <motion.path
                variants={pathVariants}
                animate={controls}
                d='M18 6 6 18'
              />
              <motion.path
                transition={{ delay: 0.2 }}
                variants={pathVariants}
                animate={controls}
                d='m6 6 12 12'
              />
            </svg>
          </MotionIcon>
        )}
      </IconButton>
    );
  },
);
