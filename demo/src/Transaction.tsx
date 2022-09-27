import { useState } from "react";
import {
  Button,
  Flex,
  VStack,
  Text,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { IntmaxWalletSigner } from "webmax";

type Inputs = {
  to: string;
  value: string;
  gas: number;
};

export const Transaction = () => {
  const [result, setResult] = useState("");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    to,
    value,
    gas,
  }: Inputs): Promise<void> => {
    try {
      const tx = {
        to,
        value,
        gas,
      };

      const signer = new IntmaxWalletSigner();
      const receipt = await signer.sendTransaction(tx);
      setResult(JSON.stringify(receipt));

      toast({
        title: "Success Sign Transaction",
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

  const handleClick = (key: "to" | "value" | "gas"): void =>
    void resetField(key);

  return (
    <Flex textAlign="center" fontSize="xl" direction="column">
      <VStack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3} my={2}>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text
                fontWeight="bold"
                fontSize={{ base: "xs" }}
                w="150px"
                mr={{ base: 2, md: 8 }}
              >
                To Address
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="0x..."
                  {...register("to", {
                    required: "address is required",
                  })}
                />
                <InputRightElement
                  children={<SmallCloseIcon color="gray" cursor="pointer" />}
                  onClick={() => handleClick("to")}
                />
              </InputGroup>
            </Flex>
            {errors.to && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.to.message}
              </Text>
            )}
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text
                fontWeight="bold"
                fontSize={{ base: "xs" }}
                w="150px"
                mr={{ base: 2, md: 8 }}
              >
                Transaction Value
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="0.01"
                  {...register("value", {
                    required: "value is required",
                  })}
                />
                <InputRightElement
                  children={<SmallCloseIcon color="gray" cursor="pointer" />}
                  onClick={() => handleClick("value")}
                />
              </InputGroup>
            </Flex>
            {errors.value && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.value.message}
              </Text>
            )}
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text
                fontWeight="bold"
                fontSize={{ base: "xs" }}
                w="150px"
                mr={{ base: 2, md: 8 }}
              >
                gas
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="21000"
                  {...register("gas", {
                    required: "gas is required",
                    valueAsNumber: true,
                  })}
                />
                <InputRightElement
                  children={<SmallCloseIcon color="gray" cursor="pointer" />}
                  onClick={() => handleClick("gas")}
                />
              </InputGroup>
            </Flex>
            {errors.gas && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.gas.message}
              </Text>
            )}
          </Flex>
        </VStack>
        <Button type="submit">Submit Sign Transaction</Button>
        <Box wordBreak="break-word">
          <Text>result: {result}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};
