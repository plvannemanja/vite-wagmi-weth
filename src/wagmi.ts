import { http, createConfig } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { coinbaseWallet, injected, walletConnect, metaMask } from 'wagmi/connectors'
import { virtual_mainnet } from './tenderly.config';

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
const tenderlyAdminRPCURL = import.meta.env.VITE_WC_TENDERLY_ADMIN_RPC_URL;

export const config = createConfig({
  chains: [virtual_mainnet],
  connectors: [
    // injected(),
    metaMask(),
    // coinbaseWallet(),
    // walletConnect({ projectId }),
  ],
  transports: {
    [virtual_mainnet.id]: http(tenderlyAdminRPCURL)
  },
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
