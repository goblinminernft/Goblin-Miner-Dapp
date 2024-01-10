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

const clientAPI = process.env.THIRDWEB_API_KEY as string;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThirdwebProvider
        activeChain={MantaPacificTestnet}
        clientId={clientAPI}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect(),
          safeWallet({
            personalWallets: [
              metamaskWallet(),
              coinbaseWallet(),
              walletConnect(),
              localWallet(),
              embeddedWallet({
                recommended: true,
                auth: {
                  options: [
                    "email",
                    "google",
                    "apple",
                    "facebook",
                  ],
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
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
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

          {/* Favicon */}
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

          {/* Apple Touch icon */}
          <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png" />

          {/* Android icons */}
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

          {/* Web Manifest */}
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
