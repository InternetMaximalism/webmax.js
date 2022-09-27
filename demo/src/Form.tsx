import { useState } from "react";
import { Button, Flex, VStack, Text, Box } from "@chakra-ui/react";
import { Signer } from "./dist/";

export const Form = () => {
  const [result, setResult] = useState("");

  const handleTransaction = async () => {
    const signer = new Signer();
    const data = {
      to: "0x5Cc937c3FA78E67f8c46d9c3eFd4d98D1C546374",
      value: "0.001",
      gas: 21000,
    };

    const receipt = await signer.sendTransaction(data);
    console.log("receipt", receipt);
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
