import { redirect } from '@/shared/lib/i18n';

// This page renders when the app built statically (output: 'export')
export default function RootPage() {
  redirect({
    href: '/en',
    locale: 'en',
  });
}
