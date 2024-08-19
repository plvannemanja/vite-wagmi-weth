import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <Box w="full" borderBottomWidth="1px" borderColor="gray.100">
      <Flex
        maxW="6xl"
        w="full"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        py="5"
        px={{ base: '5', xl: '0' }}
      >
        <Text fontWeight="bold" fontSize="2xl">
          Case Study
        </Text>
        <w3m-account-button />
      </Flex>
    </Box>
  );
};

export default Navbar;
