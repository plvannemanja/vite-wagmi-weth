import {Button, HStack, Input} from "@chakra-ui/react";
//import {TokenETC, TokenETH} from "@web3icons/react";
import React from "react";
import {useSwapAmount} from "../context/SwapAmountContext";
import {SwapInputProps} from "../types";
import ethImg from '../assets/img/eth.png';
import wethImg from '../assets/img/weth.png';

const SwapInput: React.FC<SwapInputProps> = ({
                                               type,
                                               tokenSymbol,
                                               tokenBalance,
                                               current,
                                               max
                                             }) => {
  const {amount, setAmount} = useSwapAmount();
  return (
      <HStack w="full" bgColor="gray.100" rounded="2xl" px="5" py="3" className="swapInputContainer">
        <div className="tokenInfo">
          <div>
            {
              type === "eth" ? (
                  <img src={ethImg} width={18} alt="ETH image"/>
              ) : (
                  <img src={wethImg} width={18} alt="WETH image"/>
              )
            }
            <p>{tokenSymbol}</p>
          </div>
          <p>Balance: {tokenBalance}</p>
        </div>
        {
            current === type && (
                <Button onClick={() => setAmount(max || "0")}>Max</Button>
            )
        }
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
            _focus={{boxShadow: "none"}}
            textAlign="right"
        />
      </HStack>
  )
      ;
}

export default SwapInput