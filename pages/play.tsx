import {
  ConnectWallet,
  MediaRenderer,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import {
  GOBLIN_ADDRESS,
  REWARDS_ADDRESS,
  STAKING_ADDRESS,
  TOOLS_ADDRESS,
} from "../const/addresses";
import { ClaimGoblin } from "../components/ClaimGoblin";
import { Inventory } from "../components/Inventory";
import { Equipped } from "../components/Equipped";
import {
  Text,
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Image
} from "@chakra-ui/react";
import Link from "next/link";

import { BigNumber, ethers } from "ethers";

const Play: NextPage = () => {
  const address = useAddress();

  const { contract: goblinContract } = useContract(GOBLIN_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedGoblins, isLoading: loadingOwnedGoblins } = useOwnedNFTs(
    goblinContract,
    address
  );
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(
    toolsContract,
    address
  );

  const { data: equippedTools } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
    address,
  ]);

  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex
          direction={"column"}
          h={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
           <Image
            src="/9.png"
            alt="About Goblin Miner"
            mt={{ base: "6", md: "0" }}
            maxW="300px"
          />
          <Heading my={"40px"}>Welcome to Goblin Miner</Heading>
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Get Started"}
            modalTitle={"Connect"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{}}
            modalTitleIconUrl={""}
          />
        </Flex>
      </Container>
    );
  }

  if (loadingOwnedGoblins) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    );
  }

  if (ownedGoblins?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimGoblin />
      </Container>
    );
  }

  return (
    <Container maxW={"1200px"}>
      <Box
        bg="green.100"
        p={4}
        borderRadius="md"
        boxShadow="md"
        textAlign="right" // Align the content to the right
      >
        <Text fontSize="small" fontWeight="bold">
          $BLCRSTL Balance:
        </Text>
        {rewardBalance && (
          <Text>
            {ethers.utils
              .formatUnits(rewardBalance, 18)
              .split(".")
              .map((part, index) =>
                index === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : part
              )
              .join(".")}
          </Text>
        )}
      </Box>
      <br></br>
      <br></br>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Goblin</Tab>
          <Tab>Inventory</Tab>
          <Tab>Equipped Tools</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Heading>Goblin:</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Box>
                  {ownedGoblins?.map((nft) => (
                    <div key={nft.metadata.id}>
                      <MediaRenderer
                        src={nft.metadata.image}
                        height="250px"
                        width="250px"
                      />
                    </div>
                  ))}
                </Box>
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Heading>Inventory:</Heading>
              <Skeleton isLoaded={!loadingOwnedTools}>
                <Inventory nft={ownedTools} />
              </Skeleton>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Heading>Equipped Tools:</Heading>
              {equippedTools && equippedTools[0].length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                  {equippedTools[0].map((nft: BigNumber) => (
                    <Equipped key={nft.toNumber()} tokenId={nft.toNumber()} />
                  ))}
                </SimpleGrid>
              ) : (
                <div>
                  <Text>No equipped tools</Text>
                  <Link href="/inventory" passHref>
                    <Button as="a">Check Inventory</Button>
                  </Link>
                </div>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Play;
