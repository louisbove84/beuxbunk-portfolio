'use client';

import { ReactNode } from 'react';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'viem/chains';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'snake',
          name: 'Meme Games Hub',
          logo: 'https://www.beuxbunk.com/itsFine-200x200.jpg',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
}