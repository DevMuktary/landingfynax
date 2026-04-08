import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fynax Bookkeeper | Free Training",
  description: "How to Keep Clean Business Records and Never Lose Track of Your Money Again",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50">
        {children}
      </body>
    </html>
  );
}
