import { Open_Sans, Lora, JetBrains_Mono } from 'next/font/google';

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans-serif',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

export const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora-serif',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

export const jetBrainMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jet-brain-mono',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});
