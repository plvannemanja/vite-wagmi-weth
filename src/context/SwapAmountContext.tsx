import React, { createContext, useContext, useState } from "react";
import { ContextProviderProps, SwapAmountContextType } from "../types";


const SwapAmountContext = createContext<SwapAmountContextType | undefined>(undefined);

export const SwapAmountProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [amount, setAmount] = useState<string>("0");

	return (
		<SwapAmountContext.Provider value={{amount, setAmount}}>
			{children}
		</SwapAmountContext.Provider>
	)
}

export const useSwapAmount = () => {
	const context = useContext(SwapAmountContext);
	if (context === undefined)
		throw new Error('SwapAmount context must be used within provider');

	return context;
}