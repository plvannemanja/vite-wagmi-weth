import { ReactNode } from "react";

export interface SwapAmountContextType {
  amount: string;
  setAmount: (amount: string) => void;
}

export interface ContextProviderProps {
  children: ReactNode;
}

export type SwapInputProps = {
  type: "eth" | "weth";
  tokenSymbol?: string;
  tokenBalance: string
  current: string;
  max?: string;
};