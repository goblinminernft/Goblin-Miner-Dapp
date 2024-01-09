import {
    ConnectWallet,
    MediaRenderer,
    useAddress,
    useContract,
    useContractRead,
    useOwnedNFTs
  } from "@thirdweb-dev/react";
  import type { NextPage } from "next";
  import {
    GOBLIN_ADDRESS,
    REWARDS_ADDRESS,
    STAKING_ADDRESS,
    TOOLS_ADDRESS
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
    TabPanel
  } from "@chakra-ui/react";
  
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
  
    const { data: equippedTools } = useContractRead(stakingContract, "getStakeInfo", [
      address
    ]);
  
    const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
      address
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
            <Heading my={"40px"}>Welcome to Goblin Miner</Heading>
            <ConnectWallet
              theme={"dark"}
              btnTitle={"Login"}
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
                  <Box
  bg="green.100" // Background color
  p={4} // Padding
  borderRadius="md" // Border radius
  boxShadow="md" // Box shadow
>
  <Text fontSize="small" fontWeight="bold">
    $BLCRSTL Balance:
  </Text>
  {rewardBalance && (
    <Text>{ethers.utils.formatUnits(rewardBalance, 18)}</Text>
  )}
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
              <Box mt={{ base: 8, md: 16 }}>
                <Heading mb={{ base: "30px", md: "20px" }}>Equipped Tools:</Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                  {equippedTools &&
                    equippedTools[0].map((nft: BigNumber) => (
                      <Equipped key={nft.toNumber()} tokenId={nft.toNumber()} />
                    ))}
                </SimpleGrid>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    );
  };
  
  export default Play;
  