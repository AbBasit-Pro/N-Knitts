import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "N-Knitts | Handmade Knitting & Crochet",
  description:
    "At N-Knitts, we transform simple yarn into beautiful, handmade creations. From cozy knitted accessories to unique crochet pieces, every creation is crafted with care, creativity, and love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-[#fbfbf9] text-stone-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
