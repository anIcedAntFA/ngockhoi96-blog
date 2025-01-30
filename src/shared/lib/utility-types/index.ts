export type Todo = any;

// export type Dict<T = Todo> = Record<string, T>;

export type Nullable<T> = T | null;

export type Either<L, R> = L | R;

export type KeyType<T> = keyof T;

export type ValueType<T> = T[keyof T];

export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> &
  TOverridden;

export type NonEmptyArray<A> = [A, ...A[]];

export type NonEmptyObject<O> = keyof O extends never ? never : O;

export type EmptyObject = Record<PropertyKey, never>;

export type Primitive = string | number | boolean | null | undefined;

export type SuggestedString<T extends string> = T | Omit<string, T>;

export type BaseValue = Either<string, number>;

export type BaseOption = {
  label: string;
  value: BaseValue;
};
