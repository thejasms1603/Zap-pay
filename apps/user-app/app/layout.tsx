import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../Providers";
import AppbarClient from "../components/AppbarClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Zap Pay",
  description: "A Simple Payments App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Providers>
        <body className={geistMono.className}>
          <div className='min-w-screen min-h-screen bg-[#ebe6e6]'>
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
