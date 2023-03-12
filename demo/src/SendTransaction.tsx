import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IntmaxWalletSigner } from "webmax";

type Inputs = {
  to: string;
  value: string;
  gasLimit: number;
};

export const SendTransaction = () => {
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
    gasLimit,
  }: Inputs): Promise<void> => {
    try {
      const tx = {
        to,
        value: value,
        gasLimit,
      };

      const signer = new IntmaxWalletSigner();
      const receipt = await signer.sendTransaction(tx);
      setResult(JSON.stringify(receipt));

      toast({
        title: "Success Send Transaction",
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

  const handleClick = (key: "to" | "value" | "gasLimit"): void => void resetField(key);

  return (
    <Flex textAlign="center" fontSize="xl" direction="column">
      <VStack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3} my={2}>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
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
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
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
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                gas
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="21000"
                  {...register("gasLimit", {
                    required: "gasLimit is required",
                    valueAsNumber: true,
                  })}
                />
                <InputRightElement
                  children={<SmallCloseIcon color="gray" cursor="pointer" />}
                  onClick={() => handleClick("gasLimit")}
                />
              </InputGroup>
            </Flex>
            {errors.gasLimit && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.gasLimit.message}
              </Text>
            )}
          </Flex>
        </VStack>
        <Button type="submit">Send Transaction</Button>
        <Box wordBreak="break-word">
          <Text>result: {result}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};
