import type { ReactNode } from 'react';

type TRootLayoutProps = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// required, even if it's passing children through.
export default function RootLayout({ children }: TRootLayoutProps) {
  return children;
}
