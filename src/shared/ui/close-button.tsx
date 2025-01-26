import type { ButtonProps } from '@chakra-ui/react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { CircleX } from 'lucide-react';
import * as React from 'react';

export type CloseButtonProps = ButtonProps;

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  return (
    <ChakraIconButton ref={ref} aria-label='Close' variant='ghost' {...props}>
      {props.children ?? <CircleX />}
    </ChakraIconButton>
  );
});
