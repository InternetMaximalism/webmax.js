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
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Transaction } from "./Transaction";
import { Message } from "./Message";
import { Connect } from "./Connect";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex flexDirection="column">
          <Text as="h1" mb={6}>
            Webmax Demo
          </Text>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList justifyContent="center">
              <Tab>Connect to Account</Tab>
              <Tab>Sign Transaction</Tab>
              <Tab>Sign Message</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Connect />
              </TabPanel>
              <TabPanel>
                <Transaction />
              </TabPanel>
              <TabPanel>
                <Message />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Grid>
    </Box>
  </ChakraProvider>
);
