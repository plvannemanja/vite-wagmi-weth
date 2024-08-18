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
  const balanceStyle = {
    color: current === type ? 'red' : ''
  };
  return (
      <HStack w="full" bgColor="gray.100" rounded="2xl" px="5" py="3" className="swapInputContainer">
        <div className="tokenInfo">
          {current === type ? <p>Pay with</p> : <p>Receive</p>}
          <div>
            {
              type === "eth" ? (
                  <img src={ethImg} width={30} alt="ETH image"/>
              ) : (
                  <img src={wethImg} width={30} alt="WETH image"/>
              )
            }
            <p className="tokenSymbol">{tokenSymbol}</p>
          </div>
          <p style={balanceStyle}>Balance: {tokenBalance.substring(0, 7)}</p>
        </div>
        {
            current === type && (
                <Button onClick={() => setAmount(max || "0")}>Max</Button>
            )
        }
        <div>
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
          <p className="usdCalc">${amount ? amount.substring(0, 15): "0.0"}</p>
        </div>

      </HStack>
  )
      ;
}

export default SwapInput