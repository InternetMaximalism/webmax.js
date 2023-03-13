import {
  Box,
  ChakraProvider,
  Flex,
  Grid,
  HStack,
  Image,
  Link as ChakraLink,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  theme,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Connect } from "./Connect";
import logo from "./logo.png";
import { SendTransaction } from "./SendTransaction";
import { SendTransactionRedirect } from "./SendTransactionRedirect";
import { SignMessage } from "./SignMessage";
import { SignTransaction } from "./SignTransaction";

const links = {
  github: "https://github.com/InternetMaximalism/webmax.js",
  intmaxWallet: "https://www.intmaxwallet.io/",
};

export const App = () => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (location.pathname === "/redirect") {
      handleTabsChange(2);
    }
  }, [location.pathname]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Flex flexDirection="column">
            <VStack pb={8} spacing={6}>
              <Text as="h1">
                <Text
                  as="span"
                  color={useColorModeValue("purple.400", "purple.700")}
                  display="inline-block"
                  fontFamily="Lexend"
                  fontWeight="extrabold"
                  pr={3}
                >
                  Webmax.js
                </Text>
                Demo
              </Text>
              <HStack spacing={10}>
                <ChakraLink isExternal href={links.github}>
                  <FaGithub fontSize="2rem" />
                </ChakraLink>
                <ChakraLink isExternal href={links.intmaxWallet}>
                  <Box h="2rem" w="2rem">
                    <Image src={logo} alt="logo" />
                  </Box>
                </ChakraLink>
              </HStack>
              <Text as="h2">make your dapps walletless by webmax.js</Text>
            </VStack>
            <Tabs variant="soft-rounded" index={tabIndex} onChange={handleTabsChange}>
              <TabList justifyContent="center" flexWrap="wrap">
                <Tab p={{ base: 4, sm: "auto" }}>Connect to Account</Tab>
                <Tab p={{ base: 4, sm: "auto" }}>Sign Transaction</Tab>
                <Tab p={{ base: 4, sm: "auto" }}>Send Transaction Redirect</Tab>
                <Tab p={{ base: 4, sm: "auto" }}>Send Transaction</Tab>
                <Tab p={{ base: 4, sm: "auto" }}>Sign Message</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Connect />
                </TabPanel>
                <TabPanel>
                  <SignTransaction />
                </TabPanel>
                <TabPanel>
                  <SendTransactionRedirect />
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
};
