import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StytchProvider from "@/components/StytchProvider";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TANKA-STADIUM",
  description: "短歌を世界中のユーザと共有するサービスです",
  openGraph: {
    title: "TANKA-STADIUM",
    description: "短歌を世界中のユーザと共有するサービスです",
    siteName: "TANKA-STADIUM",
    images: {
      url: "/tanka-stadium.webp",
      alt: "TANKA-STADIUM",
      width: "1024",
      height: "1024",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StytchProvider>
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    </StytchProvider>
  );
}
