import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import EmotionAwareUI from './EmotionAwareUI';

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <EmotionAwareUI>
        <main className="dark text-foreground bg-background min-h-screen selection:bg-cyber-pink selection:text-white">
          {children}
        </main>
      </EmotionAwareUI>
    </NextUIProvider>
  );
}
