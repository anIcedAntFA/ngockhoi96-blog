import { useMemo, useState } from 'react';

type InitialValue = boolean | (() => boolean);

/**
 * @remarks `useBoolean` is a custom React hook that manages a boolean state.
 * It provides a set of utility functions (`on`, `off`, `toggle`) to manipulate the state.
 *
 * @param initialValue - The initial value of the boolean state. It can be a boolean value or a function returning a boolean value.
 *                       Default is `false`.
 *
 * @returns An object containing the following properties:
 * - `value`: The current state value.
 * - `setValue`: A function to set the state value.
 * - `on`: A function to set the state value to `true`.
 * - `off`: A function to set the state value to `false`.
 * - `toggle`: A function to toggle the state value.
 *
 * @example
 * const { value, on, off, toggle } = useBoolean(true);
 */

function useBoolean(initialValue: InitialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const callbacks = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    [],
  );

  return {
    value,
    setValue,
    ...callbacks,
  };
}

export default useBoolean;

export type UseBooleanReturn = ReturnType<typeof useBoolean>;
