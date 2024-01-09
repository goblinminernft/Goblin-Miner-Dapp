import {
    MediaRenderer,
    Web3Button,
    useAddress,
    useContract,
  } from "@thirdweb-dev/react";
  import { NFT } from "@thirdweb-dev/sdk";
  import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
  import Link from "next/link";
  import {
    Text,
    Box,
    Button,
    Card,
    SimpleGrid,
    Stack,
    useToast,
  } from "@chakra-ui/react";
  
  type Props = {
    nft: NFT[] | undefined;
  };
  
  export function Inventory({ nft }: Props) {
    const address = useAddress();
    const toast = useToast();
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  
    async function stakeNFT(id: string) {
      if (!address) {
        return;
      }
  
      const isApproved = await toolContract?.erc1155.isApproved(
        address,
        STAKING_ADDRESS
      );
  
      if (!isApproved) {
        await toolContract?.erc1155.setApprovalForAll(STAKING_ADDRESS, true);
      }
      await stakingContract?.call("stake", [id, 1]);
    }
  
    if (nft?.length === 0) {
      return (
        <Box>
          <Text>No tools.</Text>
          <Link href="/shop">
            <Button>Buy Tools</Button>
          </Link>
        </Box>
      );
    }
  
    const handleEquipSuccess = () => {
      toast({
        title: "Equip Successful",
        description: "You have successfully equipped a tool.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const handleEquipError = (error: any) => {
      console.error("Equip Error:", error);
      // Display an error message
      toast({
        title: "Equip Error",
        description: "Something went wrong while equipping tools.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const handleEquipSubmit = () => {
      console.log("Transaction for equipping has been submitted.");
    };
  
    return (
      <SimpleGrid columns={3} spacing={4}>
        {nft?.map((nft) => (
          <Card key={nft.metadata.id} p={5}>
            <Stack alignItems={"center"}>
              <MediaRenderer
                src={nft.metadata.image}
                height="100px"
                width="100px"
              />
              <Text>{nft.metadata.name}</Text>
              <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={() => stakeNFT(nft.metadata.id)}
                onSuccess={handleEquipSuccess}
                onError={handleEquipError}
                onSubmit={handleEquipSubmit}
              >
                Equip
              </Web3Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }
  