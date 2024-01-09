import {
    MediaRenderer,
    Web3Button,
    useContract,
    useContractMetadata,
  } from "@thirdweb-dev/react";
  import { GOBLIN_ADDRESS } from "../const/addresses";
  import { Box, Container, Flex, Heading, useToast } from "@chakra-ui/react";
  
  export function ClaimGoblin() {
    const toast = useToast();
    const { contract } = useContract(GOBLIN_ADDRESS);
    const { data: metadata } = useContractMetadata(contract);
  
    const handleClaimSuccess = () => {
      toast({
        title: "Claim Successful",
        description: "You have successfully claimed a Goblin.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const handleClaimError = (error: any) => {
      console.error("Error during claim:", error);
      // Display an error message
      toast({
        title: "Claim Error",
        description: "Something went wrong while claiming a Goblin.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const handleClaimSubmit = () => {
      console.log("Claim transaction submitted");
    };
  
    return (
      <Container maxW={"1200px"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"50vh"}
        >
          <Heading>Get a Goblin to start mining</Heading>
          <Box borderRadius={"8px"} overflow={"hidden"} my={10}>
            <MediaRenderer src={metadata?.image} height="300px" width="300px" />
          </Box>
  
          <Web3Button
            contractAddress={GOBLIN_ADDRESS}
            action={(contract) => contract.erc1155.claim(0, 1)}
            onSuccess={handleClaimSuccess}
            onError={handleClaimError}
            onSubmit={handleClaimSubmit}
          >
            Get your own Goblin
          </Web3Button>
        </Flex>
      </Container>
    );
  }
  