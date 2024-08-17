import {
  Button,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useAccount, useBalance } from "wagmi"
import SwapInput from "./SwapInput";
import Navbar from "./Navbar";

const WETH_CONTRACT_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const WrapUnwrapETH: React.FC = () => {
  const toast = useToast();
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("0");
  const [currentFrom, setCurrentFrom] = useState<string>("eth");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: ethBalance } = useBalance({ address });
  const { data: wethBalance } = useBalance({ address, token: WETH_CONTRACT_ADDRESS });
  return (
    <Flex
      direction="column"
      gap="5"
      my="auto"
      p="5"
      mx="auto"
      maxW={{ base: "sm", md: "xl" }}
      w="full"
      rounded="2xl"
      borderWidth="1px"
      borderColor="gray.300"
    >
      <Navbar />
      <Flex
        direction={currentFrom === "eth" ? "column" : "column-reverse"}
        gap="3"
      >
        <SwapInput
          current={currentFrom}
          type="eth"
          max={ethBalance?.formatted}
          value={amount}
          setValue={setAmount}
          tokenSymbol="ETH"
          tokenBalance={ethBalance?.formatted || "0"}
        />

        <Button
          onClick={() =>
            currentFrom === "eth"
              ? setCurrentFrom("weth")
              : setCurrentFrom("eth")
          }
          maxW="5"
          mx="auto"
          className="wrap-btn"
        >
          ↓
        </Button>

        <SwapInput
          current={currentFrom}
          type="weth"
          max={wethBalance?.formatted}
          value={amount}
          setValue={setAmount}
          tokenSymbol="WETH"
          tokenBalance={wethBalance?.formatted || "0"}
          />
      </Flex>
      <Button
        onClick={()=> {}}
        py="7"
        fontSize="2xl"
        colorScheme="twitter"
        rounded="xl"
        isDisabled={loading}
      >
        {loading ? <Spinner /> : "Confirm"}
      </Button>
    </Flex>
  )
}

export default WrapUnwrapETH

