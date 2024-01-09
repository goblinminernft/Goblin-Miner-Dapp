// pages/index.tsx

import { ChakraProvider, Container, Box, Button, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

const Index: React.FC = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" centerContent>
        {/* Welcome Section */}
        <Box textAlign="center" padding="6">
          <Heading as="h1" size="xl">
            Welcome to Goblin Miner!
          </Heading>
          <Text fontSize="lg" mt="4">
            Explore the magical world of goblins and uncover treasures with Goblin Miner.
          </Text>
          <ConnectWallet
           theme={"dark"}
           btnTitle={"Login"}
           modalTitle={"Connect"}
           switchToActiveChain={true}
           modalSize={"wide"}
           welcomeScreen={{}}
           modalTitleIconUrl={""}
            detailsBtn={() => {
              return (
                <Link href="/play" passHref>
                  <Button as="a">Play Now</Button>
                </Link>
              );
            }}
          />
          <Flex>
          <Image src="/10.png" alt="Goblin Miner" mt="6" maxW="300px" />
          <Image src="/11.png" alt="Goblin Miner" mt="6" maxW="300px" />
          </Flex>
        </Box>

        {/* About Section */}
        <Flex alignItems="center" justifyContent="space-between" flexDir={{ base: 'column', md: 'row' }} padding="6" bgColor="gray.100">
          <Box textAlign="center" maxW={{ base: '100%', md: '45%' }}>
            <Heading as="h2" size="lg">
              About Goblin Miner
            </Heading>
            <Text fontSize="md" mt="4">
              Join the goblins on a thrilling adventure as they mine for treasures using powerful tools and the mystical Blue Crystal.
            </Text>
          </Box>
          <Image src="/9.png" alt="About Goblin Miner" mt={{ base: '6', md: '0' }} maxW="300px" />
        </Flex>

        {/* How to Play Section */}
        <Flex alignItems="center" justifyContent="space-between" flexDir={{ base: 'column-reverse', md: 'row' }} padding="6">
        <Image src="/8.png" alt="How to Play Goblin Miner" mt={{ base: '6', md: '0' }} maxW="300px" />
          <Box textAlign="center" maxW={{ base: '100%', md: '45%' }}>
            <Heading as="h2" size="lg">
              How to Play
            </Heading>
            <Text fontSize="md" mt="4">
              Collect goblins, equip them with tools, and explore the mines. Earn rewards by uncovering valuable resources powered by the Blue Crystal.
            </Text>
          </Box>
          
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default Index;