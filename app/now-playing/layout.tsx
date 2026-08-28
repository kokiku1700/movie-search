import { Metadata } from "next";

export const metadata: Metadata = {
    title: "D.MS 현재 상영 중인 영화",
    description: "현재 상영 중인 영화를 확인해보세요.",
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )

}