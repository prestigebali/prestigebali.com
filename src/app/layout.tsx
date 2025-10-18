import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import 'react-phone-number-input/style.css';
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google';
import { FloatingContact } from '@/components/floating-contact';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prestige Bali – Premium Leisures and Tours',
  description: 'Crafting premium leisure and tour experiences across Bali, Lombok, Labuan Bajo & Sumbawa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${plusJakartaSans.variable} !scroll-smooth`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <FloatingContact />
      </body>
    </html>
  );
}
