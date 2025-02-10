import { Icon, IconButton } from '@chakra-ui/react';
import { Settings } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../menu';
import { Switch } from '../switch';

const MotionIcon = motion.create(Icon);

function SettingDropdownButton() {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start('animate');
  };

  const handleMouseLeave = () => {
    controls.start('normal');
  };

  return (
    <MenuRoot
      lazyMount
      positioning={{ placement: 'bottom-end' }}
      closeOnSelect={false}
    >
      <MenuTrigger asChild>
        <IconButton
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
          aria-label={'searchButton.placeholder'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          rounded={{ base: 'sm', sm: 'md' }}
          size={{ base: 'xs', sm: 'sm' }}
        >
          <MotionIcon
            as={Settings}
            w={{ base: 4, sm: 4.5 }}
            h={{ base: 4, sm: 4.5 }}
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
