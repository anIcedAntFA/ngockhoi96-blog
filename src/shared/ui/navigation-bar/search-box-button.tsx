import {
  DialogRootProvider,
  HStack,
  Icon,
  IconButton,
  Input,
  Kbd,
  Show,
  Text,
  useDialog,
  VisuallyHidden,
} from '@chakra-ui/react';
import { CircleX, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { ComponentRef } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMouseMotion } from '@/shared/lib/utility-hooks';

import { Button } from '../button';
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../dialog';
import { InputGroup } from '../input-group';

const MotionIcon = motion.create(Icon);

export function SearchBoxButton() {
  const [searchText, setSearchText] = useState<string>('');

  const placeholderRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<ComponentRef<'input'>>(null);

  const searchBox = useDialog();

  const t = useTranslations('components.search');

  const { controls, handleMouseEnter, handleMouseLeave } = useMouseMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //* Detect ⌘ + k on Mac, Ctrl + k on Windows
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'cmd-k')) {
        e.preventDefault();
        searchBox.setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchBox]);

  const clearSearchText = () => {
    setSearchText('');
  };

  return (
    <DialogRootProvider
      motionPreset='slide-in-top'
      onExitComplete={clearSearchText}
      placement='center'
      size={{ base: 'md', xl: 'lg' }}
      value={searchBox}
    >
      <DialogTrigger asChild>
        <IconButton
          pos='relative'
          display={{ base: 'flex', md: 'none', lg: 'flex', xl: 'none' }}
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
          aria-label={t('searchButton.placeholder')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          rounded={{ base: 'sm', sm: 'md' }}
          size='sm'
        >
          <MotionIcon
            as={Search}
            w={5}
            h={5}
            color='fg.default'
            variants={{
              normal: { x: 0, y: 0 },
              animate: {
                x: [0, 0, -3, 0],
                y: [0, -4, 0, 0],
              },
            }}
            transition={{
              duration: 0.8,
              bounce: 0.2,
              delay: 0.1,
            }}
            animate={controls}
            css={{ transition: 'color 0.2s ease-in-out' }}
          />
        </IconButton>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button
          display={{ base: 'none', md: 'flex', lg: 'none', xl: 'flex' }}
          maxW='300px'
          minW='240px'
          flex={1}
          color='fgBase'
          mx='auto'
          bg='ghostWhite/20'
          borderWidth='2px'
          borderColor='transparent'
          shadow='0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)'
          _hover={{
            bg: 'ghostWhite/60',
            '&:not(:focus)': { borderColor: 'primary' },
            _icon: { color: 'primary' },
            '& p, kbd': { color: 'primary' },
          }}
          _focus={{
            outline: '2px solid {colors.primary/60}',
            outlineOffset: 0.5,
          }}
          _dark={{ bg: 'gray.700/70', _hover: { bg: 'gray.700/90' } }}
          transition='border 0.2s ease-in-out, background 0.2s ease-in-out'
          aria-label={t('searchButton.placeholder')}
          rounded='md'
          size='sm'
          variant='outline'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MotionIcon
            as={Search}
            w={4}
            h={4}
            color='fgSecondary'
            variants={{
              normal: { x: 0, y: 0 },
              animate: {
                x: [0, 0, -4, 0],
                y: [0, -4, 0, 0],
              },
            }}
            transition={{
              duration: 0.8,
              bounce: 0.2,
              delay: 0.1,
            }}
            animate={controls}
            css={{ transition: 'color 0.2s ease-in-out' }}
          />
          <HStack w='full'>
            <Text
              ref={placeholderRef}
              flex={1}
              color='fgSecondary'
              fontWeight='medium'
              textAlign='left'
              transition='color 0.2s ease-in-out'
            >
              {t('searchButton.placeholder')}
            </Text>
            <HStack gap={1}>
              <VisuallyHidden>{t('searchButton.press')}</VisuallyHidden>
              <Kbd
                bg='gray.100'
                borderColor='gray.300'
                _dark={{ borderColor: 'colors.snow/30', bg: 'gray.100/10' }}
                transition='color 0.2s ease-in-out'
                colorPalette='fgSecondary'
                size='sm'
              >
                <abbr title='Control'>Ctrl</abbr>
              </Kbd>
              <VisuallyHidden>{t('searchButton.and')}</VisuallyHidden>
              <Kbd
                bg='gray.100'
                borderColor='gray.300'
                _dark={{ borderColor: 'colors.snow/30', bg: 'gray.100/10' }}
                transition='color 0.2s ease-in-out'
                colorPalette='fgSecondary'
                size='sm'
              >
                K
              </Kbd>
              <VisuallyHidden>{t('searchButton.toSearch')}</VisuallyHidden>
            </HStack>
          </HStack>
        </Button>
      </DialogTrigger>
      <DialogContent
        bg='bg.default'
        color='fg.default'
        rounded={{ base: 'md', xl: 'lg' }}
        fontSize={{ base: 'sm', lg: 'md' }}
      >
        <DialogHeader px={{ base: 4, sm: 6 }}>
          <HStack>
            <InputGroup
              w='full'
              startElement={
                <>
                  <Icon as={Search} w={4} h={4} color='fgSecondary' />
                  <VisuallyHidden>{t('searchBox.search')}</VisuallyHidden>
                </>
              }
              endElement={
                <Show when={searchText.length > 0}>
                  <IconButton
                    minW={5}
                    bg='transparent'
                    aria-label={t('searchBox.clearButtonLabel')}
                    onClick={clearSearchText}
                  >
                    <Icon as={CircleX} w={4} h={4} color='fgBase' />
                  </IconButton>
                </Show>
              }
            >
              <Input
                ref={inputRef}
                borderWidth='2px'
                _focus={{ borderColor: 'primary', outline: 'none' }}
                transition='border 0.2s ease-in-out'
                caretColor='primary'
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('searchBox.placeholder')}
                rounded='md'
                size={{ base: 'md', sm: 'lg' }}
                style={{
                  paddingInlineStart: '36px',
                  paddingInlineEnd: '40px',
                }}
                value={searchText}
              />
            </InputGroup>
            <Button
              p={0}
              bg='transparent'
              _hover={{
                '& kbd': { color: 'primary/80', borderColor: 'primary/80' },
              }}
              size={{ base: 'sm', sm: 'md' }}
              aria-label={t('searchBox.dialogCloseTriggerLabel')}
              onClick={searchBox.getCloseTriggerProps().onClick}
            >
              <Kbd
                h={{ base: 10, sm: 11 }}
                px={2}
                py={3}
                bg='gray.100'
                borderColor='gray.300'
                _dark={{ borderColor: 'colors.snow/30', bg: 'gray.100/10' }}
                size={{ base: 'sm', sm: 'md' }}
                transitionDuration='moderate'
                transitionProperty='border, color'
                transitionTimingFunction='ease-in-out'
                variant='raised'
              >
                Esc
              </Kbd>
            </Button>
          </HStack>
        </DialogHeader>
        <DialogBody
          px={{ base: 4, sm: 6 }}
          pb={{ base: 4, sm: 6 }}
          pt={{ base: 1, sm: 2 }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DialogBody>
      </DialogContent>
    </DialogRootProvider>
  );
}

SearchBoxButton.displayName = 'SearchBoxButton';
