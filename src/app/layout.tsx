import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "dochain",
  description: "Decentralized Donation Tracker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          {/* Footer outside flex-grow so always at bottom */}
        </SessionProvider>
      </body>
    </html>
  );
}
