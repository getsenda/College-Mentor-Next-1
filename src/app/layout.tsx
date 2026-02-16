"use client";
import { Roboto_Slab } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/providers/providers";
import PrimaryNavigation from "@/components/header/PrimaryNavigation";
import { usePathname } from "next/navigation";
import { Footer } from "react-day-picker";
import BackToTop from "@/components/BackToTop";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

const neuzeitGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/NeuzeitGro-Reg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeuzeitGro-Bla.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeuzeitGro-Bol.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "College Mentor",
//   description: "Your guide to colleges and careers",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHomePage = usePathname() === "/";
  return (
    <html lang="en" className={`${robotoSlab.variable} ${neuzeitGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div className="h-24 w-full bg-white animate-pulse" />}>
          {!isHomePage && (
            <div className="bg-background">
              <PrimaryNavigation />
            </div>
          )}
        </Suspense>
        <Providers>{children}</Providers>
        {/* Footer - Show on all pages except home (home has its own Footer) */}
        {/* {!isHomePage && ( */}
        {/* <div className="bg-background">
            <Footer />
            <BackToTop />
          </div> */}
        {/* )} */}
      </body>
    </html>
  );
}

