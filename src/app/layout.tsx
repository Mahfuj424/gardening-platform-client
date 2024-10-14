// pages/_app.tsx
// import DarkModeClient from "@/components/localstorageDeployFiles/DarkModeProvider";
import "./globals.css";
import Providers from "@/lib/providers/Providers";
import dynamic from "next/dynamic";
const DarkModeClient = dynamic(()=> import('@/components/localstorageDeployFiles/DarkModeProvider'),{ssr:false})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DarkModeClient>{children}</DarkModeClient>
        </Providers>
      </body>
    </html>
  );
}
