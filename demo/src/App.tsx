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
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Connect } from "./Connect";
import { SendTransaction } from "./SendTransaction";
import { SignTransaction } from "./SignTransaction";
import { SignMessage } from "./SignMessage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex flexDirection="column">
          <VStack pb={8} spacing={6}>
            <Text as="h1" pb={6}>
              <Text
                as="span"
                display="inline-block"
                fontFamily="Lexend"
                fontWeight="extrabold"
                pr={2}
              >
                Webmax.js
              </Text>
              Demo
            </Text>
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
