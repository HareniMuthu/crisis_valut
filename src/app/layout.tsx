import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Crisis Manager",
  description: "Website for managing crises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
