'use client';

import { Icon } from '@chakra-ui/react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

import { textLib } from '../lib/text';
import { useMouseMotion } from '../lib/utility-hooks';

import { Button } from './button';

interface FileDownloadButtonProps {
  label: string;
  fileURL: string;
  fileName: string;
  children: ReactNode;
}

const arrowVariants: Variants = {
  normal: { y: -1 },
  animate: {
    y: 3,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 1,
    },
  },
};

export function FileDownloadButton({
  label,
  fileURL,
  fileName,
  children,
}: FileDownloadButtonProps) {
  const { controls, handleMouseEnter, handleMouseLeave } = useMouseMotion();

  return (
    <Button
      color='fgTertiary'
      fontSize='sm'
      fontWeight='semibold'
      bg='primary'
      shadow='sm'
      _hover={{ bg: 'primary/90', _dark: { bg: 'green.400' } }}
      _active={{ scale: 0.9 }}
      aria-label={label}
      onClick={() => textLib.downloadFile(fileURL, fileName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      rounded={{ base: 'sm', sm: 'md' }}
      size={{ base: 'xs', sm: 'sm' }}
      transitionDuration='moderate'
      transitionProperty='width, background, scale'
    >
      <Icon w={{ base: 4, sm: 5 }} h={{ base: 4, sm: 5 }}>
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
        >
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <motion.g variants={arrowVariants} animate={controls}>
            <polyline points='7 10 12 15 17 10' />
            <line x1='12' x2='12' y1='15' y2='3' />
          </motion.g>
        </svg>
      </Icon>
      {children}
    </Button>
  );
}
