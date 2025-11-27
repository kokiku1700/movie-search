import { Metadata } from "next";


export const metadata: Metadata = {
    title: "D.MS 찜한 작품",
    description: "좋아요를 누른 작품 목록을 한 눈에 확인할 수 있습니다."
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <>
            {children}
        </>
    )
}