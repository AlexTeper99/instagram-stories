import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@workspace/ui/components/layout/navbar";
import { Toaster } from "@workspace/ui/components/shadcn/toaster";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <div className="min-h-screen flex flex-col items-center justify-start">
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Navbar title={"Story Manager"} />

            <main className="w-full max-w-7xl px-4 flex-grow flex flex-col items-center justify-center">
              {children}
            </main>

            <footer className="w-full  shadow py-4 text-center text-sm ">
              © {new Date().getFullYear() + " "}
              All rights reserved
            </footer>
          </NextThemesProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
