import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Text,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  useMediaQuery,
  Heading,
  Button,  // Import Button from Chakra UI
} from "@chakra-ui/react";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { FaBars } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [isToastShown, setIsToastShown] = useState<boolean>(false);
  const disconnect = useDisconnect();  // Add this line to get the disconnect function

  useEffect(() => {
    // Display a toast message when the component mounts
    if (!isToastShown) {
      toast.info(
        "This project is currently in the developmental stage and it is on Manta Pacific Testnet",
        {
          position: "top-center",
          autoClose: false, // Set to false to allow manual closing
          closeOnClick: false, // Set to false to prevent closing on click
        }
      );
      setIsToastShown(true);
    }
  }, [isToastShown]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Container
      maxW={"100%"}
      py={4}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(8px)" // Set the blur effect
    >
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <Heading>Goblin Miner</Heading>
        </Link>
        {isSmallerScreen ? (
          <IconButton
            aria-label="Toggle menu"
            icon={<FaBars />}
            onClick={toggleMenu}
            variant="ghost"
          />
        ) : (
          address && (
            <Flex flexDirection={"row"}>
              <Link href={"/play"}>
                <Text mr={8}>Play</Text>
              </Link>
              <Link href={"/shop"}>
                <Text mr={8}>Shop</Text>
              </Link>
              <Link href={`/profile/${address}`}>
                <Text>My Wallet</Text>
              </Link>
            </Flex>
          )
        )}
        <Modal isOpen={isOpen} onClose={closeMenu} size="xs">
          <ModalOverlay />
          <ModalContent
            background="rgba(0, 128, 128, 0.8)" // Set the modal background color with opacity
            backdropFilter="blur(8px)" // Set the modal blur effect
          >
            <ModalHeader color="white">Menu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <ConnectWallet
                  theme={"dark"}
                  btnTitle={"Login"}
                  modalTitle={"Connect"}
                  switchToActiveChain={true}
                  modalSize={"wide"}
                  welcomeScreen={{}}
                  modalTitleIconUrl={""}
                  detailsBtn={() => {
                    return <Text></Text>;
                  }}
                />
                {address && (
                  <>
                    <Link href={"/play"}>
                      <Text color="white" onClick={closeMenu}>
                        Play
                      </Text>
                    </Link>
                    <Link href={"/shop"}>
                      <Text color="white" onClick={closeMenu}>
                        Shop
                      </Text>
                    </Link>
                    <Link href={`/profile/${address}`}>
                      <Text color="white" onClick={closeMenu}>
                        My Wallet
                      </Text>
                    </Link>
                    <Button onClick={disconnect} colorScheme="teal">
                      Logout
                    </Button>
                  </>
                )}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <ToastContainer />
    </Container>
  );
};

export default Navbar;
