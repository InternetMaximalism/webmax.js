import { Box, Button, Flex, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IntmaxWalletSigner, NoRedirect } from "webmax";

export const SignMessage = () => {
  const [result, setResult] = useState("");
  const toast = useToast();

  const handleSignMessage = async () => {
    try {
      const signer = new IntmaxWalletSigner();
      const signature = await signer.signMessage<NoRedirect>("hello world");

      setResult(signature);
      toast({
        title: "Success Sign Message",
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
        <Button onClick={handleSignMessage}>Sign "hello world"</Button>
        <Box wordBreak="break-word">
          <Text>result: {result}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};
