import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "오수빈 개발 블로그",
  description: "프론트엔드 개발에 대한 내용들을 다룹니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="mt-[64px] flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
