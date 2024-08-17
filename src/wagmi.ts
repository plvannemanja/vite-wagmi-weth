import { http, createConfig } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect, metaMask } from 'wagmi/connectors'

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
const tenderlyKeyMainNet = import.meta.env.VITE_WC_TENDERLY_NODE_ACCESS_KEY_MAINNET;

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(`https://mainnet.gateway.tenderly.co/${tenderlyKeyMainNet}`),
    [sepolia.id]: http(`https://mainnet.gateway.tenderly.co/${tenderlyKeyMainNet}`),
 
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
