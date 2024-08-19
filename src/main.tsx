import { Buffer } from 'buffer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import App from './App.tsx';
import { config } from './wagmi.ts';

import './index.css';

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Flex
            width="100vw"
            height="100vh"
            alignItems="center"
            justifyContent="center"
          >
            <App />
          </Flex>
        </QueryClientProvider>
      </ChakraProvider>
    </WagmiProvider>
  </React.StrictMode>
);
