"use client";

import { ThemeProvider } from "next-themes";
import { ConvexProvider } from "./lib/convexClient";
import { convex } from "./lib/convexClientInstance";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </ConvexProvider>
  );
}
