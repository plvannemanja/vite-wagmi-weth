import {
  Button,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { BaseError, useAccount, useBalance, useWriteContract } from "wagmi"
import SwapInput from "./SwapInput";
import Navbar from "./Navbar";
import { parseAbi, parseEther } from "viem";
import { useBlockNumber } from "wagmi";
import { useSwapAmount } from "../context/SwapAmountContext";
import { config } from "../wagmi";
import { waitForTransactionReceipt, WriteContractErrorType } from "wagmi/actions";
import swapImg from '../assets/img/swap.png';

const WETH_CONTRACT_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const WrapUnwrapETH: React.FC = () => {
  const toast = useToast();
  const { address } = useAccount();
  const { amount } = useSwapAmount();
  const [currentFrom, setCurrentFrom] = useState<"eth" | "weth">("eth");
  const { data: ethBalance, refetch: ethRefetch } = useBalance({ address });
  const { data: wethBalance, refetch: wethRefetch } = useBalance({ address, token: WETH_CONTRACT_ADDRESS });
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const { isPending, writeContract, error } = useWriteContract()

  useEffect(() => {
    ethRefetch();
    wethRefetch();
  }, [blockNumber]);

  const handleTransactionSubmitted = async (txHash: string) => {
    setIsConfirming(true);
    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash as `0x${string}`,
    });

    setIsConfirming(false);
    // at this point the tx was mined

    if (transactionReceipt.status === "success") {
      // execute your logic here
      toast({
        title: currentFrom === "eth" ? "Wrap ETH" : "Unwrap WETH",
        description: "Successfully swapped.",
        status: "success",
        position: "bottom-right", 
      })
    } else {
      toast({
        title: currentFrom === "eth" ? "Wrap ETH" : "Unwrap WETH",
        description: (error as BaseError).shortMessage || error?.message,
        status: "error",
        position: "bottom-right", 
      })
    }
  }

  const handleTransactionError = async (txError: WriteContractErrorType) => {
    toast({
      title: currentFrom === "eth" ? "Wrap ETH" : "Unwrap WETH",
      description: (txError as BaseError).shortMessage || txError?.message,
      status: "error",
      position: "bottom-right", 
    })
  }

  const executeSwap = async () => {
    if (currentFrom === "eth") {
      writeContract(
        {
          address: WETH_CONTRACT_ADDRESS,
          abi: parseAbi(["function deposit() public payable"]),
          functionName: 'deposit',
          value: parseEther(amount || '0')
        }, 
        {
          onSuccess: handleTransactionSubmitted,
          onError: handleTransactionError,
        }    
      )
    } else {
      writeContract(
        {
          address: WETH_CONTRACT_ADDRESS,
          abi: parseAbi(["function withdraw(uint wad) public"]),
          functionName: 'withdraw',
          args: [parseEther(amount || '0')]
        },
        {
          onSuccess: handleTransactionSubmitted,
          onError: handleTransactionError,
        }
      )
    }
  };

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
            tokenSymbol="ETH"
            tokenBalance={ethBalance?.formatted || "0"}
        />

        <Button
            onClick={() =>
                currentFrom === "eth"
                    ? setCurrentFrom("weth")
                    : setCurrentFrom("eth")
            }
            className="wrap-btn"
        >
          <img src={swapImg} alt="ETH image" style={{height: "30px"}}/>
        </Button>


        <SwapInput
            current={currentFrom}
            type="weth"
            max={wethBalance?.formatted}
            tokenSymbol="WETH"
            tokenBalance={wethBalance?.formatted || "0"}
        />
      </Flex>
      <Button
          onClick={() => {
            executeSwap()}}
        py="7"
        fontSize="2xl"
        colorScheme="twitter"
        rounded="xl"
        isDisabled={isConfirming || isPending}
      >
        {(isConfirming || isPending) ? <Spinner /> : "Confirm"}
      </Button>
    </Flex>
  )
}

export default WrapUnwrapETH

