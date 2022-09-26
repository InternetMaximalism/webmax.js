import { useState } from "react";
import { Button, Flex, VStack, Text, Box } from "@chakra-ui/react";
import { Signer } from "./dist";

export const Form = () => {
  const [result, setResult] = useState("");

  const handleTransaction = () => {
    const signer = new Signer();
    const data = {
      to: "0x....",
      value: "0.001",
      gas: 21000,
    };

    signer.signTransaction(data);
  };

  const handleSignMessage = async () => {
    const signer = new Signer();
    const signature = await signer.signMessage("hello world");

    setResult(signature);
  };

  return (
    <Flex textAlign="center" fontSize="xl" direction="column">
      <VStack spacing={6}>
        <Button onClick={handleTransaction}>Handle Transaction</Button>
        <Button onClick={handleSignMessage}>Handle Sign Message</Button>
      </VStack>
      <Box pt={6} wordBreak="break-word">
        <Text>result: {result}</Text>
      </Box>
    </Flex>
  );
};
