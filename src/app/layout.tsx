import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messanger Clone",
  description: "Messanger Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContext>
        {/* if we do not make context than we got a hydration error means div can not be a child of html that's why always make context of such things */}
        {/* <Toaster position="top-center"/> */}
        <body className={inter.className}>{children}</body>
      </AuthContext>
    </html>
  );
}
