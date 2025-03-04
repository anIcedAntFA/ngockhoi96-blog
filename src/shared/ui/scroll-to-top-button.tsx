'use client';

import { Icon, IconButton } from '@chakra-ui/react';
import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react/button';
import { ArrowUpIcon } from 'lucide-react';
import type { Variants } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

import useBoolean from '../lib/utility-hooks/use-boolean';

interface IScrollToTopButtonProps extends ChakraButtonProps {
  top?: number;
  isSmooth?: boolean;
}

function scrollToTop(isSmooth: boolean) {
  if (!isSmooth) {
    document.documentElement.scrollTop = 0;
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const DEFAULT_OFFSET_TOP = 200;

const MotionIconButton = motion.create(IconButton);

const motionVariant: Variants = {
  initial: { opacity: 0, scale: 0.5, visibility: 'hidden' },
  animate: { opacity: 1, scale: 1, visibility: 'visible' },
  exit: { opacity: 0, scale: 0.5 },
};

export function ScrollToTopButton({
  top = DEFAULT_OFFSET_TOP,
  isSmooth = true,
}: IScrollToTopButtonProps) {
  const showBtn = useBoolean(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTopPosition = document.documentElement.scrollTop >= top;
      showBtn.setValue(isTopPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showBtn, top]);

  const handleScrollToTop = () => {
    scrollToTop(isSmooth);
    showBtn.off();
  };

  return (
    <AnimatePresence>
      {showBtn.value && (
        <MotionIconButton
          aria-label='Scroll to top'
          pos='sticky'
          zIndex={8}
          bottom={8}
          left='100%'
          display='flex'
          overflow='hidden'
          w={16}
          h={16}
          mr={8}
          mb={8}
          bg='white'
          border='2px solid'
          borderColor='primary'
          borderRadius='full'
          shadow='4px 4px 8px 1px var(--shadow-color)'
          _hover={{
            bg: 'primary',
            '& svg': {
              color: 'white',
              animation: `goToTopIcon 0.8s cubic-bezier(0.57, 0.21, 0.69, 1.25)`,
            },
          }}
          css={{ transition: 'background-color 0.3s ease-in-out' }}
          userSelect='none'
          cursor='pointer'
          shadowColor='primary/20'
          animate='animate'
          exit='exit'
          initial='initial'
          variants={motionVariant}
          onClick={handleScrollToTop}
        >
          <Icon w={7} h={7} color='primary'>
            <ArrowUpIcon />
          </Icon>
        </MotionIconButton>
      )}
    </AnimatePresence>
  );
}

ScrollToTopButton.displayName = 'ScrollToTopButton';
