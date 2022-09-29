import { useState } from "react";
import { Button, Flex, VStack, Text, Box, useToast } from "@chakra-ui/react";
import { IntmaxWalletSigner } from "webmax";

export const Connect = () => {
  const [result, setResult] = useState<{ address: string; chainId: number } | null>(null);
  const toast = useToast();

  const handleConnect = async () => {
    try {
      const signer = new IntmaxWalletSigner();
      const account = await signer.connectToAccount();
      setResult(account);

      toast({
        title: "Success connect to account",
        position: "top",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: (error as Error).message,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Flex textAlign="center" fontSize="xl" direction="column" pt={6}>
      <VStack spacing={6}>
        <Button onClick={handleConnect}>Connect to account</Button>
        <Box wordBreak="break-word">
          <VStack spacing={4}>
            <Text>address: {result?.address}</Text>
            <Text>chainId: {result?.chainId}</Text>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
};
