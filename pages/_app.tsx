import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";
import { MantaPacific, MantaPacificTestnet } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import "../styles/global.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "PolygonZkevmTestnet";

const clientAPI = process.env.THIRDWEB_API_KEY as string;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThirdwebProvider
        activeChain={MantaPacificTestnet}
        clientId={clientAPI}
        supportedWallets={[
          metamaskWallet({ recommended: true }),
          coinbaseWallet(),
          walletConnect(),
          safeWallet({
            personalWallets: [
              metamaskWallet({ recommended: true }),
              coinbaseWallet(),
              walletConnect(),
              localWallet(),
              embeddedWallet({
                recommended: true,
                auth: {
                  options: ["email", "google", "apple", "facebook"],
                },
              }),
              trustWallet(),
              rainbowWallet(),
            ],
          }),
          localWallet(),
          embeddedWallet({
            recommended: true,
            auth: {
              options: ["email", "google", "apple", "facebook"],
            },
          }),
          trustWallet(),
          rainbowWallet(),
        ]}
      >
        <Head>
          <title>Goblin Miners - #1 Manta Pacific Idle Game </title>
          <meta
            name="description"
            content="A cool digital world where little goblins use special tools like Pickaxes to dig for treasures powered by the magical Blue Crystal! Each unique Goblin NFT is like a ticket to join the fun. Collect them, explore the mines, and earn awesome rewards. It's like having your own digital mining adventure with magical goblins!"
          />
          <meta property="og:image" content="/10.png" />
          <meta name="twitter:card" content="/10.png" />
          <meta name="twitter:image" content="/10.png" />
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
