import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';

import "./globals.css";

export const metadata: Metadata = {
  title: "Guild — Get Drafted.",
  description:
    "Guild matches ambitious builders into committed global teams of 5–10, managed by Kairos AI. Stop learning alone. Get drafted into your pod.",
  openGraph: {
    title: "Guild — Get Drafted.",
    description:
      "Committed global builder pods with AI accountability. Apply for Cohort 1.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
