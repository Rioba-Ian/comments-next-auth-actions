import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "FEM + Rioba Ian",
 description: "Interactive comments section.",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <SessionProvider>
     <div id="body-wrapper" className="flex min-h-screen">
      {children}
     </div>
    </SessionProvider>
   </body>
  </html>
 );
}
