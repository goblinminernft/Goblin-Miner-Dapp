import {
    MediaRenderer,
    Web3Button,
    useAddress,
    useContract,
    useContractRead,
    useNFT
  } from "@thirdweb-dev/react";
  import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
  import { ethers } from "ethers";
  import { Text, Box, Card, Stack, Flex } from "@chakra-ui/react";
  
  interface EquippedProps {
    tokenId: number;
  }
  
  export const Equipped = (props: EquippedProps) => {
    const address = useAddress();
  
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { data: nft } = useNFT(toolContract, props.tokenId);
  
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  
    const { data: claimableRewards } = useContractRead(
      stakingContract,
      "getStakeInfoForToken",
      [props.tokenId, address]
    );
  
    return (
      <Box>
        {nft && (
          <Card p={{ base: 2, md: 5 }}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box boxSize={{ base: "100%", md: "auto" }}>
                <MediaRenderer
                  src={nft.metadata.image}
                  height="150px"
                  width="150px"
                />
              </Box>
              <Stack spacing={3} mt={{ base: 3, md: 0 }}>
                <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
                  {nft.metadata.name}
                </Text>
                <Text>
                  Equipped: {ethers.utils.formatUnits(claimableRewards[0], 0)}
                </Text>
                <Web3Button
                  contractAddress={STAKING_ADDRESS}
                  action={(contract) =>
                    contract.call("withdraw", [props.tokenId, 1])
                  }
                >
                  Unequip
                </Web3Button>
              </Stack>
            </Flex>
            <Box mt={{ base: 5, md: 0 }}>
              <Text>Claimable $BLCRSTL:</Text>
              <Text>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
              <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={(contract) =>
                  contract.call("claimRewards", [props.tokenId])
                }
              >
                Claim $BLCRSTL
              </Web3Button>
            </Box>
          </Card>
        )}
      </Box>
    );
  };
  