import { Button, HStack, Input } from "@chakra-ui/react";
import { TokenETC, TokenETH } from "@web3icons/react";
import React from "react";
import { useSwapAmount } from "../context/SwapAmountContext";

type SwapInputProps = {
  type: "eth" | "weth";
  tokenSymbol?: string;
  tokenBalance: string
  current: string;
  max?: string;
};

const SwapInput: React.FC<SwapInputProps> = ({
  type,
  tokenSymbol,
  tokenBalance,
  current,
  max,
})  => {
  const { amount, setAmount } = useSwapAmount();
  return (
    <HStack w="full" bgColor="gray.100" rounded="2xl" px="5" py="3" className="swapInputContainer">
      <div className="tokenInfo">
        <div>
          {
            type === "eth" ? (
              <TokenETC size={18} variant="branded" />
            ) : (
              <TokenETH size={18} variant="branded" />
            )
          }
          <p>{tokenSymbol}</p>
        </div>
        <p>Balance: {tokenBalance}</p>
      </div>
      {current === type && (
        <Button onClick={() => setAmount(max || "0")}>Max</Button>
      )}
      <Input
        type="number"
        placeholder="0.0"
        fontSize="3xl"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        outline="none"
        py="10"
        isDisabled={current !== type}
        border="none"
        fontFamily="monospace"
        _focus={{ boxShadow: "none" }}
        textAlign="right"
      />
    </HStack>
  );
}

export default SwapInput