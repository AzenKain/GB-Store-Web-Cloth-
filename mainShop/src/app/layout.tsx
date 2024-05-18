"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderComponent } from '@/components/Header/Header';
import { FooterComponent } from "@/components/Footer/Footer";
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import Providers from "@/components/Providers/Providers";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html data-theme="light" lang="en">
      <head>
        <title>Glamify Shop</title>
        <meta name='description' content='Description' />
        <link rel="apple-touch-icon.png" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={inter.className}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <Providers>
          <StoreProvider>
            <HeaderComponent />
            {children}
            <div className="fixed bottom-10 right-[1rem] z-[99]">
              <ChatWidget />
            </div>
            <FooterComponent />
            <ToastContainer />
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
