import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@workspace/ui/components/layout/navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Navbar title={"Story Manager"} />
      {children}
    </NextThemesProvider>
  );
}
