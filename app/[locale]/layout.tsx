import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "@/app/[locale]/globals.css";
import { Instrument_Sans } from 'next/font/google';
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing"; 
import AOSWrapper from "./components/AOSWrapper";

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap', // optional
  variable: '--font-instrument-sans', // optional (for Tailwind custom properties)
});

const gotham = Inter({
  variable: '--font-gotham-sans',
});

const krasar = localFont({
  src: [
    {
      path: '../fonts/KantumruyPro-Regular.ttf',
      weight: '700', // Adjust based on actual weight
      style: 'normal',
    },
  ],
  variable: '--font-krasar-sans',
});


export const metadata: Metadata = {
  title: "The Bible Society in Cambodia",
  description: "Develop by Mr.Tola",
  icons: {
    icon: '/logo.svg',
  },
};

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: RootLayoutProps) {
 
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
      notFound();
  } 
  // Providing all messages to the client side
  const messages = await getMessages(); 
  return (
    <html lang={locale}>
      <body
        className={`${gotham.variable} ${krasar.variable} ${instrumentSans.variable} antialiased h-full min-h-screen overflow-y-auto  !scroll-smooth
          
        `}
      >
        <NextIntlClientProvider messages={messages}>
          <AOSWrapper>
              <main className="w-full overflow-x-hidden !scroll-smooth">
                  {children}
              </main>
          </AOSWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
  
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}