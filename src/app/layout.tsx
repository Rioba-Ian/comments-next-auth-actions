import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

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
   <body className={`${rubik.className} bg-very-light-gray`}>
    <SessionProvider>
     <div id="body-wrapper" className="flex flex-col min-h-screen mx-auto">
      <Navbar />
      <main id="main-wrapper">{children}</main>
     </div>
    </SessionProvider>
   </body>
  </html>
 );
}
