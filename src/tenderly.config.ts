import { defineChain } from 'viem';

const tenderlyAdminRPCURL = import.meta.env.VITE_WC_TENDERLY_ADMIN_RPC_URL;
const tenderlyPublicRPCURL = import.meta.env.VITE_WC_TENDERLY_PUBLIC_RPC_URL;

export const virtual_mainnet = defineChain({
  id: 1,
  name: 'Virtual Mainnet',
  nativeCurrency: { name: 'VETH', symbol: 'VETH', decimals: 18 },
  rpcUrls: {
    default: { http: [tenderlyAdminRPCURL] },
  },
  blockExplorers: {
    default: {
      name: 'Tenderly Explorer',
      url: tenderlyPublicRPCURL,
    },
  },
});
