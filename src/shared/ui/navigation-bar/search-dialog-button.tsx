import {
  DialogRootProvider,
  HStack,
  Icon,
  IconButton,
  Input,
  Kbd,
  Show,
  useDialog,
} from '@chakra-ui/react';
import { CircleX, Search } from 'lucide-react';
import type { ComponentRef } from 'react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../dialog';
import { InputGroup } from '../input-group';
import { Tooltip } from '../tooltip';

function SearchDialogButton() {
  const [searchText, setSearchText] = useState<string>('');

  const inputRef = useRef<ComponentRef<'input'>>(null);

  const searchBox = useDialog();

  const clearSearchText = () => {
    setSearchText('');
  };

  return (
    <DialogRootProvider
      motionPreset='slide-in-top'
      onExitComplete={clearSearchText}
      placement='center'
      value={searchBox}
    >
      <Tooltip content='Start typing' showArrow>
        <DialogTrigger asChild>
          <IconButton
            pos='relative'
            bg='transparent'
            _hover={{
              _before: {
                opacity: 1,
                scale: 1,
              },
              _icon: {
                color: 'primary',
                animation: 'searchIcon 0.5s ease-in-out',
              },
            }}
            _active={{ scale: 0.95 }}
            _before={{
              content: '""',
              position: 'absolute',
              inset: 0,
              rounded: 'md',
              bg: 'primary/10',
              opacity: 0,
              scale: 0.8,
              transitionDuration: 'slow',
              transitionProperty: 'opacity, scale',
              transitionTimingFunction: 'ease-in-out',
            }}
            aria-label='Search articles'
            rounded='md'
            size={{ base: 'sm', xl: 'md' }}
          >
            <Icon
              as={Search}
              w={4}
              h={4}
              color='fg.default'
              transition='color 0.3s ease-in-out'
              xl={{ w: 5, h: 5 }}
            />
          </IconButton>
        </DialogTrigger>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <HStack>
            <InputGroup
              w='full'
              startElement={<Icon as={Search} w={5} h={5} color='fgBase' />}
              endElement={
                <Show when={searchText.length > 0}>
                  <IconButton bg='transparent' onClick={clearSearchText}>
                    <Icon as={CircleX} w={5} h={5} color='fgBase' />
                  </IconButton>
                </Show>
              }
            >
              <Input
                ref={inputRef}
                _focus={{ borderColor: 'primary', outline: 'none' }}
                caretColor='primary'
                onChange={(e) => setSearchText(e.target.value)}
                placeholder='What are you looking for?'
                style={{ paddingInlineStart: '40px', paddingInlineEnd: '48px' }}
                value={searchText}
              />
            </InputGroup>
            <Button
              bg='transparent'
              p={0}
              aria-label='Close search dialog'
              _hover={{
                '& kbd': {
                  color: 'primary/80',
                  borderColor: 'primary/80',
                },
              }}
              onClick={searchBox.getCloseTriggerProps().onClick}
            >
              <Kbd
                h={10}
                px={2}
                py={3}
                colorPalette='fgBase'
                size='md'
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
        <DialogBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </DialogRootProvider>
  );
}

SearchDialogButton.displayName = 'SearchDialogButton';
export default SearchDialogButton;
