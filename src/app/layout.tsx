import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "BDIDA - מתמטיקה בדידה",
  description: "מערכת לימוד למתמטיקה בדידה מבוססת על החומרים שלך",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
