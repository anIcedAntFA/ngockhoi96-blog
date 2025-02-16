import { Box, IconButton } from '@chakra-ui/react';
import { motion, MotionConfig } from 'motion/react';

import { useMenuDrawer, useMenuDrawerActions } from './navigation-bar.store';

const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);
const MotionLine = motion.create(Box);

const MOTION_VARIANTS = {
  TOP: {
    open: {
      top: ['14%', '44%', '44%'],
      rotate: ['0deg', '0deg', '45deg'],
    },
    closed: {
      top: ['44%', '44%', '14%'],
      rotate: ['45deg', '0deg', '0deg'],
    },
  },
  MIDDLE: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  BOTTOM: {
    open: {
      top: ['77%', '44%', '44%'],
      rotate: ['0deg', '0deg', '45deg'],
    },
    closed: {
      top: ['44%', '44%', '77%'],
      rotate: ['45deg', '0deg', '0deg'],
    },
  },
};

interface HamburgerButtonProps {
  isHidden?: boolean;
}

function HamburgerButton({ isHidden }: HamburgerButtonProps) {
  const showMenuDrawer = useMenuDrawer();
  const { setMenuDrawer } = useMenuDrawerActions();

  return (
    <MotionBox
      display={{ base: 'flex', lg: 'none' }}
      variants={{
        visible: { scale: 1 },
        hidden: { scale: 0 },
      }}
      animate={isHidden ? 'hidden' : 'visible'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <MotionConfig
        transition={{
          type: 'keyframes',
          stiffness: 200,
          damping: 20,
        }}
      >
        <MotionIconButton
          pos='relative'
          _hover={{
            '& span': {
              bg: 'primary',
            },
            // '&[aria-expanded="false"] span:first-of-type': {
            //   animation: 'hamburgerButtonLineTop ease-in-out 0.3s',
            // },
            // '&[aria-expanded="false"] span:nth-of-type(2)': {
            //   animation: 'hamburgerButtonLineMiddle ease-in-out 0.3s',
            // },
            // '&[aria-expanded="false"] span:last-of-type': {
            //   animation: 'hamburgerButtonLineBottom ease-in-out 0.3s',
            // },
          }}
          animate={showMenuDrawer ? 'open' : 'closed'}
          aria-expanded={showMenuDrawer}
          aria-label='Open navigation menu'
          initial={false}
          onClick={() => setMenuDrawer(!showMenuDrawer)}
          size={{ base: 'xs', sm: 'sm' }}
          variant='plain'
        >
          <MotionLine
            as='span'
            pos='absolute'
            top='35%'
            w={{ base: 8, sm: 9 }}
            h={{ base: '3px', sm: '3px' }}
            bg='fg.default'
            transform='translate3d(0, 35%, 0)'
            css={{ transition: 'background 0.2s' }}
            rounded={{ base: 'sm', sm: 'md' }}
            variants={MOTION_VARIANTS.TOP}
          />
          <MotionLine
            as='span'
            pos='absolute'
            top='44%'
            w={{ base: 8, sm: 9 }}
            h={{ base: '3px', sm: '3px' }}
            bg='fg.default'
            transform='translate3d(0, -50%, 0)'
            css={{ transition: 'background 0.2s' }}
            rounded={{ base: 'sm', sm: 'md' }}
            variants={MOTION_VARIANTS.MIDDLE}
          />
          <MotionLine
            as='span'
            pos='absolute'
            top='65%'
            w={{ base: 8, sm: 9 }}
            h={{ base: '3px', sm: '3px' }}
            bg='fg.default'
            transform='translate3d(0, -65%, 0)'
            css={{ transition: 'background 0.2s' }}
            rounded={{ base: 'sm', sm: 'md' }}
            variants={MOTION_VARIANTS.BOTTOM}
          />
        </MotionIconButton>
      </MotionConfig>
    </MotionBox>
  );
}

HamburgerButton.displayName = 'NavHamburgerButton';
export default HamburgerButton;
