// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "dochain",
  description: "Decentralized Donation Tracker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#101828]">
      <body className="flex flex-col min-h-screen font-sans bg-[#101828]">
        <SessionProvider>
          <div className="flex-grow flex flex-col">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
