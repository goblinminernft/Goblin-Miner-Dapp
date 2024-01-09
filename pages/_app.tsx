import type { AppProps } from "next/app";
import { 
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet, } from "@thirdweb-dev/react";
import { MantaPacific, MantaPacificTestnet } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import '../styles/global.css';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "PolygonZkevmTestnet";

const clientAPI= process.env.THIRDWEB_API_KEY as string;

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
      <ChakraProvider>
        <NavBar/>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
