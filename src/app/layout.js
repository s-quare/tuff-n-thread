import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import 'bootstrap-icons/font/bootstrap-icons.css';


import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "Tuft & Thread | Custom Hand-Tufted Rugs, Aba",
  description:
    "A studio crafting bespoke hand-tufted wool rugs for the contemporary interior. Request a custom piece.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} antialiased`}>
        <Header />
        <div className="w-full max-w-350 mx-auto ">
          {children}
        </div>
        <Footer />
        <Toaster
          position="top-center"
          
        />
      </body>
    </html>
  );
}