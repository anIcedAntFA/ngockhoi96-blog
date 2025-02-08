import { Box, IconButton } from '@chakra-ui/react';
import { motion, MotionConfig } from 'motion/react';

const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);
const MotionLine = motion.create(Box);

const MOTION_VARIANTS = {
  TOP: {
    open: {
      top: ['22%', '50%', '50%'],
      rotate: ['0deg', '0deg', '45deg'],
    },
    closed: {
      top: ['50%', '50%', '22%'],
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
      rotate: ['0deg', '0deg', '45deg'],
      top: ['79%', '50%', '50%'],
    },

    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '79%'],
    },
  },
};

type HamburgerButtonProps = {
  isActive: boolean;
  isHidden?: boolean;
  onClick: VoidFunction;
};

function HamburgerButton({
  isActive,
  isHidden,
  onClick,
}: HamburgerButtonProps) {
  return (
    <MotionBox
      display={{ base: 'flex', lg: 'none' }}
      variants={{
        visible: { scale: 1 },
        hidden: { scale: 0 },
      }}
      animate={isHidden ? 'hidden' : 'visible'}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
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
            '& span': { bg: 'primary' },
          }}
          animate={isActive ? 'open' : 'closed'}
          aria-expanded={isActive}
          aria-label='Open navigation menu'
          initial={false}
          onClick={onClick}
          size={{ base: 'xs', sm: 'sm' }}
          variant='ghost'
        >
          <MotionLine
            as='span'
            pos='absolute'
            top='35%'
            w={{ base: 7, sm: 8 }}
            h={{ base: 0.5, sm: '3px' }}
            bg='fg.default'
            transform='translate3d(0, 35%, 0)'
            css={{ transition: 'background 0.2s' }}
            rounded={{ base: 'sm', sm: 'md' }}
            variants={MOTION_VARIANTS.TOP}
          />
          <MotionLine
            as='span'
            pos='absolute'
            top='50%'
            w={{ base: 7, sm: 8 }}
            h={{ base: 0.5, sm: '3px' }}
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
            w={{ base: 7, sm: 8 }}
            h={{ base: 0.5, sm: '3px' }}
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

export default HamburgerButton;
