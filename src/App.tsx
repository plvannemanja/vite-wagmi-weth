import { useAccount } from 'wagmi';
import WrapUnwrapETH from './components/WrapUnWrapETH';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { SwapAmountProvider } from './context/SwapAmountContext';

const App: React.FC = () => {
  const { isConnected, isConnecting } = useAccount();
  if (isConnecting)
    return (
      <Flex
        gap="5"
        my="auto"
        p="5"
        mx="auto"
        alignItems="center"
        justifyContent="center"
        maxW={{ base: 'sm', md: 'xl' }}
        rounded="2xl"
        borderWidth="1px"
        borderColor="gray.300"
      >
        <Button
          py="7"
          fontSize="2xl"
          colorScheme="twitter"
          rounded="xl"
          isDisabled={true}
        >
          <Spinner />
        </Button>
      </Flex>
    );

  return (
    <>
      {isConnected ? (
        <SwapAmountProvider>
          <WrapUnwrapETH />
        </SwapAmountProvider>
      ) : (
        <Flex
          gap="5"
          my="auto"
          p="5"
          mx="auto"
          alignItems="center"
          justifyContent="center"
          maxW={{ base: 'sm', md: 'xl' }}
          rounded="2xl"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <w3m-connect-button />
        </Flex>
      )}
    </>
  );
};

export default App;
