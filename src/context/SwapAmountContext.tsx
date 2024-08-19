import React, { createContext, useContext, useState } from 'react';
import { ContextProviderProps, SwapAmountContextType } from '../types';
import { useReadContract } from 'wagmi';
import { oracleAbi } from '../contract/oracleAbi';
import { formatUnits } from 'viem';

const oracleAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';

const SwapAmountContext = createContext<SwapAmountContextType | undefined>(
  undefined
);

export const SwapAmountProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const {
    data: oraclePrice,
    isError: oracleError,
    isLoading: oracleLoading,
  } = useReadContract({
    address: oracleAddress,
    abi: oracleAbi,
    functionName: 'latestRoundData',
  });

  // Extracting the price from the result
  const price =
    oraclePrice && Array.isArray(oraclePrice) ? oraclePrice[1] : null;
  const priceInUsd = price ? formatUnits(price, 8) : null;

  const [amount, setAmount] = useState<string>('0');
  const [usdAmount, setUsdAmount] = useState<string>('0');

  const setTotalAmount = (amount: string) => {
    setAmount(amount);
    if (priceInUsd === null) {
      setUsdAmount('0.0');
    } else {
      setUsdAmount(String(Number(amount) * Number(priceInUsd)));
    }
  };

  return (
    <SwapAmountContext.Provider
      value={{
        amount,
        setAmount: setTotalAmount,
        usdAmount,
        oracleError,
        oracleLoading,
      }}
    >
      {children}
    </SwapAmountContext.Provider>
  );
};

export const useSwapAmount = () => {
  const context = useContext(SwapAmountContext);
  if (context === undefined)
    throw new Error('SwapAmount context must be used within provider');

  return context;
};
