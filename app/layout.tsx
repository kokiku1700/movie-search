import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "D.MS",
  description: "다양한 영화, tv 등 여러 작품을 검색해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <ReactQueryProvider>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
