import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
 metadataBase: new URL("https://comments-next-auth-actions.vercel.app/"),
 title: "Frontend Mentor | Comments App",
 description: "Interactive comments section.",
 generator: "Next.js",
 applicationName: "Comments Agile Team Board",
 referrer: "origin-when-cross-origin",
 keywords: ["Next.js", "React", "JavaScript", "Server Actions"],
 authors: [{ name: "Rioba Ian", url: "https://riobaian.dev" }],
 creator: "Rioba Ian",
 publisher: "Rioba Ian",
 formatDetection: {
  email: true,
  address: false,
  telephone: false,
 },
 openGraph: {
  images: [
   {
    url: "https://res.cloudinary.com/dz209s6jk/image/upload/v1639765916/Challenges/l3cxamx1e6vpngqjtdyt.jpg", // Must be an absolute URL
    width: 1800,
    height: 1600,
    alt: "Comments To your agile team discussions",
   },

   {
    url: "https://res.cloudinary.com/dz209s6jk/image/upload/v1639766022/Challenges/fwkvt3bnvjw3hwplviwc.jpg", // Must be an absolute URL
    width: 400,
    height: 800,
    alt: "Comments To your agile team discussions",
   },
   //    for mobile phones
   {
    url: "https://res.cloudinary.com/dz209s6jk/image/upload/v1639766022/Challenges/fwkvt3bnvjw3hwplviwc.jpg", // Must be an absolute URL
    width: 315,
    height: 600,
    alt: "Comments To your agile team discussions",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  site: "@rioba_riri",
  title: "Agile Frontend Team",
  description: "Comments Agile Team Board",
  images: "./opengraph-image.png",
 },
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
