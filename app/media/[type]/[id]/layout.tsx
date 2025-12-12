import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D.MS",
  description: "작품의 상세 정보를 확인해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}