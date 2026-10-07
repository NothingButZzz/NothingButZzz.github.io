import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nothingbutzzz.github.io"),
  title: "林榆蓁 Kenny Lin — 智慧自動化 · 機電整合",
  description:
    "林榆蓁（Kenny Lin）的個人網站：北科大智慧自動化工程科，競賽機器人、火箭酬載硬體與影像處理作品。",
  alternates: {
    languages: { en: "/engineering-portfolio/" },
  },
  openGraph: {
    title: "林榆蓁 Kenny Lin — 智慧自動化 · 機電整合",
    description: "北科大智慧自動化工程科 · 競賽機器人、火箭酬載硬體與影像處理",
    url: "/",
    type: "website",
    locale: "zh_TW",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Loader />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
