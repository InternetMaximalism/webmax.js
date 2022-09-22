import { Box, Button } from "@chakra-ui/react";
import { Signer } from "./dist";

export const Form = () => {
  const handleClick = () => {
    const signer = new Signer();
    const data = {
      to: "0x....",
      value: "0.001",
      gas: 21000,
    };

    signer.signTransaction(data);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Button onClick={handleClick}>Handle Transaction</Button>
    </Box>
  );
};
