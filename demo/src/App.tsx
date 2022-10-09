import {
  ChakraProvider,
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Grid,
  theme,
  Flex,
  Text,
  VStack,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Connect } from "./Connect";
import { SendTransaction } from "./SendTransaction";
import { SignTransaction } from "./SignTransaction";
import { SignMessage } from "./SignMessage";

const links = {
  github: "https://github.com/InternetMaximalism/webmax.js",
  intmaxWallet: "https://www.intmaxwallet.io/",
};

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex flexDirection="column">
          <VStack pb={8} spacing={6}>
            <Text as="h1">
              <Text as="span" display="inline-block" fontFamily="Lexend" fontWeight="extrabold">
                Webmax.js
              </Text>
              Demo
            </Text>
            <HStack spacing={10}>
              <ChakraLink isExternal href={links.github}>
                <FaGithub />
              </ChakraLink>
              <ChakraLink isExternal href={links.intmaxWallet}>
                <AiOutlineGlobal />
              </ChakraLink>
            </HStack>
            <Text as="h2">make your dapps walletless by webmax.js</Text>
          </VStack>
          <Tabs variant="soft-rounded">
            <TabList justifyContent="center">
              <Tab>Connect to Account</Tab>
              <Tab>Sign Transaction</Tab>
              <Tab>Send Transaction</Tab>
              <Tab>Sign Message</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Connect />
              </TabPanel>
              <TabPanel>
                <SignTransaction />
              </TabPanel>
              <TabPanel>
                <SendTransaction />
              </TabPanel>
              <TabPanel>
                <SignMessage />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Grid>
    </Box>
  </ChakraProvider>
);
