'use client';

import { ReactNode } from 'react';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'viem/chains';
import { ThemeProvider } from '../contexts/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: 'auto',
            theme: 'snake',
            name: 'AI Game Generator',
            logo: 'https://www.beuxbunk.com/itsFine-200x200.jpg',
          },
        }}
      >
        {children}
      </MiniKitProvider>
    </ThemeProvider>
  );
}