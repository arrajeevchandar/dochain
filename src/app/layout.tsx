  import { SessionProvider } from "next-auth/react";
  import "./globals.css";


  export const metadata = {
    title: "dochain",
    description: "Decentralized Donation Tracker",
  };

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-br from-black via-slate-900 to-blue-900 min-h-screen relative">
          
          {/* Glassy floating accent circles */}
          <div className="absolute left-0 top-0 w-60 h-60 rounded-full bg-cyan-400 opacity-10 blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute right-10 bottom-10 w-48 h-48 rounded-full bg-yellow-400 opacity-15 blur-2xl -z-10 animate-pulse"></div>
          <SessionProvider>
   
            <div className="flex-grow flex flex-col w-full">{children}</div>
    
          </SessionProvider>
        </body>
      </html>
    );
  }
