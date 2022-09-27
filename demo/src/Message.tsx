import { useState } from "react";
import { Button, Flex, VStack, Text, Box, useToast } from "@chakra-ui/react";
import { Signer } from "./dist";

export const Message = () => {
  const [result, setResult] = useState("");
  const toast = useToast();

  const handleSignMessage = async () => {
    try {
      const signer = new Signer();
      const signature = await signer.signMessage("hello world");

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
