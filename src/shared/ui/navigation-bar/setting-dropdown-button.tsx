import { Icon, IconButton } from '@chakra-ui/react';
import { Settings } from 'lucide-react';
import { motion } from 'motion/react';

import { useMouseMotion } from '@/shared/lib/utility-hooks';

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../menu';
import { Switch } from '../switch';

const MotionIcon = motion.create(Icon);

function SettingDropdownButton() {
  const { controls, handleMouseEnter, handleMouseLeave } = useMouseMotion();

  return (
    <MenuRoot
      lazyMount
      positioning={{ placement: 'bottom-end' }}
      closeOnSelect={false}
    >
      <MenuTrigger asChild>
        <IconButton
          pos='relative'
          display={{ base: 'none', md: 'flex' }}
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
          <MotionIcon
            as={Settings}
            w={5}
            h={5}
            color='fg.default'
            css={{ transition: 'color 0.2s ease-in-out' }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 12,
              delay: 0.1,
            }}
            variants={{
              normal: { rotate: 0 },
              animate: { rotate: 180 },
            }}
            animate={controls}
          />
        </IconButton>
      </MenuTrigger>
      <MenuContent w={36}>
        <MenuItem value='react' justifyContent='space-between'>
          theme <Switch />
        </MenuItem>
        <MenuItem value='solid' justifyContent='space-between'>
          language <Switch />
        </MenuItem>
        <MenuItem value='vue' justifyContent='space-between'>
          music
          <Switch />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}

SettingDropdownButton.displayName = 'SettingDropdownButton';
export default SettingDropdownButton;
