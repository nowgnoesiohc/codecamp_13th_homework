import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";
import Layout from "@/commons/layout";

import { Toaster } from "@/components/ui/toaster";

const global_font = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-global-pretendard",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${global_font.variable}`}>
        <ApolloSetting>
          <Layout>{children}</Layout>
        </ApolloSetting>
        <Toaster />
      </body>
    </html>
  );
}