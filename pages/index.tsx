import { ChakraProvider, Container, Box, Button, Flex, Heading, Text, Image, useMediaQuery } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from "next/link";
const DynamicButton = dynamic(() => import('@chakra-ui/react').then((module) => ({ default: module.Button })), { ssr: false });

const Index: React.FC = () => {
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");

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
          {/* Play Now Button */}
          <Link href="/play" passHref>
            <DynamicButton as="a" colorScheme="teal" size="lg" mt="4">
              Play Now
            </DynamicButton>
          </Link>
          <Flex direction={{ base: 'column', md: 'row' }} alignItems="center" justify="center">
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
