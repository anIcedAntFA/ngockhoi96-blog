'use client';

import { Icon, Presence } from '@chakra-ui/react';
import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react/button';
import { ArrowUpIcon } from 'lucide-react';
import { useEffect } from 'react';

import useBoolean from '../lib/utility-hooks/use-boolean';

import { Button } from './button';
import { Tooltip } from './tooltip';

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

const DEFAULT_OFFSET_TOP = 400;

function ScrollToTopButton({
  top = DEFAULT_OFFSET_TOP,
  isSmooth = true,
  ...ckBtnProps
}: IScrollToTopButtonProps) {
  const showBtn = useBoolean();

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
    <Presence
      animationDuration='slow'
      animationStyle={{ _open: 'scale-fade-in', _closed: 'scale-fade-out' }}
      lazyMount
      present={showBtn.value}
      unmountOnExit
    >
      <Tooltip
        content='Scroll to top'
        positioning={{ placement: 'left' }}
        showArrow
        openDelay={400}
        closeDelay={200}
      >
        <Button
          aria-label='Scroll to top'
          position='sticky'
          left='100%'
          bottom={8}
          zIndex={8}
          mr={8}
          w={16}
          h={16}
          mb={8}
          bg='white'
          border='2px solid'
          borderColor='green.500'
          borderRadius='full'
          boxShadow='4px 4px 8px 1px var(--shadow-color)'
          shadowColor='green.500/20'
          cursor='pointer'
          overflow='hidden'
          userSelect='none'
          transition='background-color 0.3s ease-in-out'
          display='flex'
          _hover={{
            bg: 'green.500',
            '& svg': {
              color: 'gray.800/80',
              animation: `goToTopIcon 0.8s cubic-bezier(0.57, 0.21, 0.69, 1.25)`,
            },
          }}
          onClick={handleScrollToTop}
          {...ckBtnProps}
        >
          <Icon w={7} h={7} color='ngockhoi96'>
            <ArrowUpIcon />
          </Icon>
        </Button>
      </Tooltip>
    </Presence>
  );
}

ScrollToTopButton.displayName = 'ScrollToTopButton';

export default ScrollToTopButton;
