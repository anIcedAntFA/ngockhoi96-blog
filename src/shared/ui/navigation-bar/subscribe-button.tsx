import {
  Box,
  DialogRootProvider,
  Icon,
  IconButton,
  Input,
  Show,
  Text,
  useBreakpointValue,
  useDialog,
  VisuallyHidden,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMouseMotion } from '@/shared/lib/utility-hooks';

import { Button } from '../button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { InputGroup } from '../input-group';

interface FormValue {
  email: string;
}

const pathVariants: Variants = {
  normal: { d: 'M5 12h14' },
  animate: {
    d: ['M5 12h14', 'M5 12h9', 'M5 12h14'],
    transition: {
      duration: 0.4,
    },
  },
};

const secondaryPathVariants: Variants = {
  normal: { d: 'm12 5 7 7-7 7', translateX: 0 },
  animate: {
    d: 'm12 5 7 7-7 7',
    translateX: [0, -4, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email')
    .email('Invalid email address'),
});

function SubscribeButton() {
  const subscribeBox = useDialog({ closeOnInteractOutside: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<FormValue>({
    mode: 'onSubmit',
    defaultValues: { email: '' },
    resolver: zodResolver(emailSchema),
  });

  const t = useTranslations('components.common.subscribeButton');

  const isTablet = useBreakpointValue({ base: false, sm: true });

  const { controls, handleMouseEnter, handleMouseLeave } = useMouseMotion();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    // subscribeBox.setOpen(false);
  };

  return (
    <DialogRootProvider
      motionPreset='slide-in-bottom'
      onExitComplete={reset}
      placement='center'
      size='md'
      value={subscribeBox}
    >
      <DialogTrigger asChild>
        <Button
          overflow='hidden'
          w={{ base: 8, lg: '120px' }}
          color='fgTertiary'
          fontSize='sm'
          fontWeight='semibold'
          bg='primary'
          shadow='sm'
          _hover={{
            bg: 'primary/90',
            _dark: { bg: 'green.400' },
            '& > svg': {
              w: { base: 4, sm: 5 },
              h: { base: 4, sm: 5 },
              opacity: 1,
              animation: 'bounce 0.8s ease-in-out infinite',
            },
          }}
          _active={{ scale: 0.9 }}
          aria-label={t('ariaLabel')}
          rounded={{ base: 'sm', sm: 'md' }}
          size={{ base: 'xs', sm: 'sm' }}
          transitionDuration='moderate'
          transitionProperty='width, background, scale'
        >
          <Icon
            w={{ base: 4, sm: 5 }}
            h={{ base: 4, sm: 5 }}
            lg={{ w: 0, h: 0, opacity: 0 }}
            transitionDuration='slower'
            transitionProperty='width, height, opacity'
          >
            <Mail />
          </Icon>
          <Box
            as='span'
            display='none'
            w={0}
            lg={{ w: 'full', display: 'inline-block' }}
          >
            {t('label')}
          </Box>
        </Button>
      </DialogTrigger>
      <DialogContent
        color='fg.default'
        fontSize={{ base: 'sm', lg: 'md' }}
        bg='bg.default'
        rounded={{ base: 'md', lg: 'lg', xl: 'xl' }}
      >
        <DialogHeader
          px={{ base: 4, sm: 6 }}
          pb={{ base: 4, sm: 6 }}
          textAlign='center'
        >
          <DialogTitle fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}>
            What’s your email?
          </DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, sm: 6 }} pt={{ base: 1, sm: 2 }}>
          <Text
            lineHeight={{ base: 'normal', sm: 'moderate' }}
            textAlign='center'
          >
            <Box as='span' display='block'>
              Want to know when I publish new content?
            </Box>
            <Box as='span' display='block'>
              Enter your email to join my free newsletter:
            </Box>
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
              mt={6}
              w='full'
              startElementProps={{ paddingInline: 3 }}
              endElementProps={{ paddingInlineStart: 3, paddingInlineEnd: 2 }}
              startElement={
                <Show when={isTablet}>
                  <Icon
                    as={Mail}
                    w={{ base: 4, sm: 5 }}
                    h={{ base: 4, sm: 5 }}
                    color='fgSecondary'
                  />
                  <VisuallyHidden>Email</VisuallyHidden>
                </Show>
              }
              endElement={
                <Show
                  fallback={
                    <IconButton
                      color='fgTertiary'
                      bg='primary'
                      shadow='sm'
                      _hover={{
                        bg: 'primary/90',
                        _dark: { bg: 'green.400' },
                      }}
                      _active={{ scale: 0.9 }}
                      aria-label='Subscribe with your email'
                      disabled={!isValid || isSubmitting}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      size='xs'
                      transitionDuration='moderate'
                      transitionProperty='background, scale'
                      type='submit'
                    >
                      <Icon w={4} h={4}>
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
                            d='M5 12h14'
                            variants={pathVariants}
                            animate={controls}
                          />
                          <motion.path
                            d='m12 5 7 7-7 7'
                            variants={secondaryPathVariants}
                            animate={controls}
                          />
                        </svg>
                      </Icon>
                    </IconButton>
                  }
                  when={isTablet}
                >
                  <Button
                    size='sm'
                    type='submit'
                    aria-label='Subscribe with your email'
                    color='fgTertiary'
                    bg='primary'
                    shadow='sm'
                    _hover={{
                      bg: 'primary/90',
                      _dark: { bg: 'green.400' },
                    }}
                    _active={{ scale: 0.9 }}
                    transitionDuration='moderate'
                    transitionProperty='background, scale'
                    disabled={!isValid || isSubmitting}
                  >
                    Subscribe
                  </Button>
                </Show>
              }
            >
              <Input
                {...register('email')}
                fontSize={{ base: 'sm', sm: 'md' }}
                borderWidth='2px'
                _focus={{ borderColor: 'primary', outline: 'none' }}
                transition='border 0.2s ease-in-out'
                autoComplete='email'
                caretColor='primary'
                placeholder='Type your email...'
                rounded='md'
                size={{ base: 'lg', sm: 'xl' }}
                style={{
                  paddingInlineStart: isTablet ? '40px' : '16px',
                  paddingInlineEnd: '110px',
                }}
              />
            </InputGroup>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRootProvider>
  );
}

SubscribeButton.displayName = 'SubscribeButton';
export default SubscribeButton;
