import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

import type { Todo } from '../utility-types';

export type UseOutsideClickProps = {
  isEnabled?: boolean | (() => boolean);
  ref: RefObject<HTMLElement>;
  // eslint-disable-next-line no-unused-vars
  handler?: (e: Event) => void;
};

function useOutsideClick({
  ref,
  handler,
  isEnabled = true,
}: UseOutsideClickProps) {
  const stateRef = useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
  });

  const state = stateRef.current;

  useEffect(() => {
    if (!isEnabled) return;

    const onPointerDown: Todo = (e: PointerEvent) => {
      if (isValidEvent(e, ref)) {
        state.isPointerDown = true;
      }
    };

    const onMouseUp: Todo = (event: MouseEvent) => {
      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false;
        return;
      }

      if (state.isPointerDown && handler && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        handler(event);
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      state.ignoreEmulatedMouseEvents = true;

      if (handler && state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        handler(event);
      }
    };

    const doc = getOwnerDocument(ref.current);

    doc.addEventListener('mousedown', onPointerDown, true);
    doc.addEventListener('mouseup', onMouseUp, true);
    doc.addEventListener('touchstart', onPointerDown, true);
    doc.addEventListener('touchend', onTouchEnd, true);

    return () => {
      doc.removeEventListener('mousedown', onPointerDown, true);
      doc.removeEventListener('mouseup', onMouseUp, true);
      doc.removeEventListener('touchstart', onPointerDown, true);
      doc.removeEventListener('touchend', onTouchEnd, true);
    };
  }, [handler, ref, state, isEnabled]);
}

function isValidEvent(event: Event, ref: RefObject<HTMLElement>) {
  const target = event.target as HTMLElement;

  if (target) {
    const doc = getOwnerDocument(target);
    if (!doc.contains(target)) return false;
  }

  return !ref.current.contains(target);
}

function getOwnerDocument(node?: Element | null): Document {
  return node?.ownerDocument ?? document;
}

export default useOutsideClick;
