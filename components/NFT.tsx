import { Text, Card } from "@chakra-ui/react";
import { MediaRenderer, Web3Button, useActiveClaimCondition, useContract } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { TOOLS_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

type Props = {
    nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data, isLoading } = useActiveClaimCondition(
        contract,
        nft.metadata.id, // Token ID required for ERC1155 contracts here.
      );

    return (
        <Card key={nft.metadata.id} overflow={"hidden"}>
            <center><MediaRenderer
                src={nft.metadata.image}
                height="300px"
                width="89px"
            /> </center>
            <Text fontSize={"2xl"} fontWeight={"bold"} my={5} textAlign={"center"}>{nft.metadata.name}</Text>
            {!isLoading && data ? (
                <Text textAlign={"center"} my={5}>Price: {ethers.utils.formatEther(data?.price)}{" " + "$"+data?.currencyMetadata.symbol}</Text>
            ) :(
                <Text>Loading...</Text>
            )}
            <Web3Button
                theme="dark"
                contractAddress={TOOLS_ADDRESS}
                action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
            >Buy</Web3Button>
        </Card>
    )
};