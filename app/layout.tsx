import '../styles/globals.css';
import React, { ReactNode } from 'react';
import { Inter } from '@next/font/google';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* @ts-ignore */}
        <Header />
        {children}
      </body>
    </html>
  );
}
