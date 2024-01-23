import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar/Navbar";

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
   <body className={`${inter.className} bg-very-light-gray`}>
    <SessionProvider>
     <div
      id="body-wrapper"
      className="flex flex-col min-h-screen w-11/12 mx-auto"
     >
      <Navbar />
      <main id="main-wrapper">{children}</main>
     </div>
    </SessionProvider>
   </body>
  </html>
 );
}
